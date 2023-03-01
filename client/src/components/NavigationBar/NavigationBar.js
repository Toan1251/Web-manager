import React from "react";
import './NavigationBar.css';
import { NavLink } from "react-router-dom";
import { IoHome } from 'react-icons/io5'

const NavigationBar = () => {
    return (
        <nav className="navigation">
            <div className="nav-links">
                <NavLink
                    to='/'
                    className='nav-link-home'
                >
                    <IoHome size='25px' />
                </NavLink>
                <NavLink 
                    to='/import'
                    className='nav-link'
                    activeClassName="nav-link-active"
                >
                    Import a Project
                </NavLink>
                <NavLink 
                    to='/crawl'
                    className='nav-link'
                    activeClassName="nav-link-active"
                >
                    Crawl a Site
                </NavLink>
            </div>
        </nav>
    )
}

export default NavigationBar