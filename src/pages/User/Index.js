import React from 'react'
import "./user.css"
import { transactions } from '../../data/transactions'
import { BankAccount } from '../../components/BankAccount/Index'

export const User = () => {
    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />Tony Jarvis!</h1>
                <button className="edit-button">Edit Name</button>
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
