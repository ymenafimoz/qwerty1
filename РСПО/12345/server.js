const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const user = { username, password };

    fs.appendFile('users.txt', JSON.stringify(user) + '\n', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Ошибка записи в файл');
        }
        res.send('Регистрация успешна');
    });
});

app.get('/users', (req, res) => {
    fs.readFile('users.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Ошибка чтения файла');
        }
        const users = data.trim().split('\n').map(line => JSON.parse(line));
        res.json(users);
    });
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});

