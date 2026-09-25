const express = require('express');
const path = require('path');
const UserModel = require('./userModel');
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.post('/api/users', (req, res) => {
    try {
        const { email, role, state } = req.body;
        const newUser = UserModel.create(email, role, state);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/users', (req, res) => {
    res.json(UserModel.getAll());
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor de HabitQuest corriendo en el puerto ${PORT}`);
});