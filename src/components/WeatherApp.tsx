import React from 'react'
import searchIcon from '../assets/search.png'
import styles from './Weather.module.css'
import lightShowers from '../assets/lightshowersandsun.png'
import clearSkies from '../assets/clear-skies.png'
import cloudy from '../assets/cloudy.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import thunderstorm from '../assets/thunderstorm.png'
import atmosphere from '../assets/atmosphere.png'
import humidity from '../assets/humidity.png'
import windSpeed from '../assets/wind.png'
import { useState, useEffect } from 'react'
import type { weatherIcon, weatherData } from '../types/types'
import { iconMapping } from '../types/types';

const WeatherApp = () => {
    const [weather, setWeather] = useState<weatherData | null>(null);
    const [city, setCity] = useState<string>("Nairobi");

   
const iconImages: Record<weatherIcon, string> = {
    'rain': rain, 
    'cloudy': cloudy, 
    'clearSkies': clearSkies,
    'snow': snow,
    'thunderstorm': thunderstorm,
    'lightShowers': lightShowers,
    'atmosphere': atmosphere 
};
    const updateWeatherInfo = async (city: string): Promise<weatherData> => {
        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`;
            const response = await fetch(apiUrl);
            const data = await response.json(); 
            
            const cleanData: weatherData = {
                temperature: Math.round(data.main.temp),
                windSpeed: data.wind.speed,
                humidity: data.main.humidity,
                icon: iconMapping(data.weather[0].id)
            };
            
            return cleanData;
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        updateWeatherInfo(city)
            .then(data => setWeather(data))
            .catch(error => console.error("Failed to fetch weather:", error));
    }, [city]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Search will be triggered when user presses enter
    };

    return (
        <div className={styles.weatherContainer}>
            <div className={styles.inputCity}>
                <form onSubmit={handleSearch} className={styles.inputField}>
                    <input 
                        type="text" 
                        placeholder="Enter City Name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </form>
                <div className={styles.searchIcon}>
                    <img src={searchIcon} alt="Search"/>
                </div>
            </div>

            {weather ? (
                <>
                    <div className={styles.weatherInfo}>
                        <p className={styles.cityName}>{city}</p>
                        <img 
                            src={iconImages[weather.icon]} 
                            alt={weather.icon} 
                            className={styles.weatherImage}
                        />
                        <div className={styles.weatherSummary}>
                            <p>{weather.temperature}℃</p>
                            <p>{weather.icon}</p>
                        </div>
                    </div>

                    <div className={styles.extraWeatherInfo}>
                        <div className={styles.Humidity}>
                            <img src={humidity} alt="Humidity" className={styles.humidity} />
                            <p>Humidity</p>
                            <p>{weather.humidity}%</p>
                        </div>
                        <div className={styles.windSpeed}>
                            <img src={windSpeed} alt="Wind Speed" className={styles.WindSpeed} />
                            <p>Wind Speed</p>
                            <p>{weather.windSpeed} km/h</p>
                        </div>
                    </div>
                </>
            ) : (
                <div className={styles.loading}>Loading weather data...</div>
            )}
        </div>
    )
}

export default WeatherApp
