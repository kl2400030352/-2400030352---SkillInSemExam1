import React, { useState } from 'react';

const TodoItem = ({ task, taskId, removeTask }) => {
  return (
    <li className="todo-item">
      <span>{task}</span>
      <button onClick={() => removeTask(taskId)} className="remove-btn">
        Remove
      </button>
    </li>
  );
};

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTask = () => {
    if (inputValue.trim() === '') {
      return;
    }

    const newTask = {
      id: Date.now(), 
      text: inputValue.trim(),
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="todo-app-container">
      <h1>To-Do List</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTask} className="add-btn">
          Add
        </button>
      </div>

      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TodoItem 
              key={task.id} 
              task={task.text}
              taskId={task.id}
              removeTask={removeTask}
            />
          ))
        ) : (
          <p className="no-tasks">No tasks yet. Start adding!</p>
        )}
      </ul>
    </div>
  );
};

export default TodoApp;