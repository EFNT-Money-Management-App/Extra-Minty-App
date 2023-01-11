// import * as React from 'react';
// import {useState, useEffect} from 'react';
// // import axios from 'axios';
// const Accounts = ({id}) => {
//     const [transactions, setTransactions] = useState([]);
//     useEffect(() =>{
//     fetch(`/transactions/bank-account/1`)
//       .then(res => res.json())
//       .then(data => setTransactions(data))
//       .catch(err => console.log(err));
//   },[]);
    
//     return (
//         <div>
//         <h2>Transactions</h2>
//         <ul>
//           {transactions.map(t => (
//             <li key={t.id}>
//               {t.date} - {t.amount} - {t.transactionType}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
// }

// export default Accounts;
import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface Transaction {
    id: number;
    customCategoryName: string;
    type: string;
    amount: number;
    category: string;
    date: string;
    description: string;
    transferToAccountNumber: number | null;
    transferFromAccountNumber: number | null;
    budget: object | null;
    bankAccount: {
        id: number;
        balance: number | null;
        accountNumber: number | null;
        routingNumber: number | null;
        bankName: string | null;
        type: string | null;
        user: object | null;
    }
}

const Accounts = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch('/api/transactions/bank-account/{id}?id=1')
      .then((response) => response.json())
      .then((data: Transaction[]) => setTransactions(data))
      .catch((error) => console.error(error));
  }, []);
  console.log(typeof transactions);
  return (
    <div>
      <h2></h2>
      <ul>
        {transactions.length !== 0 ? (
          transactions.map((transaction) => (
            <li key={transaction.id}>
              Date: {(transaction.date)}  |
              Amount: {transaction.amount} |
              Category: {transaction.category} |
              Type: {transaction.type}
            </li>
          ))
        ) : (
          <li>No Transactions found</li>
        )}
      </ul>
    </div>
  );
};

export default Accounts;

