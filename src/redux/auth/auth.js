import { createSlice } from "@reduxjs/toolkit"
import { login } from "./actions"

const initialState = {
    status: "void",
    token: null,
    error: null,
}

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, state => {
                state.status = "pending"
                state.error = null
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.status = "resolved"
                state.token = payload.token
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.status = "rejected"
                state.error = payload
            })
    }
})

export const { reducer } = auth