import React from 'react';
import Header from './Header';
import Date from './Date';
import Nav from './Nav';

const User = () => {
    // reimplement with data from the server when built and tested /users endpoint fully
    const defaultUser = {
        username: 'jessjelly',
        name: 'Jess Jelly',
        avatar_url:
          'https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141'
      }
    return (
        <div>
            {/* <div className='header-date'>
              <Header />  
              <Date />
            </div> */}
            <Nav />
            <h3>Welcome back {defaultUser.username}!</h3>
            <img 
                src={defaultUser.avatar_url} 
                alt={defaultUser.username}>
            </img>
        </div>
    )
   
}

export default User;