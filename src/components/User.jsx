import React, {useContext   } from 'react';
import { UserContext } from '../contexts/User';
import Header from './Header';
import Date from './Date';
import Nav from './Nav';
import UserComments from './UserComments';
import { Link } from 'react-router-dom';

const User = () => {
    // reimplement with data from the server when built and tested /users endpoint fully

      const user = useContext(UserContext);
  
    return (
        <div>
            {/* <div className='header-date'>
              <Header />  
              <Date />
            </div> */}
            <Nav />
            <h3>Welcome back {user.username}!</h3>
            <img 
                src={user.avatar_url} 
                alt={user.username}>
            </img>
            <Link className='link' key={`${user.username}_comments`} to='/user/comments'>
                            <h3>My Comments</h3>
            </Link>
            <Link className='link' key={`${user.username}_articles`} to='/user/articles'>
                            <h3>My Articles</h3>
            </Link>

        </div>
    )
   
}

export default User;