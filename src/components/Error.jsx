import Nav from "./Nav"

const Error = ({message, status, setError}) => {
    console.log('The msg is: ', message)
    console.log('The status is: ', status)
    console.log(setError)
    // setError(null);
    return (
        <div>
            <Nav />
            <p>Status {status}</p>
            <p>{message}</p>
        </div>

    )
}

export default Error;