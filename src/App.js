import React, { useState } from 'react';

const initialTasks = [
  { id: 1, title: 'Presentatie maken over agent teams', status: 'in progress' },
  { id: 2, title: 'Demo repo opzetten op GitHub', status: 'done' },
  { id: 3, title: 'Live demo voorbereiden', status: 'open' },
];

const statuses = ['open', 'in progress', 'done'];

const statusColor = (status) =>
  status === 'done' ? 'green' : status === 'in progress' ? 'orange' : '#888';

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const changeStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Taken</h1>
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
              onChange={e => changeStatus(task.id, e.target.value)}
              style={{
                color: statusColor(task.status),
                fontWeight: 'bold',
                border: '1px solid #ccc',
                borderRadius: 4,
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
                background: '#fff',
              }}
            >
              {statuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
