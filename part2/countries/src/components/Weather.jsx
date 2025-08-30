import axios from 'axios'
import { useState, useEffect } from 'react'

const Weather = ({ capital, lat, lng }) => {
    const [weatherData, setWeatherData] = useState(null)
    useEffect(() => {axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m`)
        .then(response => {
            setWeatherData(response.data)
        })}, [lat, lng])

    return (
        <div>
            <h2>Weather in {capital}</h2>
            {weatherData === null ? <div></div> :
                <div>
                    <div>Temperature {weatherData.current.temperature_2m} Celsius</div>
                    <img src="https://openweathermap.org/img/wn/10d@2x.png" />
                    <div>Wind {weatherData.current.wind_speed_10m} km/h</div>
                </div>
            }
        </div>
    )
}

export default Weather