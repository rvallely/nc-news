import Nav from "./Nav";

const Login = () => {
    return (
        <div className='login-form'>
            {/* <Nav /> */}
            <h2>Please log in below</h2>
            <form >
                <label>Username:</label>
                <input
                  type='text'
                  required
                ></input>
                <label>Password:</label>
                <input
                  type='password'
                  required
                ></input>
                <br></br>
                <br></br>
                <button>Login</button>
            </form>
            <p>login screen</p>
        </div>)
}

export default Login;