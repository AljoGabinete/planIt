import React, { useState, useEffect } from 'react';
import EventSummary from './EventSummary';
import TaskSummary from './TaskSummary';

function CalSummary({ tasks, setTasks, calEvents, setCalEvents }) {
  const [showTaskSum, setShowTaskSum] = useState(false);
  const [showEventSum, setShowEventSum] = useState(false);

  useEffect(() => {
    showTaskSum ? setShowEventSum(false) : setShowTaskSum(false);
    showEventSum ? setShowTaskSum(false) : setShowEventSum(false);
  }, [showEventSum, showTaskSum]);

  return (
    <div className='calSumm'>
      <div>
        <div className='summBtn'>
          <button
            onClick={() =>
              showTaskSum ? setShowTaskSum(false) : setShowTaskSum(true)
            }
          >
            {showTaskSum ? 'HIDE TASKS' : 'SHOW TASKS'}
          </button>
          <button
            onClick={() =>
              showEventSum ? setShowEventSum(false) : setShowEventSum(true)
            }
          >
            {showEventSum ? 'HIDE EVENTS' : 'SHOW EVENTS'}
          </button>
        </div>

        {showTaskSum ? (
          <TaskSummary
            tasks={tasks}
            setTasks={setTasks}
            showTaskSum={showTaskSum}
          />
        ) : null}

        {showEventSum ? (
          <EventSummary
            calEvents={calEvents}
            setCalEvents={setCalEvents}
            showEventSum={showEventSum}
          />
        ) : null}
      </div>
    </div>
  );
}

export default CalSummary;
