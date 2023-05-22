import React from 'react'
import './bankAccount.css'

export const BankAccount = ({ title, amount, balance }) => {
    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{title}</h3>
                <p className="account-amount">{new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(amount)}</p>
                <p className="account-amount-description">{balance} Balance</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
            </div>
        </section>
    )
}
