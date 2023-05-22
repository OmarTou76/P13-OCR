import React from 'react'
import './signIn.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/auth/actions'

export const SignIn = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    //console.log(auth)

    const handleForm = (e) => {
        e.preventDefault()
        const form = {
            email: e.target[0].value,
            password: e.target[1].value,
            remember: e.target[2].checked
        }
        dispatch(login(form))
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleForm}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <input type='submit' className='sign-in-button' value="Sign In" />
                </form>
            </section>
        </main>
    )
}
