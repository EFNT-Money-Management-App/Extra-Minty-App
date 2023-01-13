import * as React from 'react';
import Chart from 'react-google-charts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
// import Budgetmodal from '../budgetmodal/Budgetmodal';
import { Button } from 'reactstrap';
import { IBudget } from 'app/shared/model/budget.model';
import axios from 'axios';
import BudgetUpdate from 'app/entities/budget/budget-update';

import BudgetDeleteDialog from 'app/entities/budget/budget-delete-dialog';

const Budget = () => {
  const colors : string[] = ['#3366cc','#dc3911','#ff9900','#0d9618','#990099','#0099c6'];
  const [userBudgets, setUserBudgets] = useState<IBudget[]>([]);

  useEffect(() => {
    axios.get('/api/budgets/current-user')
    .then((res) => {
      console.log(res.data)
      setUserBudgets(res.data)
    })
  },[])
   

const data = [
  ["Category", "", { role: 'style' }, { role: 'annotation'}], 
  ["", 200, '#3366cc', "Utilities"],
  ["", 200, '#dc3911', "Entertainment"],
  ["", 400, '#ff9900', "Food"],
  ["", 250, '#0d9618', "Transportation"],
  ["", 350, '#990099', "Miscellaneous"],
  ["", 800, '#0099c6', "Rent"]
];
const data1 = [  
  ["Category", "", { role: 'style' }, { role: 'annotation'}],
  ...userBudgets.map(budget => [budget.name, budget.currentSpending, colors[Math.floor(Math.random() * 5)],budget.spendingLimit])
];

const options = {
  chart: {
    title: "Budget",
  },
};

    return (
      <div>
        <div className='title'>
            Your Budgets
            <div>
                <Chart 
                chartType='BarChart'
                width="100%"
                height="400px"
                data={data1}
                options={options}
                />
            </div>
          </div>
          <BudgetUpdate />
      

        <div>
        <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Current Spending</th>
      <th>Limit</th>
      <th>Left to Spend</th>
    </tr>
  </thead>
  <tbody>
    {userBudgets.length !== 0 ? (
      userBudgets.map((budget) => (
        <tr key={budget.id}>
          <td>{budget.name}</td>
          <td>{"$" + budget.currentSpending + ".00"}</td>
          <td>{"$" + budget.spendingLimit + ".00"}</td>
          <td>{"$" + (budget.spendingLimit - budget.currentSpending) + ".00"}</td>
          <a href={"/budget/"+budget.id+"/edit"}>
            <button>Update</button>
          </a>
          <a href={"/budget/"+budget.id+"/delete"}>
            <button>Delete</button>
          </a>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={2}>No Budgetsfound</td>
      </tr>
    )}
  </tbody>
    </table>
        </div>
        </div>
    )
}

export default Budget;