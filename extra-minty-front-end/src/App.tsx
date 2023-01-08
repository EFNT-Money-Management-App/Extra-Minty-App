import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home, Features, Rewards, About, Register, RegisterSuccess, SignIn } from "./component/index"
import { ForgotUsername, UsernameRecovery, ForgotPassword, PasswordRecovery } from "./component/index"
import { Profile, Budget, Accounts, Peppermint, Userhome, W, Signout } from "./logincomponent/index"
import { Route, Routes, Outlet } from 'react-router-dom';
import Header from './component/header/Header';
import Footer from './global/footer/Footer';
import LogInHeader from './logincomponent/header/Header'

const HomePage = () => (
  <div>
    <div>
      <Header />
    </div>
    <div>
      <Outlet />
    </div>
    <div>
      <Footer />
    </div>
  </div>
);

const UserPage = () => (
  <div>
    <div>
      <LogInHeader />
    </div>
    <div>
      <Outlet />
    </div>
    <div>
      <Footer />
    </div>
  </div>
)

function App() {
  return (
    <>
    <div>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<HomePage />} >
        <Route path="home" element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="about" element={<About />} />
        <Route path="register" element={<Register />} />
        <Route path="success" element={<RegisterSuccess />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="forgot your username" element={<ForgotUsername />} />
        <Route path="username recovery" element={<UsernameRecovery />} />
        <Route path="forgot your password" element={<ForgotPassword />} />
        <Route path="password recovery" element={<PasswordRecovery />} />
        <Route path="signout" element={<Signout />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
    <div>
      <Routes>
        <Route path="/" element={<UserPage />} >
        <Route path="profile" element={<Profile />} />
        <Route path="budget" element={<Budget />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="peppermint" element={<Peppermint />} />
        <Route path="userhome" element={<Userhome />} />
        <Route path="w" element={<W />} />
        </Route>
      </Routes>
    </div>
    </>
  );
}

export default App;