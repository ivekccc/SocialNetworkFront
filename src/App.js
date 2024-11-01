import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';
import PrivateRoute from './components/PrivateRoute';
import PrivateLayout from './components/PrivateLayout';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<PrivateRoute />}>
                        <Route element={<PrivateLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/users/:username" element={<UserProfile />}/>
                            {/* Dodajte ostale privatne rute ovde */}
                        </Route>
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;