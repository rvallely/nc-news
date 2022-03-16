import Date from "./Date";
import Header from "./Header";
import Nav from "./Nav";
import UserDisplay from "./UserDisplay";

const UserFeedback = () => {
    return (
        <div>
            <div className='header-date'>
                <Header />  
                <Date />
            </div>
            <UserDisplay /> 
            <Nav />
            <p>Successfully deleted comment!</p>
        </div>
    )
}

export default UserFeedback;