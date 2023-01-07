import React from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from './component/profile/Profile';
import Budget from './component/budget/Budget';
import { Home, Features, Rewards, About, Register, RegisterSuccess, SignIn } from "./component/index"
import { ForgotUsername, UsernameRecovery, ForgotPassword } from "./component/index"
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="features" element={<Features />} />
      <Route path="rewards" element={<Rewards />} />
      <Route path="about" element={<About />} />
      <Route path="register" element={<Register />} />
      <Route path="success" element={<RegisterSuccess />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="forgot your username" element={<ForgotUsername />} />
      <Route path="username recovery" element={<UsernameRecovery />} />
      <Route path="forgot your password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;