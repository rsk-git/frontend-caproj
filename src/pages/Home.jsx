import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/HomePage.css";
import homepageGif from "../assets/7GpG.gif";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const username = localStorage.getItem('username') || 'User';

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <main>
            <h1>Welcome to the Recipe Search App</h1>
            <p>Your one-stop solution for discovering and creating recipes!</p>
            {username !== 'User' && <h2 style={{ textAlign: 'center' }}>Welcome back, {username}!</h2>}
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search for recipes..."
                    style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
                <button type="submit" style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}>Search</button>
            </form>
            <img src={homepageGif} alt="Animated GIF" className="homepage-gif" style={{ marginTop: '20px', maxWidth: '100%' }} />
        </main>
    );
};

export default Home;
