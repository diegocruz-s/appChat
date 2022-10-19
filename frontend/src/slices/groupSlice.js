import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { groupsUser } from "../services/groupService";

const initialState = {
    error: null,
    success: null,
    loading: false,
    group: {},
    groups: [],
}

export const getGroupsUser = createAsyncThunk(
    'group/getGroupsUser',
    async (_, thunkAPI) => {
        const token = await thunkAPI.getState().authSlice.user.token;

        const data = await groupsUser(token);

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
    }
})

export const { resetStatesGroup } = groupsSlice.actions;
export default groupsSlice.reducer;
