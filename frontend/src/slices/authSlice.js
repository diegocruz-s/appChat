import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../services/authService";

const datasUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: datasUser || null,
    loading: false,
    error: null,
    success: false,
}

export const register = createAsyncThunk(
    'auth/register', async (user, thunkAPI) => {
        const data = await registerUser(user);

        if(data.error){
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
);

export const login = createAsyncThunk(
    'auth/login', async (user, thunkAPI) => {
        const data = await loginUser(user);

        if(data.error){
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;

    }
);

export const logout = createAsyncThunk(
    'auth/logout', async () => {
        localStorage.removeItem('user');
    }
)

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        resetStates(state){
            state.error = null;
            state.loading = false;
            state.success = false;
        }
    },
    extraReducers(builder){
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.success = null;
                state.error = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload.success;
                state.user = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.success = null;
                state.error = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload.success;
                state.user = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.user = null;
            })
    }
});

export const { resetStates } = authSlice.actions;
export default authSlice.reducer;