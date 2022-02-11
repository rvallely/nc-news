import { useContext } from 'react';
import { UserContext } from '../contexts/User';

const UserDisplay = () => {
    const userValues = useContext(UserContext);
    console.log(userValues);

    return (
        < div className = 'header-date' id='user-display'>
            <p id='user-username'>{userValues.loggedInUser.username}</p>
            <img id='user-avatar-url' src={userValues.loggedInUser.avatar_url} alt={userValues.loggedInUser.username}></img>
        </div>
    );   
}

export default UserDisplay;


