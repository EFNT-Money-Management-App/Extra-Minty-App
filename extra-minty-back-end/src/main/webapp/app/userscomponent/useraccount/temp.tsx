import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { IBankAccount } from "app/shared/model/bank-account.model";
import { ITransaction } from "app/shared/model/transaction.model";
import Transactionmodal from "../transactionmodal/Transactionmodal";
import BankAccount from "app/entities/bank-account/bank-account";
import { forEach } from "lodash";



const Hi = () => {
    // the actual view of the tables
    const [checkingTable, setCheckingTable] = useState(true)
    const [savingsTable, setSavingsTable] = useState(false)
    // setting the accounts of the user
    const [userBankAccounts, setUserBankAccounts] = useState<IBankAccount[]>([])
    const [bankAccountTransaction, setBankAccountTransaction] = useState(new Map<IBankAccount, ITransaction[]>())
    // the individual user bank accounts
    // const [checkingAccount, setCheckingAccount] 
    // each of the bank account transactions


    // balance of each that changes
    const [checkingBalance, setCheckingBalance] = useState(0.00)
    const [savingsBalance, setSavingsBalance] = useState(0.00)

    const [currentBankAccount, setCurrentBankAccount] = useState<IBankAccount>(userBankAccounts[0])

    const setCurrentAccountOnClick = (bankAccount: IBankAccount) => {
        setCurrentBankAccount(bankAccount)
        // return bankAccount
    }
    // allows the buttons to switch tables
    const checkingHandler = () => {
        setCheckingTable(true)
        setSavingsTable(false)
    }
    const savingsHandler = () => {
        setSavingsTable(true)
        setCheckingTable(false)
    }

    const getValueOfMap= () => {

    }

    useEffect(() => {
        axios.get('/api/bank-accounts/currentUser')
        .then(response => {
            console.log(response.data)
            setUserBankAccounts(response.data)
        })
        .catch( err => {
            console.error(err)
        })
    }, [])

    const getTransactions = (id: number): ITransaction[] => {
        axios.get(`/api/transactions/bank-account/${id}`)
        .then (response => {
            return response.data
        })
        return null
    }
    useEffect(() => {
        userBankAccounts.forEach(bankAccount => {
            console.log(bankAccount)
            bankAccountTransaction.set(bankAccount, getTransactions(bankAccount.id))
        })
    }, [])


    return (
        <div>
            <span className="balance">
                        Checking Account: ${checkingBalance}
                    </span>
                    {/* <table> */}
                        <colgroup>
                        <col width="20px" />
                        <col width="30px" />
                        <col width="30px" />
                        <col width="40px" />
                        <col width="40px" />
                        </colgroup>
                        
                        
            
            <div>
                {userBankAccounts.map((bankAccount) => (
                
                    <button key= {bankAccount.id} onClick={() => setCurrentAccountOnClick(bankAccount)} >{bankAccount.type}</button>
                ))}
            </div>
                <table>
                    <thead>
                        <tr>
                            {/* these are column names */}
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Type</th>
                            
                        
                        </tr>
                        </thead>
                        <tbody>
                            {bankAccountTransaction.get(currentBankAccount).length !== 0 ? (
                                bankAccountTransaction.get(currentBankAccount).map((transaction) => (
                                    <tr key={transaction.id}>
                                    <td>{transaction.date}</td>
                                    <td>{"$" + transaction.amount + ".00"}</td>
                                    <td>{transaction.type}</td>
                    
                                    </tr>
                                ))
                                ) : (
                    <tr>
                        <td colSpan={2}>No Transactions found</td>
                    </tr>
    )}
  </tbody>
                    </table>
        </div>
    )
}
export default Hi;