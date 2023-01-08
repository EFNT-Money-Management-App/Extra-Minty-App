import * as React from 'react';

const Features = () => {
    return(
        <div>
            <ul className="features-text">
                <li>Deposit money to each bank accounts</li>
                <li>Withdraw money from each bank accounts</li>
                <li>Transfer money to and from one bank account to another bank accounts</li>
                <li>Create your own categories of transactions</li>
                <ul>
                    <li>Pre set categories:</li>
                    <ul>
                        <li>Income</li>
                        <li>Bills</li>
                        <li>Food</li>
                        <li>Transportation</li>
                    </ul>
                </ul>
                <li>Create & manage your own budget</li>
                <li>Track your spending</li>
                <li>Connect/create bank accounts</li>
                <li>Rewards for meeting your savings goal</li>
            </ul>
        </div>
    )
}

export default Features;