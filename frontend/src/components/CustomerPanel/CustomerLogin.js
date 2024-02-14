
import React, { useState } from 'react';

function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login');
    }
  };

  return (
    <div>
      <h2>Customer Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default CustomerLogin;
