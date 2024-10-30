import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // State to keep track of the current page
    const recipesPerPage = 10; // Number of recipes per page

    // Get the search query from URL
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query') || 'vegetable';

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const response = await axios.get(import.meta.env.VITE_EDAMAM_API_URL, {
                    params: {
                        q: query,
                        app_id: import.meta.env.VITE_EDAMAM_APP_API_ID,
                        app_key: import.meta.env.VITE_EDAMAM_APP_API_KEY,
                        from: (page - 1) * recipesPerPage,
                        to: page * recipesPerPage,
                        health: 'vegetarian'
                    },
                });
                setRecipes(response.data.hits);
            } catch (err) {
                setError('Failed to load recipes from Edamam API');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [query, page]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Function to handle page change
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="recipe-list">
            <h1>Recipe List</h1>
            <ul>
                {recipes.map(({ recipe }) => (
                    <li key={recipe.uri} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
                        <h2>{recipe.label}</h2>
                        {recipe.image && (
                            <img src={recipe.image} alt={recipe.label} style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', marginBottom: '10px' }} />
                        )}
                        <p><strong>Ingredients:</strong> {recipe.ingredientLines.join(', ')}</p>
                        <p><strong>Instructions:</strong> {recipe.url ? <a href={recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a> : 'No instructions available'}</p>
                    </li>
                ))}
            </ul>
            {/* Pagination Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        color: 'white',
                        backgroundColor: '#4CAF50',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                >
                    Previous
                </button>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Page {page}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        color: 'white',
                        backgroundColor: '#4CAF50',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RecipeList;
