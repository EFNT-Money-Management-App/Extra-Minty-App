
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { IBankAccount } from "app/shared/model/bank-account.model";
import { ITransaction } from "app/shared/model/transaction.model";
import Transactionmodal from "../transactionmodal/Transactionmodal";
import BankAccount from "app/entities/bank-account/bank-account";
import { forEach } from "lodash";



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

{/* <tbody>
                            {currentTransactions.length !== 0 ? (
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
  </tbody> */}

//   import React, { useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";
// import { IBankAccount } from "app/shared/model/bank-account.model";
// import { ITransaction } from "app/shared/model/transaction.model";
// import Transactionmodal from "../transactionmodal/Transactionmodal";
// import BankAccount from "app/entities/bank-account/bank-account";
// import { forEach } from "lodash";
// import { windowSize } from "react-jhipster";
// import bankAccount from 'app/entities/bank-account/bank-account.reducer';



// const temp = () => {
//     // the actual view of the tables
//     const [checkingTable, setCheckingTable] = useState(true);
//     const [savingsTable, setSavingsTable] = useState(false);
//     // setting the accounts of the user
//     const [userBankAccounts, setUserBankAccounts] = useState<IBankAccount[]>([]);
//     const [bankAccountTransaction, setBankAccountTransaction] = useState(new Map<IBankAccount, ITransaction[]>());
//     // the individual user bank accounts
//     // const [checkingAccount, setCheckingAccount] 
//     // each of the bank account transactions


//     // balance of each that changes
//     const [checkingBalance, setCheckingBalance] = useState(0.00);
//     const [savingsBalance, setSavingsBalance] = useState(0.00);

//     const [currentBankAccount, setCurrentBankAccount] = useState<IBankAccount>();
//     const [currentTransactions, setCurrentTransactions] = useState<ITransaction[]>();

//     const setCurrentAccountOnClick = (bankAccount: IBankAccount) => {
//         setCurrentBankAccount(bankAccount)
//         // return bankAccount
//     }
//     // allows the buttons to switch tables
//     const checkingHandler = () => {
//         setCheckingTable(true)
//         setSavingsTable(false)
//     }
//     const savingsHandler = () => {
//         setSavingsTable(true)
//         setCheckingTable(false)
//     }

//     const tabHandler = (acc :IBankAccount) => {
//         // setCurrentAccountOnClick(acc)
//         // setCurrentTransactions(bankAccountTransaction.get(acc))
//         getTransactions(acc.id)
//         location.reload()
//     }

//     useEffect(() => {
//         axios.get('/api/bank-accounts/currentUser')
//         .then(response => {
//             console.log(response.data)
//             setUserBankAccounts(response.data)
//             if(response.data)
//             setCurrentBankAccount(userBankAccounts[0])
//         })
//         .catch( err => {
//             console.error(err)
//         })
//     }, [])

//     const getTransactions = (id: number)  => {
//         axios.get(`/api/transactions/bank-account/${id}`)
//         .then (response => {
//             setCurrentTransactions(response.data) 
//         })
//     }
//     // useEffect(() => {
//     //     userBankAccounts.forEach(bankAccount => {
//     //         console.log(bankAccount)
//     //         bankAccountTransaction.set(bankAccount, getTransactions(bankAccount.id))
//     //     })
//     // }, [])


//     return (
//         <div>
//             <span className="balance">
//                         Checking Account: ${checkingBalance}
//                     </span>
//                     {/* <table> */}
//                         <colgroup>
//                         <col width="20px" />
//                         <col width="30px" />
//                         <col width="30px" />
//                         <col width="40px" />
//                         <col width="40px" />
//                         </colgroup>
                        
                        
            
//             <div>
//                 {userBankAccounts.map((bankAccount) => (
//                     <button key={bankAccount.id} onClick={() => tabHandler(bankAccount)}>{ bankAccount.bankName+" "+bankAccount.type}</button>
//                 ))}
//             </div>
//                 {/* <table>
//                     <thead>
//                         <tr>
//                             <th>Date</th>
//                             <th>Amount</th>
//                             <th>Type</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                             {currentTransactions.map((transaction) => (
//                                     <tr key={transaction.id}>
//                                     <td>{transaction.date}</td>
//                                     <td>{"$" + transaction.amount + ".00"}</td>
//                                     <td>{transaction.type}</td>
//                                     </tr>
//                                 ))
//                                  }
//                         </tbody>
//                 </table> */}
//         </div>
//     )
// }
// export default temp;