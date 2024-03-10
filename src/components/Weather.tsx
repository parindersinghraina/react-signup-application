import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css'; // Import the CSS file
import config from '../config.json';

interface Location {
  Key: string;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
}

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const accuWeatherApiKey = config.ACCUWEATHER_API_KEY;

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const fetchLocationKey = async (city: string, country: string): Promise<string | null> => {
    try {
      const locationResponse = await axios.get<Location[]>(`http://dataservice.accuweather.com/locations/v1/cities/search?q=${city}&country=${country}&apikey=${accuWeatherApiKey}`);
      const location = locationResponse.data.find(
        location => location.LocalizedName === city.charAt(0).toUpperCase() + city.slice(1).toLowerCase() && location.Country.LocalizedName === country.charAt(0).toUpperCase() + country.slice(1).toLowerCase()
      );

      if (location) {
        return location.Key;
      } else {
        console.error(`${city} in ${country} not found in the response.`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching location key:', error);
      throw error;
    }
  };
    const handleGetWeather = async () => {
        try {
              const locationKey = await fetchLocationKey(city, country);

            const weatherResponse = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${accuWeatherApiKey}`);
            setWeatherData(weatherResponse.data);
            setShowPopup(true);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

  return (
    <div className="weather-container">
      <h1>Weather in {city}</h1>
      <label>
        Enter City:
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Enter Country:
        <input
          type="text"
          value={country}
          onChange={handleCountryChange}
        />
      </label>
      <button onClick={handleGetWeather}>Result</button>

      {showPopup && (
        <div className="weather-popup">
          <p>{weatherData[0].WeatherText}</p>
          <p>{`${weatherData[0].Temperature.Metric.Value} ${weatherData[0].Temperature.Metric.Unit}`}</p>
          <img src={`${weatherData[0].WeatherIcon}.png`} alt="weather Icon" height="150" width="150" />
          {/* Add Link of Result */}
          <p>
            <a href={weatherData[0].Link} target="_blank" rel="noopener noreferrer">
                More Weather Info
            </a>
        </p>
          {/* Add Footer Powered by Accuweather with link */}
          <p>Powered by <a href="https://www.accuweather.com/en">Accuweather</a></p>
          <button className="close-popup" onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Weather;
