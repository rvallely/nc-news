import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { getSingleUser } from '../utils/api';

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
                <h3>or</h3>
                <Link className='link' key='home' to='/articles'>
                    <h2>Continue as guest</h2>
                </Link>
            </div>   
        </div>
    )
}

export default Login;