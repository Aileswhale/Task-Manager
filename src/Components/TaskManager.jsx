import { useReducer, useState } from 'react';
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

function TaskManager() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const addTask = () => {
    if (taskName && dueDate) {
      const newTask = {
        id: Math.random(), 
        name: taskName,
        dueDate: dueDate,
      };

      dispatch({ type: 'ADD_TASK', payload: newTask });
      setTaskName('');
      setDueDate('');
    }
  };

  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  return (
    <div className='mainDiv'>
    <div className="TaskManager">
      <h1>Task Management App</h1>
      <div>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.name} - Due Date: {task.dueDate}{' '}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}
export default TaskManager;