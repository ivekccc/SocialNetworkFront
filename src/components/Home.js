import React from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
};
  return (
    <div>
    <h1>Welcome to the Home Page!</h1>
    <button onClick={handleLogout}>Logout</button>
</div>
  )
}

export default Home