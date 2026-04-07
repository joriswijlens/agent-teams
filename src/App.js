import React from 'react';

const tasks = [
  { id: 1, title: 'Presentatie maken over agent teams', status: 'in progress' },
  { id: 2, title: 'Demo repo opzetten op GitHub', status: 'done' },
  { id: 3, title: 'Live demo voorbereiden', status: 'open' },
];

export default function App() {
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
