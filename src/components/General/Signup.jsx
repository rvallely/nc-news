import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { postNewUser } from '../../utils/api';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar_url, setAvatar_url] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)
 
   const navigate = useNavigate(); 

   const handleSubmit = (e) => {
        e.preventDefault();
        const user = { fullName, username, avatar_url, password};
        console.log(user);
        // check passwords match
        if (password !== confirmPassword) {
            alert('Passwords must match.')
            window.location.reload(true);
        } 
        else if (username.length > 29) {
            alert('Username must not exceed 30 characters.')
            window.location.reload(true);
        } 
        else {
            console.log('matching')
            postNewUser(user).then(() => {
                alert('Sign up successful, please log in.');
                navigate('/');
            });
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
                    <select 
                      className='signup-form-input-box'
                      id='signup-form-dropdown'
                      value={avatar_url}
                      onChange={(e) => { 
                        setAvatar_url(e.target.value);
                        }}> 
                        <option value='' disabled>Avatar image URL</option>
                        <option value='https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg'>Cat</option>
                        <option value='https://www.helpguide.org/wp-content/uploads/king-charles-spaniel-resting-head-768.jpg'>Dog</option>
                        <option value='https://www.rainforest-alliance.org/wp-content/uploads/2021/06/three-toed-sloth-teaser-1.jpg.optimal.jpg'>Sloth</option>
                    </select>
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