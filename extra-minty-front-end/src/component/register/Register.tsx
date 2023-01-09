import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
    
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [password, setPassword] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [registered, setRegistered] = useState(false);

    const handleInputChange = (e: any) => {
        const {id, value} = e.target;
        if(id === "userName") {
            setUserName(value);
        }
        if(id === "firstName") {
            setFirstName(value);
        }
        if(id === "lastName") {
            setLastName(value);
        }
        if(id === "email") {
            setEmail(value);
        }
        if(id === "birthdate") {
            setBirthdate(value);
        }
        if(id === "password") {
            setPassword(value);
        }
        if(id === "securityQuestion") {
            setSecurityQuestion(value);
        }
        if(id === "securityAnswer") {
            setSecurityAnswer(value);
        }
    }

    const handleSubmit = () => {
        axios.post("http://localhost:8080/api/register", {
            login: userName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        })
        .then((response) => {
            axios.post("http://localhost:8080/api/profiles", {
                birthdate: birthdate,
                securityQuestion: securityQuestion,
                securityAnswer: securityAnswer,
            })
            .then((response) => 
            console.log("succeed",response));
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return !registered ? (
        <div>
            <ol>
                <li>Insert your username here:</li>
                <input value={userName} onChange = {(e) => handleInputChange(e)} id="userName" type="text"/>
                <li>Insert your first name here:</li>
                <input value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" type="text"/>
                <li>Insert your last name here:</li>
                <input value={lastName} onChange = {(e) => handleInputChange(e)} id="lastName" type="text"/>
                <li>Insert your email:</li>
                <input value={email} onChange = {(e) => handleInputChange(e)} id="email" type="text"/>
                <li>Insert your birthdate here:</li>
                <input value={birthdate} onChange = {(e) => handleInputChange(e)} id="birthdate" type="text"/>
                <li>Insert your password here:</li>
                <input value={password} onChange = {(e) => handleInputChange(e)} id="password" type="password"/>
                <li>Re-enter your password:</li>
                <input type="password"/>
                <li>Enter your security question:</li>
                <input value={securityQuestion} onChange = {(e) => handleInputChange(e)} id="securityQuestion" type="text"/>
                <li>Enter your security answer:</li>
                <input value={securityAnswer} onChange = {(e) => handleInputChange(e)} id="securityAnswer" type="password"/>
                <li>Re-enter your security answer:</li>
                <input type="password"/>
            </ol>
                <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    ) : (
        <div>
            You have successfully registered!
        </div>
    );
}

export default Register;