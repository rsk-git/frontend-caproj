import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

export default function NavBar() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('username') || localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                {isLoggedIn && <li><Link to="/my-recipes">My Recipes</Link></li>}
                {isLoggedIn && <li><Link to="/recipe/createrecipe">Create Recipe</Link></li>}
                <li><Link to="/recipes">Recipes</Link></li>
                {isLoggedIn ? (
                    <li>
                        <button 
                            className="logout-button" 
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}
