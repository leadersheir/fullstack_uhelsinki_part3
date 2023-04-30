const Notification = ({ name, type, valdMsg }) => {
    const successMsg = `Added ${name}`
    const dupErrMsg = `Information of ${name} has already been removed from server`

    return (
        <div className={type==='suc' ? 'success' : type==='err' | type==='valdErr' ? 'error' : ''}>
            <p>{type==='suc' ? successMsg : type==='dup' ? dupErrMsg : type==='valdErr' ? valdMsg : ''}</p>
        </div>
    )
}

export default Notification