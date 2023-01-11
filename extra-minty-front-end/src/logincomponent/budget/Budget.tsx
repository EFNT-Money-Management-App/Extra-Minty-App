import * as React from 'react';
import Chart from 'react-google-charts';
import '../../global/style.css'

export const data = [
    ["Category", "", { role: 'style' }, { role: 'annotation'}],
    ["", 200, '#3366cc', "Utilities"],
    ["", 200, '#dc3911', "Entertainment"],
    ["", 400, '#ff9900', "Food"],
    ["", 250, '#0d9618', "Transportation"],
    ["", 350, '#990099', "Miscellaneous"],
    ["", 800, '#0099c6', "Rent"]
  ];

export const options = {
    chart: {
      title: "Budget",
    },
  };


const Budget = () => {
    return (
        <div className='title'>
            Budget
            <div>
                <Chart 
                chartType='BarChart'
                width="100%"
                height="400px"
                data={data}
                options={options}
                />
            </div>
        </div>
    )
}

export default Budget;