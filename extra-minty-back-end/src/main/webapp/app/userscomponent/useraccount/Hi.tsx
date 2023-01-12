import React from "react";
import { useState } from "react";
const Hi = () => {
    const [checkingTrans, setChecking] = useState(true)
    const [savingsTrans, setSavings] = useState(false)
    const checkingHandler = () => {
        setChecking(true)
        setSavings(false)
    }
    const savingsHandler = () => {
        setSavings(true)
        setChecking(false)
    }
    return (
        <div>
            <button onClick={checkingHandler}>Checking Account</button>
            <button onClick={savingsHandler}>Savings Account</button>
            {checkingTrans &&(
                <div>
                    <span className="balance">
                        Checking Account: $38.00
                    </span>
                    <table>
                    <col width="20px" />
                    <col width="30px" />
                    <col width="40px" />
                    <col width="40px" />
                        <tr>
                            {/* these are column names */}
                            <th>Date </th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Amount</th>
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
            {savingsTrans && (
                <div>
                    <span className="balance">
                        Savings Account: $1,054,235,134.19
                    </span>
                    <table>
                        <tr>
                            {/* these are column names */}
                            <th>Date </th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Amount</th>
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