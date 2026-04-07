import React, { useState } from 'react';

const initialTasks = [
  { id: 1, title: 'Presentatie maken over agent teams', status: 'in progress' },
  { id: 2, title: 'Demo repo opzetten op GitHub', status: 'done' },
  { id: 3, title: 'Live demo voorbereiden', status: 'open' },
];

const statusColors = {
  open: '#888',
  'in progress': 'orange',
  done: 'green',
};

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    const title = newTitle.trim();
    if (!title) return;
    setTasks([...tasks, {
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      title,
      status: 'open',
    }]);
    setNewTitle('');
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Taken</h1>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
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
            alignItems: 'center',
          }}>
            <span>{task.title}</span>
            <select
              value={task.status}
              onChange={e => handleStatusChange(task.id, e.target.value)}
              style={{
                color: statusColors[task.status],
                fontWeight: 'bold',
                border: '1px solid #ccc',
                borderRadius: 4,
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
                background: 'white',
              }}
            >
              <option value="open">open</option>
              <option value="in progress">in progress</option>
              <option value="done">done</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
