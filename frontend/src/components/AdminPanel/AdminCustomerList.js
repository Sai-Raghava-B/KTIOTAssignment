

import React, { useState } from 'react';

function AdminCustomer() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password , email }),
      });
      if (response.ok) {
        setMessage('Customer registered successfully');
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error registering customer:', error);
      setMessage('Failed to register customer');
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Register Customer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminCustomer;
