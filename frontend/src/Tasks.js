import React, { useState, useEffect } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, text }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]);
        setName('');
        setText('');
      });
  };

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}: {task.text}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default Tasks;
