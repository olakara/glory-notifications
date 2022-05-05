const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app:notifications');
const morgan = require('morgan');
const notificationRoutes = require('./src/routes/notification.routesS');

const PORT = process.env.PORT || 80;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();

app.use(morgan('short'));
app.use(express.json());

// App status
app.get('/', (req, res) => {
    res.send('ok')
});

// App Routes
app.use('/notifications', notificationRoutes);

app.listen(PORT, HOST, () => {
    debug('Listening on port: ' + chalk.green(PORT));
});