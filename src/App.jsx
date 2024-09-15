import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
        setError('');
      } else {
        setError(data.message);
        setWeatherData(null);
      }
    } catch (error) {
      setError('Failed to fetch weather data.');
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      fetchWeather();
    }
  };

  return (
    <div className="app-container">
      <div className="weather-box">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-bar"
          />
          <button type="submit" className="search-button">Get Weather</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p>Temperature: {Math.round(weatherData.main.temp)}°C</p>
            <p>Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
            <p>Weather condition: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Pressure: {weatherData.main.pressure} hPa</p>
            <p>Wind speed: {weatherData.wind.speed} m/s</p>
            <p>Cloudiness: {weatherData.clouds.all}%</p>
            <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
