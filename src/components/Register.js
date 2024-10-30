import { useState, useEffect } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import './Register.css';

function Register() {
    const { authData } = useAuth();
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (authData.token) {
            navigate("/");
        }
    }, [authData.token, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            // Kreiranje preview-a slike
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('lastname', lastname);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const newUser = await registerUser(formData);
            console.log("Registration successful", newUser);
            navigate("/");
        } catch (error) {
            setError("Registration failed please try again");
        }
    };

    return (
        <div className="register-container">
            <div className="register-illustration">
                <h1>Pridružite se našoj zajednici!</h1>
                <p>Započnite svoje putovanje sa nama i povežite se sa svetom.</p>
            </div>

            <div className="register-form-container">
                <form onSubmit={handleRegister} className="register-form">
                    <h2>Registracija</h2>

                    {error && <p className="error-message">{error}</p>}

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Ime"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Prezime"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>

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

                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group image-upload-group">
                        <label htmlFor="profile-image" className="image-upload-label">
                            <span>Profilna slika</span>
                            <input
                                type="file"
                                id="profile-image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="image-input"
                            />
                        </label>
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                    </div>

                    <button type="submit" className="register-button">
                        Registruj se
                    </button>

                    <div className="login-link">
                        Već imate nalog? <Link to="/">Prijavite se</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;