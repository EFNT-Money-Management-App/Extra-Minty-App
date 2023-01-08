import * as React from 'react';
import Navbar from '../navbar/Navbar';
import logo from './mintyLogo.png'
import "./Header.css"

const Header = () => {
    return (
    <div className="header">
        <img className="header-logo" src={logo} alt="Logo" />
        <h1 className="header-name">
            Extra Minty
        </h1>
        <section className="navbar">
            <Navbar />
        </section>
    </div>
    )
}

export default Header;