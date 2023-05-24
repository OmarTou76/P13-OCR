import { RouterProvider } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { router } from './router'
import { saveToken } from './redux/auth/auth'
import './app.css'
import { useEffect } from 'react'
import { fetchOrUpdateUser } from './redux/user/actions'

export const App = () => {
    const { isLogged, isLoading } = useSelector(state => state.user)
    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const token = JSON.parse(localStorage.getItem('userToken'))

    if (token && status !== 'resolved' && !isLogged) {
        dispatch(saveToken({ token }))
    }

    useEffect(() => {

        dispatch(fetchOrUpdateUser())

    }, [dispatch])

    return (
        <RouterProvider router={router} />
    )
}