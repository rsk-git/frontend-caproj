import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchMyRecipes = async () => {
          setLoading(true);
          setError(null);
  
          try {
              const token = localStorage.getItem('token');
              console.log("Token:", token); // Debugging line
  
              const response = await axios.get('http://localhost:3000/api/recipes/my-recipes', {
                  headers: {
                      Authorization: `Bearer ${token}`, // Attach token to authorize the request
                  },
              });
  
              console.log("Fetched recipes:", response.data); // Debugging line
              setRecipes(response.data);
          } catch (error) {
              console.error('Error fetching user recipes:', error);
              setError('Failed to load your recipes. Please try again.');
          } finally {
              setLoading(false);
          }
      };
  
      fetchMyRecipes();
  }, []);
  

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="my-recipes">
            <h1>My Recipes</h1>
            {recipes.length === 0 && !loading && (
                <p>No recipes found.</p>
            )}
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
                        <h2>{recipe.title}</h2>
                        <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                        <p><strong>Instructions:</strong> {recipe.instructions}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyRecipes;
