import React, { useEffect } from 'react'
import "./user.css"
import { transactions } from '../../data/transactions'
import { BankAccount } from '../../components/BankAccount/Index'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setEditingState } from '../../redux/user/user'
import { editUser } from '../../redux/user/actions'

export const User = () => {
    const { data, isLogged } = useSelector(state => state.user)
    const { isEditingUser, error } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEditButton = () => {
        if (!isEditingUser) return dispatch(setEditingState())
        const firstName = document.getElementById('firstName').value ? document.getElementById('firstName').value : data?.firstName
        const lastName = document.getElementById('lastName').value ? document.getElementById('lastName').value : data?.lastName
        dispatch(editUser({ firstName, lastName }))
    }

    useEffect(() => {
        if (!isLogged) return navigate('/signIn')
    }, [isLogged, navigate])


    return (
        <>
            {isLogged &&
                <main className="main bg-dark">
                    <div className="header">
                        <h1>Welcome back<br />
                            {!isEditingUser && data.firstName + " " + data.lastName + "!"}
                        </h1>
                        {isEditingUser &&
                            <div className='edit-user'>
                                <input type="text" placeholder={data.firstName} id='firstName' />
                                <input type="text" placeholder={data.lastName} id="lastName" />
                            </div>}
                        <div className='edit-user'>
                            <button className="edit-button" onClick={handleEditButton}>{!isEditingUser ? "Edit Name" : "Save"}</button>
                            {isEditingUser &&
                                <button onClick={() => dispatch(setEditingState())} className='edit-button'>Cancel</button>
                            }
                        </div>
                        {error && <p className='display-error'>{error}</p>}
                    </div>
                    {transactions.map((transaction, key) => (
                        <BankAccount key={key}
                            title={transaction.title}
                            amount={transaction.amount}
                            balance={transaction.balance}
                        />
                    ))}
                </main>
            }
        </>
    )
}
