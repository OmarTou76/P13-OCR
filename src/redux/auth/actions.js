import { get_fetching, get_resolved, get_rejected } from './auth'

const LOGIN_URL = "http://localhost:3001/api/v1/user/login"

export const getOrUpdateToken = ({ email, password, remember }) => {
    return async (dispatch, getState) => {
        const { status } = getState().auth
        if (status === "pending" || status === "updating") return

        dispatch(get_fetching())
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
            dispatch(get_resolved(data.body))
        } catch (error) {
            dispatch(get_rejected(error.message))
        }
    }
}