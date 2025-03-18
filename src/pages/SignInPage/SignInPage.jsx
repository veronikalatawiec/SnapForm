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
      const response = await axios.post('http://localhost:5050/users/login', {
        email,
        password,
      });
      const { token } = response.data;
      // Store the JWT token in localStorage
      localStorage.setItem('token', token);
      navigate('/home'); // Redirect to the home page after successful sign-in
    } catch (err) {
      setError(err.response?.data?.message || 'Error logging in');
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