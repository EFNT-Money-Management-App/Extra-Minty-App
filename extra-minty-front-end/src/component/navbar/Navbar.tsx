import * as React from 'react';
import "./Navbar.css"

const Navbar = () => {
    return (
        <div className="header-right">
            <a href="/">Home</a>
            <a href="features">Features</a>
            <a href="rewards">Rewards</a>
            <a href="about">About</a>
            <a href="register">
                <button>Register</button>
            </a>
            <a href="signin">
                <button>Sign In</button>
            </a>
        </div>
    )
}

export default Navbar;