import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';

function Login() {
    const { login } = useAuth();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null);

   const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
        const token = await loginUser(username, password);
        login(token);
        console.log(token);
    } catch (error) {
        setError('Invalid username or password');
    }
};

  return (
    <form onSubmit={handleLogin}>
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}

export default Login
