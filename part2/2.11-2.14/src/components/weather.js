import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Weather = ({country}) => {
  const [wIcon, setWIcon] = useState('')
  const [temp, setTemp] = useState('')
  const [windSpd, setWindSpd] = useState('')
  const [windDirect, setWindDirect] = useState('')

  const params = {
    access_key : process.env.REACT_APP_WEATHER_API_KEY,
    query: country
  }

  useEffect(() => {
    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        const apiResponse = response.data;
        setWIcon(apiResponse.current.weather_icons[0])
        setTemp(apiResponse.current.temperature)
        setWindSpd(apiResponse.current.wind_speed)
        setWindDirect(apiResponse.current.wind_dir)
      }).catch(error => {
        console.log(error);
      })
  })

  return (
    <div>
      <h3>Weather in {country}</h3>
      <div>
        <div>
          <p><b>Temperature:</b> {temp} celcius</p>
        </div>
        <img src={wIcon} alt="Weather icon" width="100px" />
      </div>
      <div>
        <p><b>Wind:</b> {windSpd} mph direction {windDirect}</p>
      </div>
    </div>
    
  )
}

export default Weather