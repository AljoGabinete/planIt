import React from 'react';
import { BiCheck, BiEdit, BiSave, BiUndo } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti';

function ActBtn({
  chosenID,
  dispatch,
  editedTask,
  item,
  tasks,
  setEditedTask,
  showEdit,
  setShowEdit,
  setChosenID,
}) {
  const handleEditTask = (id) => {
    dispatch({
      type: 'EDIT_TASK',
      payload: { taskID: id, newTask: editedTask },
    });
    setShowEdit(false);
    setEditedTask('');
  };

  const showEditForm = (id) => {
    setShowEdit(true);
    const task = tasks.find((item) => item.id === id);
    setChosenID(id);
    setEditedTask(task.task);
  };
  return (
    <div
      className='task'
      draggable='true'
      id={`task-${item.id}`}
      onDragStart={(e) => e.dataTransfer.setData('taskId', item.id)}
    >
      {showEdit && chosenID === item.id ? (
        <div className='editTask'>
          <input
            placeholder={item.task}
            onChange={(e) => setEditedTask(e.target.value)}
          ></input>
        </div>
      ) : (
        item.task
      )}

      <div className='taskBtn'>
        {item.status === 'Pending' ? (
          <>
            {showEdit && chosenID === item.id ? (
              <div className='editSaveBtn'>
                <button onClick={() => handleEditTask(item.id, editedTask)}>
                  <BiSave />
                </button>
              </div>
            ) : (
              <button onClick={() => showEditForm(item.id)}>
                <BiEdit />
              </button>
            )}

            <button
              onClick={() =>
                dispatch({ type: 'FINISH_TASK', payload: item.id })
              }
            >
              <BiCheck />
            </button>
          </>
        ) : (
          <button
            onClick={() => dispatch({ type: 'REOPEN_TASK', payload: item.id })}
          >
            <BiUndo />
          </button>
        )}

        <button
          onClick={() => dispatch({ type: 'DELETE_TASK', payload: item.id })}
        >
          <TiDelete />
        </button>
      </div>
    </div>
  );
}

export default ActBtn;
