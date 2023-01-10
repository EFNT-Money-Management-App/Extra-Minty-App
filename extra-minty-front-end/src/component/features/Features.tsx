import * as React from 'react';
import './Features.css'

const Features = () => {
    return(
        <>
        <div className="features-title">Features include:</div>
            <div className="features-text">
            <ul>
                <li><strong>Deposit</strong> money to each bank accounts</li>
                <li><strong>Withdraw</strong> money from each bank accounts</li>
                <li><strong>Transfer</strong> money to and from one bank account to another bank accounts</li>
                <li>Create your own <strong>categories</strong> of transactions</li>
                <ul>
                    <li>Pre set categories:</li>
                    <ul>
                        <li>Income</li>
                        <li>Bills</li>
                        <li>Food</li>
                        <li>Transportation</li>
                    </ul>
                </ul>
                <li><strong>Create/manage</strong> your own budget</li>
                <li><strong>Track</strong> your spending</li>
                <li><strong>Connect/create</strong> bank accounts</li>
                <li><a href="/rewards" className="custom-link">Rewards</a> for meeting your savings goal</li>
            </ul>
        </div>
        </>
    )
}

export default Features;