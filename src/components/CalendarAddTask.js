import React from 'react';

function CalendarAddTask({ handleSubmitTask, task, setTask }) {
  return (
    <form onSubmit={handleSubmitTask}>
      <div className='formInput'>
        <label htmlFor='task'> Task : </label>
        <input
          type='text'
          id='task'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>

      <div className='modalAddBtn'>
        <button type='submit'>Add</button>
      </div>
    </form>
  );
}

export default CalendarAddTask;
