const Filter = ({ filterString, handleFilterString }) =>
    <div>
        filter shown with <input value={filterString} onChange={handleFilterString} />
    </div>

export default Filter