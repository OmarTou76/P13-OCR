import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "../auth/auth";
import { get_fetching, get_rejected, get_resolved } from "./user";
const USER_INFO_URL = "http://localhost:3001/api/v1/user/profile"

export const fetchOrUpdateUser = () => {
    return async (dispatch, getState) => {
        const { status } = getState().user
        const token = getState().auth.token
        if (status === "pending" || status === "updating" || !token) {
            return
        }
        dispatch(get_fetching())
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
            dispatch(get_resolved(data.body))
        } catch (error) {
            dispatch(logout({ error: error.message }))
            localStorage.removeItem('userToken')
            dispatch(get_rejected(error.message))
        }
    }
}

export const userEditor = createAsyncThunk(
    'editUser/editUser',
    async (editedUserData, { getState, rejectWithValue, dispatch }) => {

        try {
            const response = await fetch(USER_INFO_URL, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${getState().auth.token}`
                },
                method: "PUT",
                body: JSON.stringify({
                    "firstName": editedUserData.firstName,
                    "lastName": editedUserData.lastName
                })
            })
            const data = await response.json()

            if (!response.ok) throw new Error(data.message)

            //dispatch(getUser())

            return data.body
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)