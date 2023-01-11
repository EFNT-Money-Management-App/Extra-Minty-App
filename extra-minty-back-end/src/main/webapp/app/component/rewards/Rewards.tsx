import * as React from 'react';
import './Rewards.css'

const Rewards = () => {
    return(
        <div className="rewards-text">
            <section>Get rewards for contributing towards your savings goal!</section>
            <section>For each <span className="peppermint-points">$1.00</span> contributed, <span className="peppermint-points">1</span> point is awarded towards your <span className="peppermint-points">PepperMint points.</span></section>
            <section>Points can be redeeemed once balance reaches <span className="peppermint-points">500</span> points which is equivalent to <span className="peppermint-points">$5.00</span> redemption.</section>
        </div>
    )
}

export default Rewards;