import React from 'react'
import './bankAccount.css'

export const BankAccount = ({ title, amount, balance }) => {
    return (
        <section class="account">
            <div class="account-content-wrapper">
                <h3 class="account-title">{title}</h3>
                <p class="account-amount">${amount}</p>
                <p class="account-amount-description">{balance} Balance</p>
            </div>
            <div class="account-content-wrapper cta">
                <button class="transaction-button">View transactions</button>
            </div>
        </section>
    )
}
