import * as React from 'react';

const ForgotPassword = () => {
    return (
        <div>
            <div>Enter security question here</div>
            <input type="text"/>
            <a href="password recovery">
                <button>Submit</button>
            </a>
        </div>
    )
}

export default ForgotPassword;