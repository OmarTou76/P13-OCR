import { Header } from './components/Header'
import { Homepage } from './pages/Homepage'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './app.css'
import { Footer } from './components/Footer/Index'
import { SignIn } from './pages/SignIn/Index'

export const App = () => {
    const router = createBrowserRouter([
        {
            element: <>
                <Header />
                <Outlet />
                <Footer />
            </>,
            children: [
                {
                    path: "/",
                    element: <Homepage />
                },
                {
                    path: "signIn",
                    element: <SignIn />
                }
            ]
        }
    ])
    return (
        <RouterProvider router={router} />
    )
}