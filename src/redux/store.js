import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './auth/auth';

export const store = configureStore({
    reducer: {
        auth: reducer,
    }
})