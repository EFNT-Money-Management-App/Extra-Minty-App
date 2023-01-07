import * as React from 'react';
import Navbar from '../navbar/Navbar';
import "./Header.css"

const Header = () => {
    return (
    <div className="header">
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