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
    const accessToken = localStorage.getItem('access_token');

    fetch('http://127.0.0.1:5000/tasks', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      })
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
    const accessToken = localStorage.getItem('access_token');

    fetch('http://127.0.0.1:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(newTask)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setNewTask({ name: '', text: '' });
        return fetch('http://127.0.0.1:5000/tasks', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      })
      .catch(error => console.error('Error adding task:', error));
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

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
