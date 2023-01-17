import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { IBankAccount } from "app/shared/model/bank-account.model";
import { ITransaction } from "app/shared/model/transaction.model";
import { IUser } from '../../shared/model/user.model';
import { NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import transaction from 'app/entities/transaction/transaction.reducer';
import { APP_DATE_FORMAT } from "app/config/constants";
import { TextFormat } from "react-jhipster";
import TransactionUpdate from 'app/entities/transaction/transaction-update'
import BankAccountUpdate from "app/entities/bank-account/bank-account-update";
import { Button } from "reactstrap";
import { useAppSelector } from "app/config/store";

import './Useraccount.css'


const Temp = () => {
    // State for the selected bank account and its transactions
    const [selectedBankAccount, setSelectedBankAccount] = useState<IBankAccount>();
    const [currentTransactions, setCurrentTransactions] = useState<ITransaction[]>();
    const dataCache = new Map<number, ITransaction[]>();
    const [user, setUser] = useState<IUser>()

    const transactionEntity = useAppSelector(state => state.transaction.entity);

    // State for all of the user's bank accounts
    const [userBankAccounts, setUserBankAccounts] = useState<IBankAccount[]>([]);

    // useEffect to fetch the user's bank accounts when the component is first rendered
    useEffect(() => {
        axios.get('/api/bank-accounts/currentUser')
            .then(response => {
                console.log(response.data)
                setUserBankAccounts(response.data);
                setSelectedBankAccount(response.data[0]);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    useEffect(() =>{
        axios.get('/api/account')
        .then(res => {
            console.log(res.data)
            setUser(res.data)
        })
    },[])

    // const getTransactions = async (bankAccountId: number) => {
    //     try {
    //         const response = await axios.get(`/api/transactions/bank-account/{id}?id=${bankAccountId}`);
    //         return response.data;
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // }
    const getTransactions = async (bankAccountId: number) => {
        if (dataCache.has(bankAccountId)) {
            return dataCache.get(bankAccountId);
        }
        try {
            const response = await axios.get(`/api/transactions/bank-account/{id}?id=${bankAccountId}`);
            const data = response.data;
            dataCache.set(bankAccountId, data);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    const handleTabClick = (bankAccount: IBankAccount) => {
        setSelectedBankAccount(bankAccount);
        getTransactions(bankAccount.id).then((data) => setCurrentTransactions(data));
    }

    const handleDetailsClick = (transaction: ITransaction) => {

    }
    
    return (
      <div>
        <div>
          <h2>Hello,{user ? <div>{user.firstName}</div> : <div>Loading...</div>}</h2>
          <h4>Click an account to view transactions.</h4>
          {userBankAccounts.map(bankAccount => (
            <Button
              className={bankAccount.type === 'CHECKING' ? 'checking-button' : 'savings-button'}
              key={bankAccount.id}
              onClick={() => handleTabClick(bankAccount)}
            >
              {bankAccount.bankName + ' || ' + bankAccount.type}
            </Button>
          ))}
            <div className="account-info">
              <span>
                {selectedBankAccount ? <h3 className="account-number">{"Account Number: " + selectedBankAccount.accountNumber}</h3> : "No Bank Account Selected"}
              </span>
              <span>
                {selectedBankAccount ? <h3 className="account-balance">{"Account Balance: $" + selectedBankAccount.balance}</h3> : "No Bank Account Selected"}
              </span>
            </div>
              
            
            
              
            
        </div>
        {currentTransactions && currentTransactions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.date ? <TextFormat value={transaction.date} type="date" format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.description}</td>
                  <td>{'$' + transaction.amount + ''}</td>
                  <Link to={`/transaction/${transaction.id}`}>
                    <Button className="details-button">Details</Button>
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No transactions found for the selected bank account.</div>
        )}
        <div className="transaction-bankaccount-button">
          <div className="transaction-button">
            <TransactionUpdate />
          </div>
          <div className="bankaccount-button">
            <BankAccountUpdate />
          </div>
        </div>
      </div>
    );
};
export default Temp;