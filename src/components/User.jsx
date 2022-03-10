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
            <h3>Welcome back {user.loggedInUser.username}!</h3>
            <img 
                src={user.loggedInUser.avatar_url} 
                alt={user.loggedInUser.username}>
            </img>
            <Link className='link' key={`${user.loggedInUser.username}_comments`} to='/user/comments'>
                            <h3>some comments</h3>
            </Link>

        </div>
    )
   
}

export default User;