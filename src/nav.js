import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Nav (){
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <ul className='navbar-nav'>

                <li className='nav-item'>
                    <Link to="/" className='nav-link'>Home</Link>
                </li>

                <li className='nav-item'>
                    <Link to="/login" className='nav-link'>Login</Link>
                </li>

                <li className='nav-item'>
                    <Link to="/register" className='nav-link right--1'>Register</Link>
                </li>

            </ul>
        </nav>
    );
}

export default Nav;
