// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// interface Transaction {
//     id: number;
//     customCategoryName: string;
//     type: string;
//     amount: number;
//     category: string;
//     date: string;
//     description: string;
//     transferToAccountNumber: number | null;
//     transferFromAccountNumber: number | null;
//     budget: object | null;
//     bankAccount: {
//         id: number;
//         balance: number | null;
//         accountNumber: number | null;
//         routingNumber: number | null;
//         bankName: string | null;
//         type: string | null;
//         user: object | null;
//     }
// }

// const Accounts = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);

//   useEffect(() => {
//     fetch('/api/transactions/bank-account/{id}?id=1')
//       .then((response) => response.json())
//       .then((data: Transaction[]) => setTransactions(data))
//       .catch((error) => console.error(error));
//   }, []);
//   console.log(typeof transactions);
//   return (
    // <div>
    //   <h2>Transactions</h2>
    //   <ul>
    //     {transactions.length !== 0 ? (
    //       transactions.map((transaction) => (
    //         <li key={transaction.id}>
    //           Date: {(transaction.date)}  |
    //           Amount: {transaction.amount} |
    //           Category: {transaction.category} |
    //           Type: {transaction.type}
    //         </li>
    //       ))
    //     ) : (
    //       <li>No Transactions found</li>
    //     )}
    //   </ul>
    // </div>
//   );
// };

// export default Accounts;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
    const[pieChartData, setPieChartData] = useState(null);

    useEffect(() => {
      ///api/transactions/user/{id}?id=1
      ///api/transactions/current-user/mapped
        axios.get('api/transactions/current-user/mapped')
        .then(response => {
          console.log(response.data)
          setPieChartData(response.data)
        })
        .catch((error) => console.log(error))
    }, []);
    return (
        <div>
            <h2>
                <p>{pieChartData && JSON.stringify(pieChartData)}</p>
            </h2>
        </div>
    )
}
export default Test;


