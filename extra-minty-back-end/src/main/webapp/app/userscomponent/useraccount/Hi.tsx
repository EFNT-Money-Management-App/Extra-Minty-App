import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { IBankAccount } from "app/shared/model/bank-account.model";
import { ITransaction } from "app/shared/model/transaction.model";
import Transactionmodal from "../transactionmodal/Transactionmodal";
import BankAccount from "app/entities/bank-account/bank-account";
import { forEach } from "lodash";



const Hi = () => {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [selectedBankAccount, setSelectedBankAccount] = useState<IBankAccount>();
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    useEffect(() => {
        axios.get('/api/bank-accounts/currentUser')
            .then(response => setBankAccounts(response.data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (selectedBankAccount) {
            axios.get(`/api/transactions/bank-account/${selectedBankAccount.id}`)
                .then(response => setTransactions(response.data))
                .catch(error => console.log(error));
        }
    }, [selectedBankAccount]);

    return (
        <div>
            <h2>Bank Accounts</h2>
            <ul>
                {bankAccounts.map(bankAccount => (
                    <li key={bankAccount.id}>
                        <button name ={bankAccount.id} onClick={() => setSelectedBankAccount(bankAccount)}>
                            {bankAccount.name}
                        </button>
                    </li>
                ))}
            </ul>
            {selectedBankAccount && (
                <div>
                    <h2>Transactions for {selectedBankAccount.bankName}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
export default Hi;