import React, { useState } from 'react';
import Activities from '../components/Activities';
import CurrWeather from '../components/CurrWeather';
import WeatherForecast from '../components/WeatherForecast';

function Dashboard() {
  const [location, setLocation] = useState('Paranaque');
  const [calEvents] = useState(() => {
    const storedEvents = localStorage.getItem('CalendarEvents');
    return storedEvents ? JSON.parse(storedEvents) : [];
  });
  return (
    <>
      <div className='container'>
        <CurrWeather location={location} setLocation={setLocation} />

        <WeatherForecast location={location} />

        <Activities />

        <div className='top evtDashboard'>
          <h3>Upcoming Events</h3>
          {calEvents?.map((item) => {
            return (
              <div className='evtSumm' key={item.id}>
                <div>
                  <span>{item.calEvent}</span>
                </div>

                <div>
                  <span>{item.time}</span>
                </div>

                <div>
                  <span>{item.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
