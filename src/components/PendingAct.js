import React from 'react';

import ActInput from './ActInput';
import ActBtn from './ActBtn';

function PendingAct(props) {
  const pendingTasks = props.tasks.filter((item) => item.status === 'Pending');

  return (
    <div
      className='pendingActivities top'
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const taskId = e.dataTransfer.getData('taskId');
        props.dispatch({ type: 'REOPEN_TASK', payload: taskId });
      }}
    >
      <ActInput {...props} />

      {props.showInputErr ? (
        <div className='showInputErr'>{props.errMess}</div>
      ) : null}
      {pendingTasks?.map((item) =>
        item.date === props.currDate ? (
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
        ) : null
      )}
    </div>
  );
}

export default PendingAct;
