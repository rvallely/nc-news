import { useState, useContext } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { getSingleUser } from '../utils/api';
import Nav from "./Nav";
import Error from './Error';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from 'toastify-js'
import { injectStyle } from "react-toastify/dist/inject-style";
import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)
 
   const navigate = useNavigate(); 

   const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, password };
        getSingleUser(user).then((user) => {
            // if (true) check password is correct
                // if (true) login
                // if (false) alert('Password is incorrect')
            
            // set user in context
            setLoggedInUser(user)
            setError(null);
            // navigate to articles
            navigate('/articles');
            
        })
        // if (false) alert('Not a registered user')
        .catch((err) => {
            setError(err)
            alert('User not found. Please try again.') 
            setUsername('');
            setPassword('');
            setError(null);
        });
    }
    
    /*if (error) {
        console.log(Object.keys(error));
        console.log(error.response.status);
        setUsername('');
        setPassword('');
        setError(null);
        if(error.response.status === 404) {
            console.log('error')
            notify()
        }  
    } else {
*/
    return (
        <div>
            <h1>Welcome to NC News!</h1>
            <p>Please choose an option to continue</p>
            <div className='login-form'>
            <h2>Please log in below</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                  type='text'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
                <label>Password:</label>
                <input
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <br></br>
                <br></br>
                <button>Login</button>
            </form>
            <p>In state: {username}</p>
            <p>In state: {password}</p>
            </div>  
            <Link className='link' key='home' to='/articles'>Continue as guest</Link>
        </div>
        
        )
    //}
}

export default Login;