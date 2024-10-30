import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const res = await axios.post(`http://localhost:3000/api/users/login`, { username, password });
            console.log('Logged in:', res.data);
    
            // Store user info as needed
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
    
            // Navigate user to home page
            navigate('/');
        } catch (error) {
            setError('Invalid username or password');
            console.error('Error logging in:', error.response?.data);
        }
    };
    

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" className="login-button">Login</button>
            </form>
            <p className="register-link">Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default LoginForm;
