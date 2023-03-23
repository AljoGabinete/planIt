import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import MonthNav from '../components/MonthNav';
import { MonthContext } from '../provider/MonthProvider';
import CalendarModal from '../components/CalendarModal';
import { GrAdd } from 'react-icons/gr';
import CalSummary from '../components/CalSummary';

const dayOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function Calendar() {
  const [currDate] = useContext(MonthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('Monthly');
  const [date, setDate] = useState();
  const [hoveredKey, setHoveredKey] = useState(null);

  const [calEvents, setCalEvents] = useState(() => {
    const storedEvents = localStorage.getItem('CalendarEvents');
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('CalendarTasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Create Empty Array to display days of the month
  const monthArr = [];

  //Fill the calendar with dates based on corresponding month
  const fillDates = () => {
    let startDate = dayjs().year(currDate.$y).month(currDate.$M).date(1);

    for (let i = 0; i < 42; i++) {
      monthArr[i] = dayjs()
        .year(currDate.$y)
        .month(currDate.$M)
        .date(1 - startDate.$W)
        .add(i, 'day');
    }
  };

  //Set Classname of divs to differenciate current motnh
  const getClassName = (day) => {
    if (currDate.$M !== day.$M) {
      return 'otherDays day';
    }
    if (dateFormat(day) === dateFormat(dayjs())) {
      return 'day today';
    } else {
      return 'day';
    }
  };

  //Handle when Date is clicked
  const handleDateClick = (id) => {
    setDate(id);
    setModalOpen(true);
  };

  const handleDrop = (taskDrop, day, eventDrop) => {
    //Handle when task is dropped
    let updatedDate = dateFormat(day);
    const updatedTask = tasks.map((item) => {
      if (item.task === taskDrop) {
        return { ...item, date: updatedDate };
      }
      return item;
    });
    //When Event is dropped
    const updatedEvents = calEvents.map((item) => {
      if (item.calEvent === eventDrop) {
        return { ...item, date: updatedDate };
      }
      return item;
    });

    setTasks(updatedTask);
    setCalEvents(updatedEvents);
  };

  useEffect(() => {
    localStorage.setItem('CalendarTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('CalendarEvents', JSON.stringify(calEvents));
  }, [calEvents]);

  fillDates();

  const dateFormat = (date) => {
    return `${date.format('YYYY-MM-DD')}`;
  };

  return (
    <>
      <MonthNav
        months={months}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <div className='calendar'>
        <div className='daysOfTheWeek'>
          {dayOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        {monthArr.map((item) => {
          const formattedDate = dateFormat(item);
          const eventsOnDate = calEvents.filter(
            (event) => event.date === formattedDate
          );
          const tasksOnDate = tasks.filter(
            (task) => task.date === formattedDate
          );
          const hasEventsOrTasksOnDate =
            eventsOnDate.length > 0 || tasksOnDate.length > 0;
          return (
            <div
              className={`${getClassName(item)} hoverable`}
              id={dateFormat(item)}
              key={dateFormat(item)}
              onClick={(e) =>
                handleDateClick(item, e.target.getAttribute('id'))
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const taskDrop = e.dataTransfer.getData('task');
                const eventDrop = e.dataTransfer.getData('event');
                handleDrop(taskDrop, item, eventDrop);
              }}
              onMouseEnter={() => setHoveredKey(dateFormat(item))}
              onMouseLeave={() => setHoveredKey(null)}
            >
              {item.$D}
              {calEvents.map((calEvent) =>
                calEvent.date === formattedDate ? (
                  <div
                    className='calendarEvent'
                    key={calEvent.calEvent}
                    draggable='true'
                    onDragStart={(e) =>
                      e.dataTransfer.setData('event', calEvent.calEvent)
                    }
                  >
                    {calEvent.calEvent}
                  </div>
                ) : null
              )}

              {tasks.map((task) =>
                task.date === formattedDate ? (
                  <div
                    className='calendarTask'
                    key={task.task}
                    draggable='true'
                    onDragStart={(e) =>
                      e.dataTransfer.setData('task', task.task)
                    }
                  >
                    <span>
                      {task.task.length > 5
                        ? task.task.substring(0, 5) + '...'
                        : task.task}
                    </span>
                  </div>
                ) : null
              )}

              {hoveredKey === formattedDate && !hasEventsOrTasksOnDate && (
                <GrAdd className='hoverAdd' />
              )}
            </div>
          );
        })}
        <CalendarModal
          tasks={tasks}
          setTasks={setTasks}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          date={date}
          setCalEvents={setCalEvents}
          calEvents={calEvents}
        />
      </div>
      <div className='calSummary'>
        <CalSummary
          tasks={tasks}
          setTasks={setTasks}
          calEvents={calEvents}
          setCalEvents={setCalEvents}
        />
      </div>
    </>
  );
}

export default Calendar;
