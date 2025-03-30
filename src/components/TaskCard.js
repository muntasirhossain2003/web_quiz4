import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
    </div>
  );
};

export default TaskCard;
