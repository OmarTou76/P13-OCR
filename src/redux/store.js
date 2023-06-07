import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/auth';
import { userReducer } from './user/user';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    }
})