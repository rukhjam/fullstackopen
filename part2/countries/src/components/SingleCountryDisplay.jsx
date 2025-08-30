import Weather from "./Weather"

const SingleCountryDisplay = ({ country }) => {
    const name = country.name.common
    const capital = country.capital? country.capital[0] : name
    const area = country.area
    const languagesObject = country.languages
    const languages = []
    for (const lang in languagesObject) {
        languages.push(languagesObject[lang])
    }
    const imageLink = country.flags.png
    const lat = country.capitalInfo.latlng[0]
    const lng = country.capitalInfo.latlng[1]

    return (
        <div>
            <h1>{name}</h1>
            <div>Capital {capital}</div>
            <div>Area {
                area}</div>
            <h2>Languages</h2>
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={imageLink} />
            <Weather capital={capital} lat={lat} lng={lng} />
        </div>
    )
}

export default SingleCountryDisplay