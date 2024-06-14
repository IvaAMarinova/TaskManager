"use client";

import React, { useEffect, useState } from 'react';

interface Task {
  id: number;
  name: string;
  text: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ name: '', text: '' });

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(data => {
      setTasks([...tasks, data]);
      setNewTask({ name: '', text: '' });
    })
    .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div className="p-5 font-sans">
      <h1 className="text-pink-900 text-2xl mb-2">Tasks</h1>
      <ul className="list-none p-0">
        {tasks.map((task) => (
          <li key={task.id} className="text-pink-900 bg-pink-200 p-3 mb-2 rounded">
            <strong>{task.name}</strong>: {task.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddTask} className="mt-4">
        <div className="mb-2">
          <input
            type="text"
            name="name"
            value={newTask.name}
            onChange={handleInputChange}
            placeholder="Task name"
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="text"
            value={newTask.text}
            onChange={handleInputChange}
            placeholder="Task description"
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-pink-500 text-white p-2 rounded">Add Task</button>
      </form>
    </div>
  );
}
