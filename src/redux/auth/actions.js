import { createAsyncThunk } from "@reduxjs/toolkit";

const LOGIN_URL = "http://localhost:3001/api/v1/user/login"

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password, remember }, { rejectWithValue }) => {
        try {
            const response = await fetch(LOGIN_URL, {
                headers: {
                    "Content-Type": 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            if (remember === true) {
                localStorage.setItem('userToken', JSON.stringify(data.body.token))
            }
            return data.body
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)