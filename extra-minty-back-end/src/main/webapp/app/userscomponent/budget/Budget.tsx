import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { IBudget } from 'app/shared/model/budget.model';
import axios from 'axios';
import BudgetUpdate from 'app/entities/budget/budget-update';
import ProgressBar from 'react-animated-progress-bar';
import { Button } from 'reactstrap';
import './Budget.css';

const Budget = () => {
  const colors: string[] = ['#3366cc', '#dc3911', '#ff9900', '#0d9618', '#990099', '#0099c6'];
  const [userBudgets, setUserBudgets] = useState<IBudget[]>([]);
  const [progressBar, setProgressBar] = useState(true);

  useEffect(() => {
    axios.get('/api/budgets/current-user').then(res => {
      console.log(res.data);
      setUserBudgets(res.data);
    });
  }, []);

  const barToggle = () => {
    setProgressBar(!progressBar);
  };

  const data = [
    ['Category', '', { role: 'style' }, { role: 'annotation' }],
    ['', 200, '#3366cc', 'Utilities'],
    ['', 200, '#dc3911', 'Entertainment'],
    ['', 400, '#ff9900', 'Food'],
    ['', 250, '#0d9618', 'Transportation'],
    ['', 350, '#990099', 'Miscellaneous'],
    ['', 800, '#0099c6', 'Rent'],
  ];
  const data1 = [
    ['Category', '', { role: 'style' }, { role: 'annotation' }],
    ...userBudgets.map(budget => [budget.name, budget.currentSpending, colors[Math.floor(Math.random() * 5)], budget.spendingLimit]),
  ];

  const options = {
    chart: {
      title: 'Budget',
    },
  };

  return (
    <div>
      <div>
        <div className="title">Your Budgets</div>
        {progressBar ? (
          <div className="bar-scrollable">
            {userBudgets.length !== 0 ? (
              userBudgets.map(budget => (
                <tr key={budget.id}>
                  <td className="budget-name">{budget.name}</td>
                  <div className="growth-content">
                    <ProgressBar
                      width="700px"
                      height="10px"
                      rect
                      fontColor="#2f2f2f"
                      percentage={((budget.currentSpending / budget.spendingLimit) * 100).toFixed(2)}
                      rectPadding="1px"
                      rectBorderRadius="20px"
                      trackPathColor="transparent"
                      defColor={{
                        poor: 'green',
                        fair: 'yellow',
                        good: 'orange',
                        excellent: 'red',
                      }}
                      bgColor="#333333"
                      trackBorderColor="grey"
                    />
                  </div>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No Budgets found</td>
              </tr>
            )}
          </div>
        ) : (
          <div className="circular-scrollable">
            {userBudgets.length !== 0 ? (
              userBudgets.map(budget => (
                <tr key={budget.id}>
                  <td className="budget-name">{budget.name}</td>
                  <div className="circular-context">
                    <ProgressBar
                      width="550px"
                      fontColor="white"
                      trackWidth="10"
                      percentage={parseFloat(((budget.currentSpending / budget.spendingLimit) * 100).toFixed(2))}
                      trackPathColor="grey"
                      trackBorderColor="black"
                      hollowBackgroundColor="#333333"
                      defColor={{
                        poor: 'green',
                        fair: 'yellow',
                        good: 'orange',
                        excellent: 'red',
                      }}
                    />
                  </div>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No Budgets found</td>
              </tr>
            )}
          </div>
        )}
      </div>
      <br></br>
      <div className="budget-buttons">
        <div style={{ position: 'relative', left: 25 }}>
          <BudgetUpdate />
        </div>
        <div style={{ position: 'absolute', right: 40 }}>
          <Button className="button-style" onClick={barToggle}>
            Bar Switch
          </Button>
        </div>
      </div>
      <br></br>
      <div>
        <table>
          <thead>
            <tr>
              <th className="budget-column">Name</th>
              <th className="budget-column">Current Spending</th>
              <th className="budget-column">Limit</th>
              <th className="budget-column">Left to Spend</th>
            </tr>
          </thead>
          <tbody>
            {userBudgets.length !== 0 ? (
              userBudgets.map(budget => (
                <tr className="budget-table-style"key={budget.id}>
                  <td className="budget-style">{budget.name}</td>
                  <td className="budget-style">{'$' + budget.currentSpending + '.00'}</td>
                  <td className="budget-style">{'$' + budget.spendingLimit + '.00'}</td>
                  <td className="budget-style">{'$' + (budget.spendingLimit - budget.currentSpending) + '.00'}</td>
                  <a href={'/budget/' + budget.id + '/edit'}>
                    <Button className="update-button">Update</Button>
                  </a>
                  <a href={'/budget/' + budget.id + '/delete'}>
                    <Button className="delete-button">Delete</Button>
                  </a>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No Budgets found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Budget;
