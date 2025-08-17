
# Todo List API

A simple and secure RESTful API for managing personal todo tasks. This API supports user registration, login, and CRUD operations for todo items with JWT-based authentication.

## Base URL

[local](http://localhost:5000/api)
```
http://localhost:5000/api
```
```
Add .env file on project root directory and fill the values as shown in .env.example
```

[render](https://todo-api-png8.onrender.com/api/)
```
https://todo-api-png8.onrender.com/api/
```

---

## Features

- User Registration & Login (with JWT)
- Create, Read, Update, and Delete Todos
- Secure routes with JWT authentication
- Tracks created/updated timestamps

---

## API Endpoints

### Auth Routes

#### 1. Register

- **POST** `/auth/register`
- **Request Body:**
```json
{
  "username": "yourusername",
  "password": "yourpassword"
}
```
- **Response:** `201 Created`
```json
{
  "_id": "user_id_here",
  "username": "yourusername"
}
```

#### 2. Login

- **POST** `/auth/login`
- **Request Body:**
```json
{
  "username": "yourusername",
  "password": "yourpassword"
}
```
- **Response:** `200 OK`
```json
{
  "token": "your_jwt_token_here"
}
```

---

### Todo Routes

> All Todo routes require the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

#### 3. Get All Todos

- **GET** `/todos`
- **Response:**
```json
[
  {
    "_id": "todo_id",
    "user": "user_id",
    "title": "Buy groceries",
    "completed": false,
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### 4. Create New Todo

- **POST** `/todos`
- **Request Body:**
```json
{
  "title": "Your todo title here"
}
```
- **Response:** `201 Created`
```json
{
  "_id": "todo_id",
  "user": "user_id",
  "title": "Your todo title here",
  "completed": false,
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### 5. Update Todo

- **PUT** `/todos/:id`
- **Request Body:**
```json
{
  "title": "Updated title",
  "completed": true
}
```
- **Response:** `200 OK` – Updated Todo Object

#### 6. Delete Todo

- **DELETE** `/todos/:id`
- **Response:**
```json
{
  "message": "Todo deleted"
}
```

---

## How to Integrate on Frontend

### 1. Register a User
```js
await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password }),
});
```

### 2. Login and Store Token
```js
const res = await fetch('/api/auth/login', { ... });
const data = await res.json();
localStorage.setItem('token', data.token);
```

### 3. Fetch Todos
```js
const token = localStorage.getItem('token');
await fetch('/api/todos', {
  headers: { Authorization: `Bearer ${token}` }
});
```

### 4. Create Todo
```js
await fetch('/api/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({ title: 'New task' })
});
```

### 5. Update Todo
```js
await fetch(`/api/todos/${todoId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({ title: 'Updated task', completed: true })
});
```

### 6. Delete Todo
```js
await fetch(`/api/todos/${todoId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## Notes

- All protected routes require a valid JWT in the `Authorization` header.
- Ensure to handle token expiration and unauthorized access gracefully on frontend.

---

## Contact

Made with ❤️ by [Pratyoos](https://github.com/pratyoos)