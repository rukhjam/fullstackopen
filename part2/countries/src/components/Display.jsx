const Display = ({ countries, handleShow }) => {

    return (
        <>
            {countries.map(country =>
                <div key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => handleShow(country)}>Show</button>
                </div>

            )}
        </>
    )
}

export default Display