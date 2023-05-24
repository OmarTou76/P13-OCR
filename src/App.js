import { RouterProvider } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { router } from './router'
import { saveToken } from './redux/auth/auth'
import './app.css'
import { useEffect } from 'react'
import { fetchOrUpdateUser } from './redux/user/actions'

export const App = () => {
    const user = useSelector(state => state.user)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const token = JSON.parse(localStorage.getItem('userToken'))

    if (token && auth.status !== 'resolved' && !user.isLogged) {
        dispatch(saveToken({ token }))
    }

    useEffect(() => {
        if (auth.status === "resolved" && !user.isLogged) {
            dispatch(fetchOrUpdateUser())
        }
    }, [dispatch, auth, user])

    return (
        <RouterProvider router={router} />
    )
}