import * as React from 'react';
import Header from '../../header/Header';

const SignIn = () => {
    return (
        <div>
            <Header />
            <div>Enter your username</div>
            <input />
            <div>Enter your password</div>
            <input />
            <div>Forgot your password</div>
            <a href="forgot your username">
                <button>Forgot your username</button>
            </a>
            <a href="forgot your password">
                <button>Forgot your password</button>
            </a>
        </div>
    )
}

export default SignIn;