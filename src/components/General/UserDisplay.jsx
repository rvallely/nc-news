import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User';

const UserDisplay = () => {
    const user = useContext(UserContext);

    return (
        <Link className='link' key='user' to='/user'>
            <div className = 'header-date' id='user-display'>
                <p id='user-username'>{user.loggedInUser.username}</p>
                <img id='user-avatar-url' src={user.loggedInUser.avatar_url} alt={user.username}></img>
            </div>
        </Link>
    );   
}

export default UserDisplay;
