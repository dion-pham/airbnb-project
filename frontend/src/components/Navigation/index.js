// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='navBar-sessionLinks'>
                <div>
                    <NavLink to='/spots/create'>Become a Host</NavLink>
                </div>
                <div>
                    <ProfileButton user={sessionUser} />
                </div>
            </div>
        );
    } else {
        sessionLinks = (
            <div className='navBar-sessionLinks'>
                <>
                    <LoginFormModal />
                    <SignUpFormModal />
                    {/* <NavLink to="/signup">Sign Up</NavLink> */}
                </>
            </div>
        );
    }
    return (
        <ul className='navBar no-bullets'>
            <li>
                <NavLink exact to="/">
                    <img src='https://i.imgur.com/zYlOYUG.png' alt="Spot's image" width="75" height="75"></img>
                </NavLink>
            </li>
            <li>  {isLoaded && sessionLinks}</li>
        </ul>
    );
}

export default Navigation;
