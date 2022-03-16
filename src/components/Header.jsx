import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';

const Header = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)

    if (loggedInUser.username === 'guest') {
        return <h1 className ='Header'>NC News</h1>
    } else {
        return ( 
            <Link className='Header-link' key='articles' to='/articles'>
                <h1 className ='Header'>NC News</h1>
            </Link>
        )
    }

 
}

export default Header;