import * as React from 'react';
import Header from '../../header/Header';

const ForgotUsername = () => {
    return (
        <div>
            <Header />
            <div>Enter your email address</div>
            <input type="text"/>
            <a href="username recovery">
                <button>Submit</button>
            </a>
        </div>
    )
}

export default ForgotUsername;