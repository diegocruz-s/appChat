import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createGroupService, createMessage, deleteGroupService, groupsUser, messages } from "../services/groupService";
import { api } from "../utils/api";

const initialState = {
    error: null,
    success: null,
    loading: false,
    group: {},
    groups: [],
    messages: null
}

export const getGroupsUser = createAsyncThunk(
    'group/getGroupsUser',
    async (_, thunkAPI) => {
        const token = await thunkAPI.getState().authSlice.user.token;

        const data = await groupsUser(token);

        return data;

    }
)

export const messagesGroup = createAsyncThunk(
    'group/messages', 
    async (id, thunkAPI) => {
        console.log('ok slice')


        const token = await thunkAPI.getState().authSlice.user.token;

        const data = await messages(id, token);

        return data;
    }
);

export const createMsg = createAsyncThunk(
    'group/message', 
    async (msg, thunkAPI) => {

        const token = await thunkAPI.getState().authSlice.user.token;

        const data = await createMessage(msg, token);

        if(data.error){
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;

    }
);

export const createGroup = createAsyncThunk(
    'group/create',
    async (group, thunkAPI)=>{
        const token = thunkAPI.getState().authSlice.user.token;

        const data = await createGroupService(group, token);

        if(data.error){
            return thunkAPI.rejectWithValue(data.error);
        }
        
        return data;
    }
);

export const deleteGroup = createAsyncThunk(
    'group/delete',
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().authSlice.user.token;

        const data = await deleteGroupService(id, token);

        return data;
    }
)

const groupsSlice = createSlice({
    name: 'groupSlice',
    initialState,
    reducers: {
        resetStatesGroups(state) {
            state.error = null;
            state.loading = false;
            state.success = null; 
            state.messages = null;
        }
    },
    extraReducers(builder){
        builder
            .addCase(getGroupsUser.pending, (state)=>{
                state.error = null;
                state.loading = true;
                state.success = null;
            })
            .addCase(getGroupsUser.fulfilled, (state, action)=>{
                state.error = null;
                state.loading = false;
                state.success = null;
                state.groups = action.payload;
            })
            .addCase(messagesGroup.pending, (state)=>{
                state.error = null;
                state.loading = true;
                state.success = null;
            })
            .addCase(messagesGroup.fulfilled, (state,action)=>{
                state.error = null;
                state.loading = false;
                state.success = null;
                state.messages = action.payload.messagesGroup;
                state.group = action.payload.group;
            })
            .addCase(createGroup.pending, (state)=>{
                state.error = null;
                state.loading = true;
                state.success = null;
            })
            .addCase(createGroup.rejected, (state, action)=>{
                state.loading = false;
                state.success = null;
                console.log(action.payload)
                state.error = action.payload;
            })
            .addCase(createGroup.fulfilled, (state, action)=>{
                state.error = null;
                state.loading = false;
                state.success = action.payload.success;
                state.groups.push(action.payload.group);
            })
            .addCase(deleteGroup.fulfilled, (state, action)=>{
                state.error = null;
                state.loading = false;
                state.success = action.payload.success;
                state.groups = state.groups.filter(group=> group.id !== action.payload.group.id)
            })
    }
})

export const { resetStatesGroup } = groupsSlice.actions;
export default groupsSlice.reducer;
