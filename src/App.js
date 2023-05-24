import { RouterProvider } from 'react-router-dom'
import './app.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { router } from './router'
import { getUser } from './redux/user/actions'
import { saveToken } from './redux/auth/auth'

export const App = () => {
    const { isLogged } = useSelector(state => state.user)
    const dispatch = useDispatch()


    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('userToken'))
        if (!isLogged && token) {
            dispatch(saveToken({ token }))
            dispatch(getUser())
        }
    }, [isLogged, dispatch])

    return (
        <RouterProvider router={router} />
    )
}