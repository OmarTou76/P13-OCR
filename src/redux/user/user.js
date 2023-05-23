import { createSlice } from "@reduxjs/toolkit"
import { getUser } from "./actions"

const initialState = {
    isLogged: false,
    isLoading: false,
    data: null,
    error: null
}

const getUserProfil = createSlice({
    name: "user",
    initialState,
    reducers: {
        removeUser: state => {
            state = initialState
            return state
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getUser.pending, state => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isLogged = true
                state.data = payload
            })
            .addCase(getUser.rejected, (state, { payload }) => {
                state.isLoading = false
                state.error = payload
            })
    }
})

export const { reducer: userReducer } = getUserProfil

export const { removeUser, setEditing } = getUserProfil.actions