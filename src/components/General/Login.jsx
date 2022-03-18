import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { getSingleUser } from '../../utils/api';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)
 
   const navigate = useNavigate(); 

   const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, password };
        console.log(username, password);
        getSingleUser(username, password).then((user) => {
           // console.log(user, '<<< get single u')
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
            //console.log(err.response.data.msg)
            setError(err)
            alert('User not found. Please try again.') 
            setUsername('');
            setPassword('');
            setError(null);
        });
    }
    return (
        <div className='login-container'>
            <div className='login-form'>
                <h2>NC News</h2>
                <h2>Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div className='login-form-input-box'>
                        <input
                          type='text'
                          placeholder='Username'
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        ></input>
                    </div>
                    <div className='login-form-input-box'>
                        <input
                          type='password'
                          placeholder='Password'
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <br></br>
                    <br></br>
                    <button>Login</button>
                </form>
                <h2>or</h2>
                <Link style={{'text-decoration': 'underline', 'color': '#fff'}} className='link' key='home' to='/articles'>
                    <h2>Continue as guest</h2>
                </Link>
            </div>   
        </div>
    )
}

export default Login;