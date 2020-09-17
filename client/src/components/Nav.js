import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <ul className="nav-links">
                <h3>Logo goes here</h3>
                <Link to = '/'>
                    <li>Home</li>
                </Link>
                
                <Link to ='/shopByCategory'>
                    <li>Shop by category</li>
                </Link>
                
                <Link to ='/login'>
                    <li>Sign in</li>
                </Link>
                
                <Link to="/register">
                    <li>Register</li>
                </Link>
                
            </ul>
        </nav>
    )
}

export default Nav