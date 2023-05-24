import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "../auth/auth";
const USER_INFO_URL = "http://localhost:3001/api/v1/user/profile"

export const getUser = createAsyncThunk(
    'user/getUser',
    async (arg, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(USER_INFO_URL, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${getState().auth.token}`
                },
                method: "POST",
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            return data.body
        } catch (error) {
            dispatch(logout({ error: error.message }))
            localStorage.removeItem('userToken')
            return rejectWithValue(error.message)
        }
    },
    {
        condition: (arg, { getState }) => {
            if (getState().user.isLoading) {
                return false
            }
        }
    }
)


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

            dispatch(getUser())

            return data.body
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)