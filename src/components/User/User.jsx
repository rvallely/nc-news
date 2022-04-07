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
                    <UserDisplay /> 
                </div>
                <Nav underline='user'/>
                <div className='user-area'>
                    <p className='user-area-txt'>Please log in to view your user area.</p>
                    <br></br>
                    <Link className='link' key='redirect-home' to='/'><h3 id='login-form-button' className='login-form-button'>Log in</h3></Link>
                    <p className='user-area-txt'>or</p><br></br>
                    <Link className='link' key='redirect-signup' to='/signup'><h3 id='signup-button' className='login-form-button'>Signup</h3></Link>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className='header-date'>
                    <Header />  
                    <Date />
                    <UserDisplay /> 
                </div>
                <Nav underline='user'/>
                <div className='user-area'>
                    <h3 className='user-area-welcome-msg'>Welcome back {loggedInUser.username}!</h3>
                    <div className='user-area-links-container'>
                        <Link className='link' key={`${loggedInUser.username}_comments`} to='/user/comments'>
                            <div className='user-area-link'>
                                <h3 className='user-area-link-txt'>My Comments</h3>
                                <h1 className='user-area-link-emo'>&#128483;</h1>
                            </div>
                        </Link>
                        <Link className='link' key={`${loggedInUser.username}_articles`} to='/user/articles'>
                            <div className='user-area-link'>
                                <h3 className='user-area-link-txt'>My Articles</h3>
                                <h1 className='user-area-link-emo'>&#128221;</h1>
                            </div>
                        </Link>
                    </div>
                    <Link className='link' key={`${loggedInUser.username}_post_article`} to='/user/post_article'>
                        <h3 className='user-area-button'>Post an article</h3>
                    </Link>
                    <Logout />
                </div>
            </div>
        )
    }
}

export default User;