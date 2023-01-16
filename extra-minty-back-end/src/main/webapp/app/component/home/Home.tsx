import * as React from 'react';
import './Home.css'

const Home = () => {
    return(
        <div>
            <h2 className="home-linestyle"><strong>Happy New Years!</strong> Have you set your <strong>resolution</strong> yet? Does that resolution includes <strong>keeping track of your budget</strong>? Are you having trouble <strong>keeping track</strong> of where your money goes? Are you tired of that <strong>Mint App thingy</strong>?</h2>
            <h1 className="home-h1">TIME FOR A CHANGE!</h1>
            <h3 className="home-linestyle">Start your year right with <strong>Extra Minty!</strong> This app provides a bunch of <a href="/features" className="custom-link">FEATURES</a> where it will definitely keep you in track of your spending so it aligns with your <strong>budget</strong>. From <strong>transferring money</strong> here and there, <strong>spending and saving</strong>, this app does it all! There's also <a href="/rewards" className="custom-link">REWARDS</a> system where you get more money into your pocket by <strong>contributing to your savings goal</strong> (but that does not mean you can spend more).</h3>
        </div>
    )
}

export default Home;