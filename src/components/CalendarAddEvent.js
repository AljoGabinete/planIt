import React from 'react';

function CalendarAddEvent({
  handleSubmitEvent,
  calEvent,
  setCalEvent,
  time,
  setTime,
}) {
  return (
    <form onSubmit={handleSubmitEvent}>
      <div className='formInput'>
        <label htmlFor='events'> Event: </label>
        <input
          type='text'
          id='events'
          value={calEvent}
          onChange={(e) => setCalEvent(e.target.value)}
        />
      </div>
      <div className='formInput'>
        <label htmlFor='time'> Time:</label>
        <input
          type='time'
          id='time'
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div className='modalAddBtn'>
        <button type='submit'>Add</button>
      </div>
    </form>
  );
}

export default CalendarAddEvent;
