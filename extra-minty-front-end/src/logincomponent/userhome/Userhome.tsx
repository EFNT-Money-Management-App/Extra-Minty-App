import * as React from 'react';
import { Chart } from 'react-google-charts';

export const data = [
    ["Task", "Hours per Day"],
    ["Utilities", 200],
    ["Entertainment", 200],
    ["Food", 400],
    ["Transportation", 250],
    ["Miscellaneous", 350],
    ["Rent", 800]
  ];

  export const options = {
    title: "Expenses",
  };

const Userhome = () => {
    return (
        <div>
            This is the userhome page
            <Chart 
            chartType='PieChart'
            data={data}
            options={options}
            width={"100%"}
            height={"400%"}
            />
        </div>
    )
}

export default Userhome;