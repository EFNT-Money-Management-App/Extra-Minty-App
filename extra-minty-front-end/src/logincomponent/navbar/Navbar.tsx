import * as React from 'react';
import "./Navbar.css"

const Navbar = () => {
    return (
        <div className="header-right">
            <a href="w">W</a>
            <a href="budget">Budget</a>
            <a href="accounts">Accounts</a>
            <a href="peppermint">Peppermint</a>
            <a href="profile">Profile</a>
            <a href="userhome">Home</a>
            <a href="signout">
                <button>Sign Out</button>
            </a>
        </div>
    )
}

export default Navbar;