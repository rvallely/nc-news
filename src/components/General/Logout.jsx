import { useContext } from 'react';
import { UserContext } from '../../contexts/User';

const Logout = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const logUserOut = () => {
        setLoggedInUser({
            username: 'Log in',
            name: '',
            avatar_url: 'https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png'
        });
    };
    return (
        <button 
          className='user-area-button'
          id='user-area-logout'
          onClick={logUserOut}>
            Log out 
        </button>
    );
}

export default Logout;