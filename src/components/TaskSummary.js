import React, { useState } from 'react';
import { BiSave, BiEdit } from 'react-icons/bi';
import { GrFormClose } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';

function TaskSummary({ tasks, setTasks, showTaskSum }) {
  const [editedTask, setEditedTask] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [chosenID, setChosenID] = useState('');
  const [newTask, setNewTask] = useState({
    id: Date.now(),
    task: '',
    date: '',
    status: '',
  });

  const handleSubmit = (e) => {
    setShowEdit(false);
    e.preventDefault();
    // Edit Task
    if (editedTask.task !== '') {
      const taskIndex = tasks.findIndex((task) => task.id === editedTask.id);
      const updatedTask = { ...tasks[taskIndex], ...editedTask };
      const updatedTasks = [
        ...tasks.slice(0, taskIndex),
        updatedTask,
        ...tasks.slice(taskIndex + 1),
      ];
      setTasks(updatedTasks);
    } else {
      // Add New Task
      setTasks([...tasks, newTask]);
    }

    setEditedTask({});
    setNewTask({ id: Date.now(), task: '', date: '', status: '' });
  };

  const handleEdit = (task, id) => {
    setChosenID(id);
    setShowEdit(true);
    setEditedTask(task);
    setNewTask({});
  };

  const handleDelete = (task) => {
    const newTasks = tasks.filter((item) => item.task !== task.task);
    setTasks(newTasks);
  };

  const taskClass = (status) => {
    if (status === 'Pending') {
      return 'actSumm pending';
    } else {
      return 'actSumm completed';
    }
  };

  return (
    showTaskSum && (
      <>
        {tasks.map((item) => {
          return showEdit && chosenID === item.id ? (
            <form onSubmit={handleSubmit} className='actSumm'>
              <div>
                <label htmlFor='task'>Task:</label>
                <input
                  type='text'
                  name='task'
                  value={editedTask.task}
                  onChange={(event) =>
                    setEditedTask({
                      ...editedTask,
                      task: event.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor='date'>Date:</label>
                <input
                  type='date'
                  name='date'
                  value={editedTask.date}
                  onChange={(event) =>
                    setEditedTask({
                      ...editedTask,
                      date: event.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor='status'>Status:</label>
                <select
                  name='status'
                  value={editedTask.status}
                  onChange={(event) =>
                    setEditedTask({
                      ...editedTask,
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
            <div key={item.id} className={`${taskClass(item.status)}`}>
              <div>Task: {item.task}</div>
              <div>Date: {item.date}</div>
              <div>Status: {item.status}</div>
              <div className='summBtn'>
                <button onClick={() => handleEdit(item, item.id)}>
                  <BiEdit />
                </button>
                <button onClick={() => handleDelete(item)}>
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

export default TaskSummary;
