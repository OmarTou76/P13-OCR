import { createAsyncThunk } from "@reduxjs/toolkit";

const USER_INFO_URL = "http://localhost:3001/api/v1/user/profile"

export const getUser = createAsyncThunk(
    'user/getUser',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await fetch(USER_INFO_URL, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                method: "POST",
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            return data.body
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)