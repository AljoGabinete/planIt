import React from 'react';
import { GrFormAdd, GrFormClose } from 'react-icons/gr';

function ActInput(props) {
  const handleAddTask = (e) => {
    e.preventDefault();
    props.setShowAddTask(false);

    const task = e.target.task.value.trim('').toLowerCase();
    if (props?.task?.length === 0) {
      props.setShowInputErr(true);
      props.setErrMess('Field cannot be Empty');
      e.target.task.value = '';
      return;
    } else {
      if (props.tasks.find((item) => item.task === task)) {
        props.setShowInputErr(true);
        props.setErrMess('Item Already Exists');
        e.target.task.value = '';
        return;
      }
    }

    props.dispatch({ type: 'ADD_TASK', payload: task });
    e.target.task.value = '';
    props.setShowInputErr(false);
  };

  return (
    <>
      <div className='pendingActInput'>
        <h3>Pending Activities</h3>
        {props.showAddTask ? (
          <button
            className='addAct'
            onClick={() => props.setShowAddTask(false)}
          >
            <GrFormClose />
          </button>
        ) : (
          <button className='addAct' onClick={() => props.setShowAddTask(true)}>
            <GrFormAdd />
          </button>
        )}
      </div>

      {props.showAddTask ? (
        <div className='pendingActInput'>
          <form onSubmit={handleAddTask}>
            <input name='task' placeholder='Enter Task...'></input>
            <button type='submit' className='submit'>
              Add
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default ActInput;
