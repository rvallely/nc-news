import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
        return ( 
            <Link className='Header-link' key='articles' to='/articles'>
                <h1 className ='Header'>NC News</h1>
            </Link>
        ) 
}

export default Header;