import { Header } from './components/Header'
import { Homepage } from './pages/Homepage'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import { Footer } from './components/Footer/Index'
import { SignIn } from './pages/SignIn/Index'
import { User } from './pages/User/Index'
export const router = createBrowserRouter([
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
            },
            {
                path: "user",
                element: <User />
            },
        ]
    }
])