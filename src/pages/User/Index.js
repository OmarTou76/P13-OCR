import React, { useEffect, useState } from 'react'
import "./user.css"
import { transactions } from '../../data/transactions'
import { BankAccount } from '../../components/BankAccount/Index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export const User = () => {
    const { data, isLogged } = useSelector(state => state.user)
    const navigate = useNavigate()
    const [edit, setEdit] = useState(false)
    const [user, setUser] = useState({ firstName: data?.firstName, lastName: data?.lastName })
    useEffect(() => {
        if (!isLogged) {
            return navigate('/signIn')
        }
    }, [isLogged, navigate])
    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />
                    {!edit && user.firstName + " " + user.lastName + "!"}
                </h1>
                {edit &&
                    <div className='edit-user'>
                        <input type="text" placeholder={user.firstName} id='firstName' />
                        <input type="text" placeholder={user.lastName} id="lastName" />
                    </div>}
                <div className='edit-user'>
                    <button className="edit-button" onClick={() => {
                        if (!edit) return setEdit(true)
                        const firstName = document.getElementById('firstName').value ? document.getElementById('firstName').value : user.firstName
                        const lastName = document.getElementById('lastName').value ? document.getElementById('lastName').value : user.lastName
                        console.log({ firstName, lastName })
                        setUser({ firstName, lastName })
                        setEdit(false)
                    }}>{!edit ? "Edit Name" : "Save"}</button>
                    {edit &&
                        <button onClick={() => setEdit(false)} className='edit-button'>Cancel</button>
                    }
                </div>
            </div>
            {transactions.map((transaction, key) => (
                <BankAccount key={key}
                    title={transaction.title}
                    amount={transaction.amount}
                    balance={transaction.balance}
                />
            ))}
        </main>
    )
}
