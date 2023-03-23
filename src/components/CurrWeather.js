import React, { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { BsSearch, BsCheckLg } from 'react-icons/bs';

const ApiKey = 'a25ec963031250d4387449d8ca4e3a7d';

function CurrWeather({ location, setLocation }) {
  const [lat, setLat] = useState('14.4793');
  const [long, setLong] = useState('121.0198');
  const [weatherInfo, getWeatherInfo] = useState({});
  const [setError] = useState(null);
  const [time, setTime] = useState(dayjs().$d);
  const [loading, setLoading] = useState(false);
  const [isInputShown, setIsInputShown] = useState(false);

  const getCoor = useCallback(
    async (location) => {
      //Get Lat and Long of Location
      try {
        const respone = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${location}}&limit=5&appid=${ApiKey}`
        );
        const data = await respone.json();
        setTime(dayjs().$d);
        setLat(data[0].lat.toFixed(7));
        setLong(data[0].lon.toFixed(7));
      } catch (error) {
        setError('Error fetching weather Data');
      }
    },
    [setError]
  );

  const getWeather = useCallback(async () => {
    if (lat && long) {
      setLoading(true);
      try {
        const weatherResp = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${ApiKey}`
        );
        const weatherData = await weatherResp.json();
        getWeatherInfo(weatherData);
      } catch (error) {
        setError('Error fetching weather Data');
      }
      setLoading(false);
    }
  }, [lat, long, setError]);

  useEffect(() => {
    getWeather();
    getCoor(location);
  }, [location, getCoor, getWeather]);

  const handleSubmit = (loc) => {
    getCoor(loc);
    getWeather();
    setIsInputShown(false);
  };

  return (
    <div className='currWeather'>
      <div className='currWeatherInput'>
        {isInputShown ? (
          <>
            <form onSubmit={() => handleSubmit(location)}>
              <input onChange={(e) => setLocation(e.target.value)}></input>
              <button type='submit'>
                <BsCheckLg className='checkBtn' />
              </button>
            </form>
          </>
        ) : (
          <>
            <h1>{`${location} ${weatherInfo?.sys?.country}`}</h1>
            <button onClick={() => setIsInputShown(true)}>
              <BsSearch />
            </button>
          </>
        )}
      </div>
      <div className='currWeatherTime'>{`${time}`}</div>
      <div className='currWeatherInfo'>
        <div className='currWeatherDescr'>
          <div className='currWeatherImg'>
            <div>
              <img
                src='http://openweathermap.org/img/wn/10d@2x.png'
                alt='weather icon'
              />
            </div>
            <div>
              <h1>{`${(weatherInfo?.main?.temp - 273).toFixed(0)} °C `}</h1>
            </div>
          </div>
          {loading ? (
            <div> Loading...</div>
          ) : (
            <>
              <h2>{`${weatherInfo?.weather?.[0]?.main} `}</h2>
            </>
          )}
        </div>
        <div className='currWeatherDetails'>
          {loading ? (
            <div> Loading...</div>
          ) : (
            <>
              <div>{`Min Temp: ${(weatherInfo?.main?.temp_min - 273)?.toFixed(
                0
              )} °C`}</div>
              <div>{`Max Temp: ${(weatherInfo?.main?.temp_max - 273)?.toFixed(
                0
              )} °C`}</div>
              <div>{`Humidity: ${weatherInfo?.main?.humidity} %`}</div>
              <div>{`Wind Direction: ${weatherInfo?.wind?.deg}°`}</div>
              <div>{`Wind Speed: ${weatherInfo?.wind?.speed?.toFixed(
                1
              )} m/s`}</div>
              {weatherInfo?.wind?.gust ? (
                <div>{`Gustiness ${weatherInfo?.wind?.gust?.toFixed(
                  0
                )}m/s`}</div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrWeather;
