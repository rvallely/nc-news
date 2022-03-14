import { useContext } from 'react';
import { UserContext } from '../contexts/User';
import { Link } from 'react-router-dom';

const UserDisplay = () => {
    const userValues = useContext(UserContext);
    // console.log(userValues);


    return (
        <Link className='link' key='user' to='/user'>
            <div className = 'header-date' id='user-display'>
                <p id='user-username'>{userValues.username}</p>
                <img id='user-avatar-url' src={userValues.avatar_url} alt={userValues.username}></img>
            </div>
        </Link>
    );   
}

export default UserDisplay;

