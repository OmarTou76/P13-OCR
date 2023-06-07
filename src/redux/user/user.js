import { createSlice } from "@reduxjs/toolkit"
import { editUser, getUser } from "./actions"

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
            state.isLogged = false
            state.isLoading = false
            state.data = null
            state.error = null
        },
        setEditingState: (state) => {
            state.isEditingUser = !state.isEditingUser
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
            .addCase(editUser.pending, state => {
                state.isLoading = true
            })
            .addCase(editUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isEditingUser = false
                state.data = payload
            })
            .addCase(editUser.rejected, (state, { payload }) => {
                state.isLoading = false
                state.error = payload
            })
    }
})

export const { reducer: userReducer } = getUserProfil

export const { removeUser, setEditingState } = getUserProfil.actions