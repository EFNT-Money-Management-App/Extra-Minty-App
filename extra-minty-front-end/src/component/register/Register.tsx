import * as React from 'react';

const Register = () => {
    return (
        <div>
            <ol>
                <li>Insert your username here:</li>
                <input type="text"/>
                <li>Insert your email:</li>
                <input type="text"/>
                <li>Insert your full name here:</li>
                <input type="text"/>
                <li>Insert your birthdate here:</li>
                <input type="text"/>
                <li>Insert your password here:</li>
                <input type="password"/>
                <li>Re-enter your password:</li>
                <input type="password"/>
                <li>Enter your security question:</li>
                <input type="text"/>
                <li>Enter your security answer:</li>
                <input type="password"/>
                <li>Re-enter your security answer:</li>
                <input type="password"/>
            </ol>
            <a href="success">
                <button>Submit</button>
            </a>
        </div>
    )
}

export default Register;