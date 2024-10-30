import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/NewUserRegistrationPage.css";

const NewUserRegistrationForm = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post(`http://localhost:3000/register`, { username, password, email });
            console.log('User registered:', res.data);
            navigate('/login');
        } catch (err) {
            setError('Error registering the User, retry.');
            console.error('Error registering:', err.response?.data);
        }
    };

    return (
        <div className="registration-container">
            <h2>New User Registration</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
            <p className="login-link">Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default NewUserRegistrationForm;
