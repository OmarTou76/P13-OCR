import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: "void",
    token: null,
    error: null,
}

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, { payload }) => {
            state.status = "void"
            state.token = null
            state.error = payload.error ?? null
        },
        saveToken: (state, { payload }) => {
            state.status = "resolved"
            state.token = payload.token
            state.error = null
        },

        get_fetching: state => {
            if (state.status === "void") {
                state.status = "pending"
                return
            }
            if (state.status === "rejected") {
                state.error = null
                state.status = "pending"
                state.token = null
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
                state.token = payload.token
                state.status = "resolved"
                return
            }
            return
        },
        get_rejected: (state, { payload }) => {
            if (state.status === "pending" || state.status === "updating") {
                state.status = "rejected"
                state.error = payload
                state.token = null
                return
            }
            return
        }
    }
})

export const { reducer: authReducer } = auth
export const { logout, saveToken, get_fetching, get_rejected, get_resolved } = auth.actions