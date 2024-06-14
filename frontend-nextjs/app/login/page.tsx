"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
          router.push('/tasks');
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="p-6 flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h1 className="text-pink-600 font-light text-center mb-6">Give me your information :)</h1>
        <form className="bg-pink-300 text-center text-pink-900 p-6 rounded" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Username:</label>
            <input 
              type="text" 
              name="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input 
              type="password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="bg-pink-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
        </form>
      </div>
    </div>
  );
}
