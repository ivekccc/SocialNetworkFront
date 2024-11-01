import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
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
                            {/* Додајте остале приватне руте овде */}
                        </Route>
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;