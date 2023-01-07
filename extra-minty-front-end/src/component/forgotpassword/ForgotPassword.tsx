import * as React from 'react';
import Header from '../../header/Header';

const ForgotPassword = () => {
    return (
        <div>
            <Header />
            <div>Enter security question here</div>
            <input type="text"/>
            <a href="password recovery">
                <button>Submit</button>
            </a>
        </div>
    )
}

export default ForgotPassword;