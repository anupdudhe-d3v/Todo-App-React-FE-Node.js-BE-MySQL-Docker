const express = require('express');
const cors = require('cors');
const pool = require('./db');
const dotenv = require('dotenv');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


// Get all todos
app.get('/api/todos', async (req, res) => {
try {
const [rows] = await pool.query('SELECT * FROM todos ORDER BY id DESC');
res.json(rows);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Database error' });
}
});


// Create todo
app.post('/api/todos', async (req, res) => {
try {
const { title } = req.body;
if (!title) return res.status(400).json({ error: 'Title required' });
const [result] = await pool.query('INSERT INTO todos (title) VALUES (?)', [title]);
const [row] = await pool.query('SELECT * FROM todos WHERE id = ?', [result.insertId]);
res.status(201).json(row[0]);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Database error' });
}
});


// Toggle complete
app.put('/api/todos/:id/toggle', async (req, res) => {
try {
const id = req.params.id;
await pool.query('UPDATE todos SET completed = NOT completed WHERE id = ?', [id]);
const [row] = await pool.query('SELECT * FROM todos WHERE id = ?', [id]);
res.json(row[0]);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Database error' });
}
});


// Delete
app.delete('/api/todos/:id', async (req, res) => {
try {
const id = req.params.id;
await pool.query('DELETE FROM todos WHERE id = ?', [id]);
res.json({ success: true });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Database error' });
}
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));