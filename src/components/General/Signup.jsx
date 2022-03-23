import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { getSingleUser } from '../../utils/api';

const Signup = () => {
    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)
 
   const navigate = useNavigate(); 

   const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, password, confirmPassword };
        console.log(user);
        // check passwords match
        if (password !== confirmPassword) {
            alert('Passwords must match.')
            console.log(e);
            window.location.reload(true);
        } else {
            console.log('matching')
        }
        // check user doesn't exist
        // if user doesn't exist {
            // postNewUser
        // if user does exist
            // if err.msg user exists
            // then alert('this user already exists');
       // }
        // getSingleUser(username, password).then((user) => {
        //     setLoggedInUser(user)
        //     setError(null);
        //     navigate('/articles');
            
        // })
        // .catch((err) => {
        //     setError(err);
        //     if (err.response.data.msg === 'Not Found: user not on database') {
        //         alert('User not found. Please try again.') 
        //     } else if (err.response.data.msg === 'Bad Request: incorrect password.') {
        //         alert('Incorrect password. Please try again.')
        //     }
        //     setUsername('');
        //     setPassword('');
        //     setError(null);
        // });
    }
    return (
        <div className='signup-container'>
            <div className='signup-form-container'>
                <h2 className='signup-form-heading'>NC News</h2>
                <h2 className='signup-form-description'>Sign up here:</h2>
                <form onSubmit={handleSubmit}>
                <div className='signup-form-input-box'>
                        <input
                          type='text'
                          placeholder='Full name'
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        ></input>
                    </div>
                    <div className='signup-form-input-box'>
                        <input
                          type='text'
                          placeholder='Username'
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        ></input>
                    </div>
                    <div className='signup-form-input-box'>
                        <input
                          type='password'
                          placeholder='Password'
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <div className='signup-form-input-box'>
                        <input
                          type='password'
                          placeholder='Confirm password'
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                    </div>
                    <br></br>
                    <br></br>
                    <button className='signup-form-button'>Sign up</button>
                </form>
                <h2 className='signup-form-heading'>or</h2>
                <Link style={{'textDecoration': 'underline', color: '#fff'}} className='link' key='home' to='/'>
                    <h2 className='signup-form-heading'>Back to Login</h2>
                </Link>
            </div>   
        </div>
    )
}

export default Signup;