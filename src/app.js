const http = require('http');

const PORT = 3000;

const tasks = [];

function handleRequest(req, res) {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === '/tasks' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
  } else if (url.pathname === '/tasks' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const task = JSON.parse(body);
      task.id = tasks.length + 1;
      task.status = 'open';
      task.createdAt = new Date().toISOString();
      tasks.push(task);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(task));
    });
  } else if (url.pathname.startsWith('/tasks/') && req.method === 'PATCH') {
    const id = parseInt(url.pathname.split('/')[2]);
    const task = tasks.find(t => t.id === id);
    if (!task) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const updates = JSON.parse(body);
      Object.assign(task, updates);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(task));
    });
  } else if (url.pathname === '/health') {
    res.writeHead(200);
    res.end('ok');
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Task API running on http://localhost:${PORT}`);
});
