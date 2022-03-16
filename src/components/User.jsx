import React, {useContext   } from 'react';
import { UserContext } from '../contexts/User';
import Header from './Header';
import Date from './Date';
import Nav from './Nav';
import UserComments from './UserComments';
import { Link } from 'react-router-dom';
import UserDisplay from './UserDisplay';
import Logout from './Logout';

const User = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)

    if (loggedInUser.username === 'guest') {
        return (
            <div>
                <div className='header-date'>
                    <Header />  
                    <Date />
                </div>
                <UserDisplay /> 
                <Nav />
                <p>Please log in to view your user area      </p>
                <Link className='link' key='redirect' to='/'><h3>Login</h3></Link>
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
            <Logout />

        </div>
    )
    }
   
}

export default User;