import Date from '../General/Date';
import Header from '../General/Header';
import Nav from '../General/Nav';
import UserDisplay from '../General/UserDisplay';

const UserFeedback = () => {
    return (
        <div>
            <div className='header-date'>
                <Header />  
                <Date />
            </div>
            <UserDisplay /> 
            <Nav />
            <p>Successfully deleted!</p>
        </div>
    )
}

export default UserFeedback;