import React from 'react';
import ActBtn from './ActBtn';

function CompletedAct(props) {
  const completedTasks = props.tasks.filter(
    (item) => item.status === 'Completed'
  );
  return (
    <div
      className='completedActivities top'
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const taskId = e.dataTransfer.getData('taskId');
        props.dispatch({ type: 'FINISH_TASK', payload: taskId });
      }}
    >
      <h3>Completed Activities</h3>
      {completedTasks?.map((item) => {
        return (
          <ActBtn
            item={item}
            key={item.id}
            chosenID={props.chosenID}
            dispatch={props.dispatch}
            editedTask={props.editedTask}
            setEditedTask={props.setEditedTask}
            showEdit={props.showEdit}
            setShowEdit={props.setShowEdit}
            setChosenID={props.setChosenID}
            tasks={props.tasks}
          />
        );
      })}
    </div>
  );
}

export default CompletedAct;
