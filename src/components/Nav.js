import React from 'react';
import { NavLink } from 'react-router-dom';


const Nav = props => (

    <nav className="main-nav">
        <ul>
        <li><NavLink to='/mountains'>Mountains</NavLink></li>
        <li><NavLink to='/rivers'>Rivers</NavLink></li>
        <li><NavLink to='/animals'>Animals</NavLink></li>
        </ul>
    </nav>

);



export default Nav;
