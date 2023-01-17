import * as React from 'react';
import './Rewards.css'

const Rewards = () => {
    return(
        <div className="rewards-text">
            <section>Get rewarded for contributing towards your savings goal!</section>
            <section>For each  
                <span className="peppermint-points"> $1.00</span> contributed to a savings account, 
                <span className="peppermint-points"> 1</span> PepperMint Point earned. </section>
            <section>Earn badges for each PepperMint Point milestone you reach! </section>
        </div>
    )
}

export default Rewards;