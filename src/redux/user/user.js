import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: "void",
    isLogged: false,
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
        },
        get_fetching: state => {
            if (state.status === "void") {
                state.status = "pending"
                return
            }
            if (state.status === "rejected") {
                state.error = null
                state.status = "pending"
                state.isLogged = false
                return
            }
            if (state.status === "resolved") {
                state.status = "updating"
                return
            }
            return
        },
        get_resolved: (state, { payload }) => {
            if (state.status === "pending" || state.status === "updating") {
                state.data = payload
                state.status = "resolved"
                state.isLogged = true
                return
            }
            return
        },
        get_rejected: (state, { payload }) => {
            if (state.status === "pending" || state.status === "updating") {
                state.status = "rejected"
                state.error = payload
                state.data = null
                state.isLogged = false
                return
            }
            return
        }
    }
})

export const { reducer: userReducer } = getUserProfil

export const { removeUser, get_fetching, get_rejected, get_resolved } = getUserProfil.actions