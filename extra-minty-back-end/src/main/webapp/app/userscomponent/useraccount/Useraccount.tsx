import React from "react";
import './Useraccount.css';
import './Hi';
import Hi from "./Hi";

const Useraccount = () => {
    return (
        <div>
            <Hi />
        </div>
    )
}

export default Useraccount;

//This file takes in components and info to create the table of the page. 
// We have to make sure the buttons map to a bank account
//in whichever bank account we access the transactions
//every transaction adds on a record to the table.
//we also have to grab the balance and put it on the page depending on the button.
//make a request to database, fetch these things from the database and send to client

// GOAL1: Update balance given the buttons