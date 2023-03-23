import React, { useReducer, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import PendingAct from './PendingAct';
import CompletedAct from './CompletedAct';

const initialTask = () => {
  const storedTasks = localStorage.getItem('CalendarTasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const currDate = `${dayjs().format('YYYY-MM-DD')}`;

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: Date.now(),
          date: currDate,
          task: action.payload,
          status: 'Pending',
        },
      ];

    case 'DELETE_TASK':
      return state.filter((item) => item.id !== action.payload);

    case 'EDIT_TASK':
      return state.map((task) => {
        if (task.id === action.payload.taskID) {
          return { ...task, task: action.payload.newTask };
        }
        return task;
      });

    case 'FINISH_TASK':
      const updatedTasks = state.map((task) => {
        if (task.id === +action.payload) {
          return { ...task, status: 'Completed' };
        }
        return task;
      });
      return updatedTasks;

    case 'REOPEN_TASK':
      const reopenTasks = state.map((task) => {
        if (task.id === +action.payload) {
          return { ...task, status: 'Pending' };
        }
        return task;
      });
      return reopenTasks;

    default:
      return;
  }
};

function Activities() {
  const [tasks, dispatch] = useReducer(reducer, initialTask());
  const [chosenID, setChosenID] = useState();
  const [showInputErr, setShowInputErr] = useState(false);
  const [errMess, setErrMess] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [editedTask, setEditedTask] = useState('');
  const [showEdit, setShowEdit] = useState(false);

  const props = {
    tasks,
    dispatch,
    showInputErr,
    setShowInputErr,
    errMess,
    setErrMess,
    chosenID,
    setChosenID,
    showAddTask,
    setShowAddTask,
    editedTask,
    setEditedTask,
    showEdit,
    setShowEdit,
    currDate,
  };

  useEffect(() => {
    localStorage.setItem('CalendarTasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className='activities'>
      <PendingAct {...props} />
      <CompletedAct {...props} />
    </div>
  );
}

export default Activities;
