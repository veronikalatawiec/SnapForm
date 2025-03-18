import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';

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
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
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
      <p>
        Already have an account?{' '}
        <Button
          className="btn--link"
          onClick={() => navigate('/signin')}
          text="Sign in"
        />
      </p>
    </div>
  );
};