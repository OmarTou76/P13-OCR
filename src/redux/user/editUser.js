import { createSlice } from "@reduxjs/toolkit"
import { userEditor } from "./actions"

const initialState = {
    isLoading: false,
    isEditingUser: false,
    error: null
}

const user = createSlice({
    name: "editUser",
    initialState,
    reducers: {
        setEditingState: (state) => {
            state.isEditingUser = !state.isEditingUser
        }
    },
    extraReducers: builder => {
        builder
            .addCase(userEditor.pending, state => {
                state.isLoading = true
            })
            .addCase(userEditor.fulfilled, state => {
                state.isLoading = false
                state.isEditingUser = false
            })
            .addCase(userEditor.rejected, (state, { payload }) => {
                state.isLoading = false
                state.error = payload
            })
    }
})

export const { reducer: editUserReducer } = user
export const { setEditingState } = user.actions