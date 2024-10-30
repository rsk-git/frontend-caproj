import React from "react";
import {Link} from 'react-router-dom';
import "../styles/ErrorPage.css";

 Error = ()=> {
    return (
        <div style = {{textAlign: 'center', margin : '50px'}}>
            <h1> Sorry! The page is not found</h1>
            <p>
                <Link to= "/">Go back to Home Page</Link>
            </p>
        </div>
    )  
}

export default Error;