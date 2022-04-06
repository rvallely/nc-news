import Date from "./Date";
import Header from "./Header";
import Nav from "./Nav"
import UserDisplay from "./UserDisplay";

const Error = ({ message, status }) => {
    return (
        <div>
            <div className='header-date'>
                      <Header />  
                      <Date />
                      <UserDisplay /> 
            </div>
            <Nav />
            <p>Status {status}</p>
            <p>{message}</p>
        </div>

    )
}

export default Error;