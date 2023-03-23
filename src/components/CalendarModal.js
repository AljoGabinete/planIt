import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import CalendarAddEvent from './CalendarAddEvent';
import CalendarAddTask from './CalendarAddTask';

function CalendarModal({
  modalOpen,
  setModalOpen,
  setTasks,
  tasks,
  date,
  setCalEvents,
  calEvents,
}) {
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [calEvent, setCalEvent] = useState('');
  const [formtype, setFormtype] = useState(true);
  //Add task to date
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const addEvent = (event) => {
    setCalEvents([...calEvents, event]);
  };

  //Handle to close modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  //Handle Submit button for Tasks
  const handleSubmitTask = (e) => {
    e.preventDefault();
    addTask({
      id: Date.now(),
      task,
      date: `${date.format('YYYY-MM-DD')}`,
      status: 'Pending',
    });
    setTask('');
    handleCloseModal();
  };

  //Handle Submit button for Events
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    addEvent({
      id: Date.now(),
      calEvent,
      time,
      date: `${date.format('YYYY-MM-DD')}`,
      status: 'Pending',
    });
    setTime('');
    setCalEvent('');
    handleCloseModal();
  };

  const handleFormTypeBtn = (type) => {
    setFormtype(type);
  };

  return modalOpen ? (
    <div className='modal' onClick={() => handleCloseModal()}>
      <div className='modalContent' onClick={(e) => e.stopPropagation()}>
        {/* Toggle Form Type  */}
        <div className='formType'>
          <button
            activeclassname='activeFormType'
            onClick={() => handleFormTypeBtn(true)}
          >
            Add Task
          </button>
          <button
            activeclassname='activeFormType'
            onClick={() => handleFormTypeBtn(false)}
          >
            Add Event
          </button>
        </div>
        <button className='closeModalBtn' onClick={() => handleCloseModal()}>
          <GrFormClose />
        </button>
        {formtype ? (
          <CalendarAddTask
            handleSubmitTask={handleSubmitTask}
            task={task}
            setTask={setTask}
          />
        ) : (
          <CalendarAddEvent
            handleSubmitEvent={handleSubmitEvent}
            calEvent={calEvent}
            setCalEvent={setCalEvent}
            time={time}
            setTime={setTime}
          />
        )}
      </div>
    </div>
  ) : null;
}

export default CalendarModal;
