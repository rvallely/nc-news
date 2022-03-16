import Nav from "./Nav"

const Error = ({ message, status }) => {
    return (
        <div>
            <Nav />
            <p>Status {status}</p>
            <p>{message}</p>
        </div>

    )
}

export default Error;