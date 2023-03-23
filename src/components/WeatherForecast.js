import dayjs from 'dayjs';
import React, { useEffect, useState, useCallback } from 'react';

const ApiKey = 'a25ec963031250d4387449d8ca4e3a7d';

function WeatherForecast({ location }) {
  const [forecast, setForecast] = useState();
  const [setError] = useState(null);

  const getForecast = useCallback(async () => {
    try {
      const respone = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${ApiKey}`
      );
      const data = await respone.json();
      const filteredForecast = data.list
        .filter((forecast) => {
          const forecastTime = dayjs
            .unix(forecast.dt + 28800)
            .subtract(8, 'hour');
          const currentTime = dayjs();
          return forecastTime.isAfter(currentTime);
        })
        .slice(0, 12);
      setForecast(filteredForecast);
    } catch (error) {
      setError('Error fetching weather Data');
    }
  }, [location, setError]);

  useEffect(() => {
    getForecast();
  }, [location, getForecast]);

  return (
    <div className='forecast'>
      {forecast?.map((item) => {
        let time = dayjs.unix(item.dt + 28800).subtract(8, 'hour');
        let weatherIcon = item?.weather?.[0]?.icon;
        return (
          <div key={item.dt} className='weatherForecast'>
            <div>{`${time.$y}-${time.$M}-${time.$D}`}</div>
            <div>{`${time.$H}:00`}</div>
            <img
              src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
              alt='weather icon'
            />
            <h4>{item?.weather?.[0]?.main}</h4>
            <h4>{(item?.main?.temp - 273).toFixed(0)}°C</h4>
          </div>
        );
      })}
    </div>
  );
}

export default WeatherForecast;
