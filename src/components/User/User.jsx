import React, {useContext   } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import Date from '../General/Date';
import Header from '../General/Header';
import Logout from '../General/Logout';
import Nav from '../General/Nav';
import UserDisplay from '../General/UserDisplay';


const User = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)

    if (loggedInUser.username === 'Log in') {
        return (
            <div>
                <div className='header-date'>
                    <Header />  
                    <Date />
                </div>
                <UserDisplay /> 
                <Nav />
                <p className='user-login-msg'>Please log in to view your user area.</p>
                <Link className='link' key='redirect' to='/'><h3 id='login-form-button' className='login-form-button'>Log in</h3></Link>
            </div>
        )
    } else {
        return (
            <div>
                <div className='header-date'>
                    <Header />  
                    <Date />
                </div>
                <UserDisplay /> 
                <Nav />
                <h3>Welcome back {loggedInUser.username}!</h3>
                <img 
                  src={loggedInUser.avatar_url} 
                  alt={loggedInUser.username}>
                </img>
                <Link className='link' key={`${loggedInUser.username}_comments`} to='/user/comments'>
                    <h3>My Comments</h3>
                </Link>
                <Link className='link' key={`${loggedInUser.username}_articles`} to='/user/articles'>
                    <h3>My Articles</h3>
                </Link>
                <Link className='link' key={`${loggedInUser.username}_post_article`} to='/user/post_article'>
                    <h3>Post an article</h3>
                </Link>
                <Logout />
            </div>
        )
    }
}

export default User;