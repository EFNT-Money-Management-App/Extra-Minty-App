
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { IBankAccount } from "app/shared/model/bank-account.model";
import { ITransaction } from "app/shared/model/transaction.model";



const Temp = () => {
    // State for the selected bank account and its transactions
    const [selectedBankAccount, setSelectedBankAccount] = useState<IBankAccount>();
    const [currentTransactions, setCurrentTransactions] = useState<ITransaction[]>();

    // State for all of the user's bank accounts
    const [userBankAccounts, setUserBankAccounts] = useState<IBankAccount[]>();

    // useEffect to fetch the user's bank accounts when the component is first rendered
    useEffect(() => {
        axios.get('/api/bank-accounts/currentUser')
            .then(response => {
                setUserBankAccounts(response.data);
                setSelectedBankAccount(response.data[0]);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    // useEffect to fetch the transactions for the selected bank account
    useEffect(() => {
        if (selectedBankAccount) {
            axios.get(`/api/transactions/bank-account/${selectedBankAccount.id}`)
                .then(response => {
                    setCurrentTransactions(response.data);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [selectedBankAccount]);

    const handleTabClick = (bankAccount: IBankAccount) => {
        setSelectedBankAccount(bankAccount);
    };

    return (
        <div>
            <div>
                {userBankAccounts.map((bankAccount) => (
                    <button key={bankAccount.id} onClick={() => handleTabClick(bankAccount)}>
                        { bankAccount.bankName + " " + bankAccount.type }
                    </button>
                ))}
            </div>
            {currentTransactions && currentTransactions.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTransactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{"$" + transaction.amount + ".00"}</td>
                                <td>{transaction.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No transactions found for the selected bank account.</div>
            )}
        </div>
    )

};
export default Temp;