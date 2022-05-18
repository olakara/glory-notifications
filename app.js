const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app:notifications');
const morgan = require('morgan');
const notificationRoutes = require('./src/routes/notification.routes');
const { readNotifications } = require('./src/shared/queue.service');

const PORT = process.env.PORT || 80;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();

app.use(morgan('short'));
app.use(express.json());

let channel = null;
let connection = null;
const queue = 'notifications';


processQueue();

async function processQueue() {

    try {

        console.log('calling readNotifications');
        await readNotifications();
    } catch (error) {
        console.log(error);
    }
}

// App status
app.get('/', (req, res) => {
    res.send('ok - new')
});
// App Routes
app.use('/notifications', notificationRoutes);



app.listen(PORT, HOST, () => {
    debug('Listening on port: ' + chalk.green(PORT));
});