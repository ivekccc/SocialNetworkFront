import React, { useState,useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import { Link,useNavigate } from 'react-router-dom';
import WebSocketService from '../services/WebSocketService';
import './Login.css';


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
        login(token,username);
        WebSocketService.notifyUserLogin(username);
        navigate("/")
    } catch (error) {
        setError('Invalid username or password');
    }
};

  return (
    <div className="login-container">
        <div className="login-illustration">
            <h1>Dobrodošli nazad!</h1>
            <p>Povežite se sa prijateljima i svetom oko vas.</p>
        </div>

        <div className="login-form-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Prijavite se</h2>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Korisničko ime"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Lozinka"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="login-button">
                    Prijavi se
                </button>

                <div className="register-link">
                    Nemate nalog? <Link to="/register">Registrujte se</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
