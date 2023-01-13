import React from "react";
import { useState } from "react";
import axios from "axios";
import Transactionmodal from "../transactionmodal/Transactionmodal";



const Hi = () => {
    // the actual view of the tables
    const [checkingTable, setCheckingTable] = useState(true)
    const [savingsTable, setSavingsTable] = useState(false)
    // balance that changes
    const [checkingBalance, setCheckingBalance] = useState(0.00)
    const [savingsBalance, setSavingsBalance] = useState(0.00)
    // allows the buttons to switch tables
    const checkingHandler = () => {
        setCheckingTable(true)
        setSavingsTable(false)
    }
    const savingsHandler = () => {
        setSavingsTable(true)
        setCheckingTable(false)
    }

    // get accounts by user
    axios.get('api/user/bank-accounts/{id}')
        .then (respone => {
            // make it do something later
            (respone.data)
        })
        .catch( err => {
            // handle the errors
            console.error(err)
        })
    // add more stuff for this to do later...
    const handleClick = () => {
        
    }
    return (
        <div>
            <button onClick={checkingHandler}>Checking Account</button>
            <button onClick={savingsHandler}>Savings Account</button>
            <Transactionmodal/>
            {checkingTable &&(
                <div>
                    <span className="balance">
                        Checking Account: ${checkingBalance}
                    </span>
                    <table>
                    <col width="20px" />
                    <col width="30px" />
                    <col width="30px" />
                    <col width="40px" />
                    <col width="40px" />
                        <tr>
                            {/* these are column names */}
                            <th>Date </th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Amount</th>
                            <th>Type</th>
                        </tr>
                        <tr>
                            {/* a transaction and its details */}
                            <td>12-26-2022</td>
                            <td>Food</td>
                            <td>Ramen Kumamoto - Newark</td>
                            <td>$14.00</td>
                        </tr>
                        <tr>
                            <td>12-30-2022</td>
                            <td>Misc</td>
                            <td>Well's Fargo ATM - Wilmington</td>
                            <td>$2.00</td>
                        </tr>
                        <tr>
                            <td>12-31-2022</td>
                            <td>Entertainment</td>
                            <td>Skating Rink - Christiana</td>
                            <td>$20.95</td>
                        </tr>
                        <tr>
                            <td>01-03-2023</td>
                            <td>Bill</td>
                            <td>Delmarva</td>
                            <td>$219.00</td>
                        </tr>
                        <tr>
                            <td>01-10-2023</td>
                            <td>Bill</td>
                            <td>AT&T</td>
                            <td>$190.70</td>
                        </tr>
                    </table>
                </div>
            )}
            {savingsTable && (
                <div>
                    <span className="balance">
                        Savings Account: ${savingsBalance}
                    </span>
                    <table>
                        <col width="20px" />
                        <col width="30px" />
                        <col width="30px" />
                        <col width="40px" />
                        <col width="40px" />
                        <tr>
                            {/* these are column names */}
                            <th>Date </th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Amount</th>
                            <th>Type</th>
                        </tr>
                        <tr>
                            {/* a transaction and its details */}
                            <td>12-26-2022</td>
                            <td>Transportation</td>
                            <td>Sunoco - Newark</td>
                            <td>$54.87</td>
                        </tr>
                        <tr>
                            <td>12-26-2022</td>
                            <td>Transportation</td>
                            <td>Sunoco - Newark</td>
                            <td>$54.87</td>
                        </tr>
                        <tr>
                            <td>12-26-2022</td>
                            <td>Transportation</td>
                            <td>Sunoco - Newark</td>
                        <td>$54.87</td>
                        </tr>
                        <tr>
                            <td>12-26-2022</td>
                            <td>Transportation</td>
                            <td>Sunoco - Newark</td>
                            <td>$54.87</td>
                        </tr>
                        <tr>
                            <td>12-26-2022</td>
                            <td>Transportation</td>
                            <td>Sunoco - Newark</td>
                            <td>$54.87</td>
                        </tr>
                    </table>
                </div>
            )}
        </div>
    )
}
export default Hi;