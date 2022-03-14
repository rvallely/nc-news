const Error = ({message, status}) => {
    console.log('The msg is: ', message)
    console.log('The status is: ', status)
    return (
        <div>
            <p>Status {status}</p>
            <p>{message}</p>
        </div>

    )
}

export default Error;