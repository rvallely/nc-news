import React from 'react';
import Nav from '../components/Nav';

const Redirect = () => {
    return (
        <div>
            <Nav />
            <h2>404: Not Found</h2>
            <h3 className= 'redirect-msg' >Whoops, looks like that page doesn't exist &#128579;</h3>
            <p>We are sorry we were unable to bring you the page that you requested. <br></br>
            Please:<br></br>
            - check the url you entered is correct.<br></br>
            - hit the refresh button in your browser.<br></br>
            - use the NC News Navigation Bar.</p>
        </div>

    )
}
export default Redirect;