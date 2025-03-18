import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';

export default function SignInPage(){
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
        email,
        password,
      });
      const { token } = response.data;
      console.log(token);
      // Store the JWT 
      localStorage.setItem('token', token);
      navigate('/home'); 
    } catch (err) {
      console.error('Error during sign-in:', err); 
      setError(err);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button
          className="btn--primary"
          type="submit"
          text="Sign In"
        />
      </form>
      <p>
        Don't have an account?{' '}
        <Button
          className="btn--link"
          onClick={() => navigate('/signup')}
          text="Sign up"
        />
      </p>
    </div>
  );
};