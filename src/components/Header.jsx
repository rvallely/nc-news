import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const Header = () => {
    return <Link className='Header-link' key='articles' to='/articles'>
               <h1 className ='Header'>NC News</h1>
           </Link>;
}

export default Header;