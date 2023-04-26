const Filter = ({ filterText, handleFilterTextChange }) => (
    <>
        filter shown with <input value={filterText} onChange={handleFilterTextChange} />
    </>
)

export default Filter