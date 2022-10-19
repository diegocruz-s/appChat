import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import groupSlice from './slices/groupSlice';

const store = configureStore({
    reducer: {
        authSlice,
        groupSlice,
    }
});

export default store;