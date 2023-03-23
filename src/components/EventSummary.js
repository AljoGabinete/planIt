import React, { useState } from 'react';
import { BiSave, BiEdit } from 'react-icons/bi';
import { GrFormClose } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';

function EventSummary({ calEvents, setCalEvents, showEventSum }) {
  const [editedEvent, setEditedEvent] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [chosenID, setChosenID] = useState('');
  const [newEvent, setNewEvent] = useState({
    id: Date.now(),
    calEvent: '',
    date: '',
    time: '',
    status: '',
  });

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    // Edit Task
    if (editedEvent.event !== '') {
      setShowEdit(false);
      const taskIndex = calEvents.findIndex(
        (event) => event.id === editedEvent.id
      );
      const updatedEvent = { ...calEvents[taskIndex], ...editedEvent };
      const updatedEvents = [
        ...calEvents.slice(0, taskIndex),
        updatedEvent,
        ...calEvents.slice(taskIndex + 1),
      ];
      setCalEvents(updatedEvents);
    } else {
      // Add New Task

      setCalEvents([...calEvents, newEvent]);
    }
    setEditedEvent({});
    setNewEvent({
      id: Date.now(),
      calEvent: '',
      date: '',
      time: '',
      status: '',
    });
  };

  const handleEditEvent = (event, id) => {
    setChosenID(id);
    setShowEdit(true);
    setEditedEvent(event);
    setNewEvent({});
  };

  const handleDeleteEvent = (event) => {
    const newEvents = calEvents.filter((item) => item.event !== event.event);
    setCalEvents(newEvents);
  };

  return (
    showEventSum && (
      <>
        {calEvents.map((item) => {
          return showEdit && chosenID ? (
            <form onSubmit={handleSubmitEvent} className='actSumm'>
              <div>
                <label htmlFor='event'>Event:</label>
                <input
                  type='text'
                  name='event'
                  value={editedEvent.calEvent}
                  onChange={(event) =>
                    setEditedEvent({
                      ...editedEvent,
                      calEvent: event.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor='date'>Date:</label>
                <input
                  type='date'
                  name='date'
                  value={editedEvent.date}
                  onChange={(event) =>
                    setEditedEvent({
                      ...editedEvent,
                      date: event.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor='time'>Time:</label>
                <input
                  type='time'
                  name='time'
                  value={editedEvent.time}
                  onChange={(event) =>
                    setEditedEvent({
                      ...editedEvent,
                      time: event.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor='status'>Status:</label>
                <select
                  name='status'
                  value={editedEvent.status}
                  onChange={(event) =>
                    setEditedEvent({
                      ...editedEvent,
                      status: event.target.value,
                    })
                  }
                >
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
              </div>{' '}
              <div className='summEditBtn'>
                <button type='submit'>
                  <BiSave />
                </button>
                <button type='button' onClick={() => setShowEdit(false)}>
                  <GrFormClose />
                </button>
              </div>
            </form>
          ) : (
            <div key={item.id} className='actSumm'>
              <div>Event: {item.calEvent}</div>
              <div>Date: {item.date}</div>
              <div>Time: {item.time}</div>
              <div>Status: {item.status}</div>
              <div className='summBtn'>
                <button onClick={() => handleEditEvent(item, item.id)}>
                  <BiEdit />
                </button>
                <button onClick={() => handleDeleteEvent(item)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          );
        })}
      </>
    )
  );
}

export default EventSummary;
