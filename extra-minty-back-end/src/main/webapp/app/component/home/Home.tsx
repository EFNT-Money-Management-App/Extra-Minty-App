import * as React from 'react';
import './Home.css'

const Home = () => {
    return(
        <div>
            <h2 className="home-linestyle"><strong>Happy New Years!</strong> Did you set your <strong>resolutions</strong> yet? Do those resolutions include <strong>better management of your money and budgeting</strong>?</h2>
            <h1 className="home-h1">TIME FOR A CHANGE!</h1>
            <h3 className="home-linestyle">Start your year off right with <strong>Extra Minty!</strong> This app provides many <a href="/features" className="custom-link">FEATURES</a> that will definitely help you track your spending so it aligns with your <strong>budget</strong>. From <strong>transferring money</strong> here and there, <strong>spending and saving</strong>, this app does it all! There's also a <a href="/rewards" className="custom-link">REWARDS</a> system where you can earn badges by <strong>contributing to your savings goal</strong>.</h3>
        </div>
    )
}

export default Home;