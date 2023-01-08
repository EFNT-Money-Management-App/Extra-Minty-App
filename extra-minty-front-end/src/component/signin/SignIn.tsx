import * as React from 'react';

const SignIn = () => {
    return (
        <div>
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
            <a href="profile">
                <button>Sign In</button>
            </a>
        </div>
    )
}

export default SignIn;