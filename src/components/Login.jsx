import { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/User';
import { getSingleUser } from '../utils/api';
import Nav from "./Nav";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)
   // console.log('current user context is ', loggedInUser);
   console.log('The user is ', loggedInUser);
   const navigate = useNavigate(); 
   
   const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, password };
        // console.log(user)
        // check user is on the database
        // const use = user.username;
        // console.log(use);
        getSingleUser(user).then((user) => {
            // console.log('User in set context', user);
            // set user in context
            setLoggedInUser(user)
            console.log('The user is ', loggedInUser)
            // navigate to articles
            navigate('/articles');
            
        })
        .catch((err) => {
            console.log(err);
            // setError({ err });
            // setIsLoading(false);
        })
        //.then((res) => {
        //     console.log(res);
        // })
        // if (true) check password is correct
            // if (true) login
            // if (false) alert('Password is incorrect')
        // if (false) alert('Not a registered user')
    }

    return (
        <div className='login-form'>
            {/* <Nav /> */}
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
        </div>)
}

export default Login;