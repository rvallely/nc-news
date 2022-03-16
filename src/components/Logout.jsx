import { useContext } from 'react';
import { UserContext } from '../contexts/User';

const Logout = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    const toggleUser = () => {
        setLoggedInUser({
            username: 'guest',
            name: '',
            avatar_url: 'https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png'
        });
    };
  
    return (
      <button onClick={toggleUser} className='logout'>
        Log out
      </button>
    );
}

export default Logout;