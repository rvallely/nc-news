import React from 'react';
import { Link} from 'react-router-dom';
import logo from '../../imgs/NC.png';

const Header = () => {
        return ( 
            <Link className='Header-link' key='articles' to='/articles'>
                {/* <h1 className ='Header'>NC News</h1> */}
                <img className ='Header' src={logo} alt='nc logo'/>
            </Link>
        ) 
}

export default Header;