import React, { useState } from 'react';

const initialTasks = [
  { id: 1, title: 'Presentatie maken over agent teams', status: 'in progress' },
  { id: 2, title: 'Demo repo opzetten op GitHub', status: 'done' },
  { id: 3, title: 'Live demo voorbereiden', status: 'open' },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const newTask = {
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      title: newTitle.trim(),
      status: 'open',
    };
    setTasks([...tasks, newTask]);
    setNewTitle('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && newTitle.trim()) {
      handleAdd();
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Taken</h1>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nieuwe taak..."
          style={{
            flex: 1,
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={handleAdd}
          disabled={!newTitle.trim()}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: 4,
            border: 'none',
            background: newTitle.trim() ? '#007bff' : '#ccc',
            color: 'white',
            cursor: newTitle.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          Toevoegen
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{
            padding: '0.75rem 1rem',
            marginBottom: '0.5rem',
            background: '#f5f5f5',
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <span>{task.title}</span>
            <span style={{
              color: task.status === 'done' ? 'green' : task.status === 'in progress' ? 'orange' : '#888',
              fontWeight: 'bold',
            }}>
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
