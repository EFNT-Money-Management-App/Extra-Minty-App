import * as React from 'react';

const ForgotUsername = () => {
    return (
        <div>
            <div>Enter your email address</div>
            <input type="text"/>
            <a href="username recovery">
                <button>Submit</button>
            </a>
        </div>
    )
}

export default ForgotUsername;