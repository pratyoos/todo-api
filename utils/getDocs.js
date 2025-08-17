export function getDocsHtml() {

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>Todo List API – Docs</title>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <style>
    :root{
      --bg:#0b0f14; --panel:#0f1620; --text:#e6edf3; --muted:#9fb2c8;
      --accent:#7aa2f7; --border:#1f2a37; --code-bg:#0a1220;
    }
    *{box-sizing:border-box}
    body{
      margin:0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans",
      "Apple Color Emoji", "Segoe UI Emoji"; background:var(--bg); color:var(--text);
    }
    .wrap{max-width:920px; margin:40px auto; padding:24px; background:var(--panel); border:1px solid var(--border); border-radius:20px}
    h1{font-size:34px; margin:0 0 10px}
    h2{margin-top:28px; font-size:24px}
    h3{margin-top:22px; font-size:20px}
    p,li{line-height:1.6; color:var(--muted)}
    a{color:var(--accent); text-decoration:none}
    a:hover{text-decoration:underline}
    code{font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; font-size:0.95em}
    pre{background:var(--code-bg); padding:14px 16px; border-radius:14px; overflow:auto; border:1px solid var(--border)}
    pre code{white-space:pre}
    .hr{height:1px; background:var(--border); margin:24px 0}
    .pill{display:inline-block; background:#0c1a2b; border:1px solid var(--border); padding:2px 10px; border-radius:999px; font-size:12px; color:var(--muted)}
    .grid{display:grid; grid-template-columns: 1fr; gap:14px}
    .kbd{border:1px solid var(--border); padding:0 6px; border-radius:6px; background:#0d1420}
    ul{margin-top:8px}
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Todo List API</h1>
    <p>A simple and secure RESTful API for managing personal todo tasks. This API supports user registration, login, and CRUD operations for todo items with JWT-based authentication.</p>

    <h2>Base URL</h2>
    <div class="grid">
      <div>
        <span class="pill">local</span>
        <p><a href="http://localhost:8080/api" target="_blank" rel="noopener">http://localhost:8080/api</a></p>
        <pre><code>http://localhost:8080/api</code></pre>
        <p>Add .env file on project root directory and fill the values as shown in .env.example</p>
      </div>
      <div>
        <span class="pill">render</span>
        <p><a href="https://todo-api-png8.onrender.com/api" target="_blank" rel="noopener">https://todo-api-png8.onrender.com/api/</a></p>
        <pre><code>https://todo-api-png8.onrender.com/api</code></pre>
      </div>
    </div>

    <div class="hr"></div>

    <h2>Features</h2>
    <ul>
      <li>User Registration &amp; Login (with JWT)</li>
      <li>Create, Read, Update, and Delete Todos</li>
      <li>Secure routes with JWT authentication</li>
      <li>Tracks created/updated timestamps</li>
    </ul>

    <div class="hr"></div>

    <h2>API Endpoints</h2>

    <h3>Auth Routes</h3>

    <h4>1. Register</h4>
    <ul>
      <li><strong>POST</strong> <code>/auth/register</code></li>
      <li><strong>Request Body:</strong></li>
    </ul>
<pre><code>{
  "username": "yourusername",
  "password": "yourpassword"
}
</code></pre>
    <p><strong>Response:</strong> <span class="kbd">201 Created</span></p>
<pre><code>{
  "_id": "user_id_here",
  "username": "yourusername"
}
</code></pre>

    <h4>2. Login</h4>
    <ul>
      <li><strong>POST</strong> <code>/auth/login</code></li>
      <li><strong>Request Body:</strong></li>
    </ul>
<pre><code>{
  "username": "yourusername",
  "password": "yourpassword"
}
</code></pre>
    <p><strong>Response:</strong> <span class="kbd">200 OK</span></p>
<pre><code>{
  "token": "your_jwt_token_here"
}
</code></pre>

    <div class="hr"></div>

    <h3>Todo Routes</h3>
    <p><em>All Todo routes require the <code>Authorization</code> header:</em></p>
<pre><code>Authorization: Bearer &lt;your_jwt_token&gt;
</code></pre>

    <h4>3. Get All Todos</h4>
    <p><strong>GET</strong> <code>/todos</code></p>
<pre><code>[
  {
    "_id": "todo_id",
    "user": "user_id",
    "title": "Buy groceries",
    "completed": false,
    "createdAt": "...",
    "updatedAt": "..."
  }
]
</code></pre>

    <h4>4. Create New Todo</h4>
    <p><strong>POST</strong> <code>/todos</code></p>
    <p><strong>Request Body:</strong></p>
<pre><code>{
  "title": "Your todo title here"
}
</code></pre>
    <p><strong>Response:</strong> <span class="kbd">201 Created</span></p>
<pre><code>{
  "_id": "todo_id",
  "user": "user_id",
  "title": "Your todo title here",
  "completed": false,
  "createdAt": "...",
  "updatedAt": "..."
}
</code></pre>

    <h4>5. Update Todo</h4>
    <p><strong>PUT</strong> <code>/todos/:id</code></p>
    <p><strong>Request Body:</strong></p>
<pre><code>{
  "title": "Updated title",
  "completed": true
}
</code></pre>
    <p><strong>Response:</strong> <span class="kbd">200 OK</span> – Updated Todo Object</p>

    <h4>6. Delete Todo</h4>
    <p><strong>DELETE</strong> <code>/todos/:id</code></p>
    <p><strong>Response:</strong></p>
<pre><code>{
  "message": "Todo deleted"
}
</code></pre>

    <div class="hr"></div>

    <h2>How to Integrate on Frontend</h2>

    <h3>1. Register a User</h3>
<pre><code>await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password }),
});
</code></pre>

    <h3>2. Login and Store Token</h3>
<pre><code>const res = await fetch('/api/auth/login', { /* ... */ });
const data = await res.json();
localStorage.setItem('token', data.token);
</code></pre>

    <h3>3. Fetch Todos</h3>
<pre><code>const token = localStorage.getItem('token');
await fetch('/api/todos', {
  headers: { Authorization: \`Bearer \${token}\` }
});
</code></pre>

    <h3>4. Create Todo</h3>
<pre><code>await fetch('/api/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: \`Bearer \${token}\`
  },
  body: JSON.stringify({ title: 'New task' })
});
</code></pre>

    <h3>5. Update Todo</h3>
<pre><code>await fetch(\`/api/todos/\${todoId}\`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: \`Bearer \${token}\`
  },
  body: JSON.stringify({ title: 'Updated task', completed: true })
});
</code></pre>

    <h3>6. Delete Todo</h3>
<pre><code>await fetch(\`/api/todos/\${todoId}\`, {
  method: 'DELETE',
  headers: {
    Authorization: \`Bearer \${token}\`
  }
});
</code></pre>

    <div class="hr"></div>

    <h2>Tech Stack</h2>
    <ul>
      <li>Node.js</li>
      <li>Express.js</li>
      <li>MongoDB (Mongoose)</li>
      <li>JWT Authentication</li>
    </ul>

    <h2>Notes</h2>
    <ul>
      <li>All protected routes require a valid JWT in the <code>Authorization</code> header.</li>
      <li>Ensure to handle token expiration and unauthorized access gracefully on frontend.</li>
    </ul>

    <h2>Contact</h2>
    <p>Made with ❤️ by <a href="https://github.com/pratyoos" target="_blank" rel="noopener">Pratyoos</a></p>
  </div>
</body>
</html>`;
}