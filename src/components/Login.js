import React, { useState,useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import { Link,useNavigate } from 'react-router-dom';


function Login() {
    const { authData } = useAuth();
    const { login } = useAuth();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null);
   const navigate=useNavigate()

   useEffect(() => {
    if (authData.token) {
        navigate("/");
    }
}, [authData.token, navigate]);

   const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
        const token = await loginUser(username, password);
        login(token);
        console.log(token);
        navigate("/")
    } catch (error) {
        setError('Invalid username or password');
    }
};

  return (
    <div>
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
    <Link to="/register">Register</Link>
    </div>
  )
}

export default Login
