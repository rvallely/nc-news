import { useState } from 'react';
import { getSingleUser } from '../utils/api';
import Nav from "./Nav";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, password };
        console.log(user)
        // check user is on the database
        // const use = user.username;
        // console.log(use);
        getSingleUser(user).then((user) => {
            console.log(user);
            // set user in context
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