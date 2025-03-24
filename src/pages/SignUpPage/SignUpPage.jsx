import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import Logo from '../../assets/images/logo-light.svg';
import './SignUpPage.scss';

export default function SignUpPage(){
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [error, setError] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return; 
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        email,
        password,
      });
      const { token } = response.data;

      localStorage.setItem('token', token);
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Error registering user');
    }
  };

  return (
    <div className="sign-up__page">
      <div className="sign-up">
        <h2 className="sign-up__head">Sign Up</h2>
        <form onSubmit={handleSubmit} className="sign-up__form">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          <Input
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
          {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match!</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button
            className="btn--primary"
            type="submit"
            text="Sign Up"
          />
        </form>
        <div className="sign-up__sign-in">
            <p className="sign-up__text">
              Already have an account?{' '}
            </p>
            <Button
              className="btn--link"
              onClick={() => navigate('/signin')}
              text="Sign in"
            />
        </div>
      </div> 
      <img src={Logo} className="sign-in__logo"/>
    </div>
  );
};