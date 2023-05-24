import './header.css'
import logo from '../../assets/img/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/auth/auth'
import { removeUser } from '../../redux/user/user'

export const Header = () => {
    const { isLogged, data } = useSelector(state => state.user)
    const dispatch = useDispatch()

    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div className='main-nav-user'>
                {isLogged ? (
                    <>
                        <Link to="/user" className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            {data.firstName}
                        </Link>
                        <Link className="main-nav-item" onClick={() => {
                            dispatch(removeUser())
                            dispatch(logout())
                            localStorage.removeItem('userToken')
                        }}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </Link>
                    </>
                ) : (
                    <Link to="/signIn" className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        Sign in
                    </Link>
                )}
            </div>
        </nav>
    )
}