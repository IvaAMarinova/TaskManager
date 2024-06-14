"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';

interface Task {
  id: number;
  name: string;
  text: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const hardcodedTasks: Task[] = [
      { id: 1, name: 'Task 1', text: 'This is task 1' },
      { id: 2, name: 'Task 2', text: 'This is task 2' },
      { id: 3, name: 'Task 3', text: 'This is task 3' }
    ];

    setTasks(hardcodedTasks);
  }, []);

  return (
    <div className="p-5 font-sans">
      <h1 className="text-pink-900 text-2xl mb-2">Tasks hiiiiiii</h1>
      <ul className="list-none p-0">
        {tasks.map((task) => (
          <li key={task.id} className="text-pink-900 bg-pink-200 p-3 mb-2 rounded">
            <strong>{task.name}</strong>: {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
