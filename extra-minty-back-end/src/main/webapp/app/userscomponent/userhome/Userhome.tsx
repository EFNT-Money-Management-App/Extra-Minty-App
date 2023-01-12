import * as React from 'react';
import { Chart } from 'react-google-charts';
import './Userhome.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IBankAccount, defaultValue} from 'app/shared/model/bank-account.model';

const Userhome = () => {
    const [userBankAccounts, setUserBankAccounts] = useState<IBankAccount[]>([])
    // let userBankAccounts : IBankAccount[] = null; 
    const [pieChartData, setPieChartData] = useState(Object)
    

    useEffect(() => {
        ///api/transactions/user/{id}?id=1
        ///api/transactions/current-user/mapped
          axios.get('api/transactions/current-user/mapped')
          .then(response => {
            console.log(response.data)
            setPieChartData(response.data)
          })
          .catch((error) => console.log(error));

      }, []);
      
    useEffect(() => {
        axios.get('/api/bank-accounts/currentUser')
        .then((res) => {
        console.log(res.data)
        setUserBankAccounts(res.data)
        })
    }, []);

      

    const data1 = [  
        ["Category", "Budget spent"],
        ...Object.entries(pieChartData).map(([category, budget]) => [category, budget]),
    ];
        
    const options = {
        title: "Expenses",
        titleTextStyle: {
            fontSize: 25,
            bold: true
        },
        
        is3D: true,
        'chartArea': {'width': '100%', 'height': '80%'},
        legend: {
            textStyle: {
                fontSize: 24,
                   bold: true
            }
        }
    };

    return (
        <div className='userhome-global'>
            <div className='title'>
                User Profile
            </div>
            <div className='userhome-profile-content'>
                <div>
                    <img className='userhome-profile-picture' src='./icon.png' alt="prof pic goes here" />
                </div>
                <div className='userhome-profile-username'>
                    Username
                </div>
            </div>
            <Chart className='piechart'
                chartType='PieChart'
                data={data1}
                options={options}
                width={"800px"}
                height={"500px"}
            />
            
            {/* <div>
      <h2>Your Bank Accounts</h2>
      <ul>
        {userBankAccounts.length !== 0 ? (
          userBankAccounts.map((bankAccount) => (
            <ul key={bankAccount.id}>
              Bank: {(bankAccount.bankName)}  |
              Balance: {bankAccount.balance} |
            </ul>
          ))
        ) : (
          <li>No Transactions found</li>
        )}
      </ul>
    </div> */}
    <div> Your Accounts</div>
        <table>
  <thead>
    <tr>
      <th>Bank</th>
      <th>Balance</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    {userBankAccounts.length !== 0 ? (
      userBankAccounts.map((bankAccount) => (
        <tr key={bankAccount.id}>
          <td>{bankAccount.bankName}</td>
          <td>{"$" + bankAccount.balance + ".00"}</td>
          <td>{bankAccount.type}</td>
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

export default Userhome;