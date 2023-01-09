import * as React from 'react';
import { Chart } from 'react-google-charts';
import './Userhome.css'
import ProfileLogo from './profileIcon.png'
import '../../global/style.css'

export const data = [
    ["Category", "Budget spent"],
    ["Utilities", 200],
    ["Entertainment", 200],
    ["Food", 400],
    ["Transportation", 250],
    ["Miscellaneous", 350],
    ["Rent", 800]
  ];

  export const options = {
    title: "Expenses",
    titleTextStyle: {
        fontSize: 25,
        bold: true
    },
    is3D: true,
    'chartArea': {'width': '100%', 'height': '80%'},
    legend: {
        textStyle: {
            fontSize: 30,
            bold: true
        }
    }
  };

const Userhome = () => {
    return (
        <div className='userhome-global'>
            <div className='title'>
                User Profile
            </div>
            <div className='userhome-profile-content'>
                <div>
                    <img className='userhome-profile-picture' src={ProfileLogo} alt="prof pic goes here" />
                </div>
                <div className='userhome-profile-username'>
                    Username
                </div>
            </div>
            <Chart className='piechart'
                chartType='PieChart'
                data={data}
                options={options}
                width={"800px"}
                height={"500px"}
            />
            <div className='title'>
                Accounts
            </div>
            <div>
                Checking account: $1,925,312.95
            </div>
            <div>
                Savings account: $2,034,493.39
            </div>
        </div>
    )
}

export default Userhome;