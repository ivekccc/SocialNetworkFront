import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/aboutus" element={<AboutUs/>}/>
                    </Route>
                </Routes>
            </div>
        </Router>
  );
}

export default App;
