import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { getSingleUser } from '../../utils/api';

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)
 
   const navigate = useNavigate(); 

   const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, password };
        getSingleUser(username, password).then((user) => {
            setLoggedInUser(user)
            setError(null);
            navigate('/articles');
            
        })
        .catch((err) => {
            setError(err);
            if (err.response.data.msg === 'Not Found: user not on database') {
                alert('User not found. Please try again.') 
            } else if (err.response.data.msg === 'Bad Request: incorrect password.') {
                alert('Incorrect password. Please try again.')
            }
            setUsername('');
            setPassword('');
            setError(null);
        });
    }
    return ( <p>sign up here</p>
        // <div className='login-container'>
        //     <div className='login-form'>
        //         <h2>NC News</h2>
        //         <h2>Please log in</h2>
        //         <form onSubmit={handleSubmit}>
        //             <div className='login-form-input-box'>
        //                 <input
        //                   type='text'
        //                   placeholder='Username'
        //                   required
        //                   value={username}
        //                   onChange={(e) => setUsername(e.target.value)}
        //                 ></input>
        //             </div>
        //             <div className='login-form-input-box'>
        //                 <input
        //                   type='password'
        //                   placeholder='Password'
        //                   required
        //                   value={password}
        //                   onChange={(e) => setPassword(e.target.value)}
        //                 ></input>
        //             </div>
        //             <br></br>
        //             <br></br>
        //             <button className='login-form-button'>Log in</button>
        //         </form>
        //         <h2>or</h2>
        //         <Link style={{'textDecoration': 'underline', 'color': '#fff'}} className='link' key='home' to='/articles'>
        //             <h2>Continue as a guest</h2>
        //         </Link>
        //     </div>   
        // </div>
    )
}

export default Signup;