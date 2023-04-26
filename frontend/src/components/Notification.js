const Notification = ({ name, type }) => {
    const successMsg = `Added ${name}`
    const errorMsg = `Information of ${name} has already been removed from server`

    return (
        <div className={type==='suc' ? 'success' : type==='err' ? 'error' : ''}>
            <p>{type==='suc' ? successMsg : type==='err' ? errorMsg : ''}</p>
        </div>
    )
}

export default Notification