const express = require('express');
const bodyParser = require('body-parser');
const taskQueue = require('./queue');
const rateLimit = require('./rateLimit');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/task', async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) return res.status(400).send('User ID is required');

    const canProcess = await rateLimit(user_id);

    if (!canProcess) {
        taskQueue.add({ userId: user_id });
        return res.status(429).send('Rate limit exceeded. Task queued.');
    }

    taskQueue.add({ userId: user_id });
    res.status(200).send('Task processing started.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
