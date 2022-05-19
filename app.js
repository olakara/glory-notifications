const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app:notifications');
const morgan = require('morgan');
const amqp = require('amqplib');
const notificationRoutes = require('./src/routes/notification.routes');
const { config } = require('./src/configs/queue.config');
const notificationService = require('./src/services/create-notification.service');


const PORT = process.env.PORT || 80;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();

app.use(morgan('short'));
app.use(express.json());

processQueue();

async function processQueue() {

    const url = config.URL;
    const queue = config.QNAME;
    try {
        console.log('queue configuration', url, queue);

        let connection = await amqp.connect(url);
        let channel = await connection.createChannel();
        await channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        await channel.consume(queue, function (msg) {
            let message = JSON.parse(msg.content)
            console.log(" [x] Received %s", JSON.stringify(message));
            notificationService.storeNotification(message);
        }, {
            noAck: true,
        });

    } catch (error) {
        console.error(error);
    }
}

// App status
app.get('/', (req, res) => {
    res.send('ok')
});
// App Routes
app.use('/notifications', notificationRoutes);

app.listen(PORT, HOST, () => {
    debug('Listening on port: ' + chalk.green(PORT));
});