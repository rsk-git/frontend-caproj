import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateRecipe.css';

const CreateRecipe = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
    
        const recipeData = {
            title,
            ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
            instructions,
        };
    
        console.log("Data being sent to server:", recipeData); // Debugging line
    
        try {
            // Retrieve token from localStorage
            const token = localStorage.getItem('token');
            
            const response = await axios.post('http://localhost:3000/api/recipes', recipeData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token in the Authorization header
                },
            });
    
            if (response.status === 201) {
                setSuccess(true);
                setTitle('');
                setIngredients('');
                setInstructions('');
            } else {
                setError('Unexpected response from server.');
            }
        } catch (error) {
            console.error('Error creating recipe:', error.response ? error.response.data : error.message);
            setError(error.response?.data?.error || 'Unexpected response from server.');
        }
    };
    

    return (
        <div className="create-recipe-container">
            <h1>Create Recipe</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Recipe created!</p>}
            <form onSubmit={handleSubmit} className="recipe-form">
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Ingredients (comma separated):</label>
                    <input
                        type="text"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Instructions:</label>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="create-button">Create Recipe</button>
            </form>
        </div>
    );
};

export default CreateRecipe;
