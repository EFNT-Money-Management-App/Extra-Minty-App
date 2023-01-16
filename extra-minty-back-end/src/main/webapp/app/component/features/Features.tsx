import * as React from 'react';
import './Features.css'

const Features = () => {
    return(
        <>
        <div className="features-title">ExtraMinty features:</div>
            <div className="features-text">
            <ul>
                <li><strong>Connect/create</strong> bank accounts</li>
                <li><strong>Deposit/withdraw</strong> money to bank accounts</li>
                <li><strong>Transfer</strong> money to and from one bank account to another bank account</li>
                <li>Create your own <strong>categories</strong> of transactions</li>
                <ul>
                    <li>Preset categories:</li>
                    <ul>
                        <li>Income</li>
                        <li>Bills</li>
                        <li>Food</li>
                        <li>Transportation</li>
                    </ul>
                </ul>
                <li><strong>Create & manage</strong> your budgets</li>
                <li><strong>Track</strong> your spending</li>
                <li><a href="/rewards" className="custom-link">Rewards</a> for reaching your savings goals!</li>
            </ul>
        </div>
        </>
    )
}

export default Features;