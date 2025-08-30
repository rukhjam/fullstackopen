const Filter = ({ filterString, handleFilterString }) =>
    <div>
        find countries <input value={filterString} onChange={handleFilterString} />
    </div>

export default Filter