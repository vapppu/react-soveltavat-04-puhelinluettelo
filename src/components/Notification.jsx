const Notification = ({message}) => {

    console.log(message)

    if (message) {
        const errorClass = "notification ".concat(message.isError ? "failure" : "success")
        console.log(errorClass)
    return (
        <div className={errorClass}>Notification: {message.text} {message.isError}</div>
    )
    }
}

export default Notification