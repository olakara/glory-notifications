const debug = require('debug')('app:notifications:queue-service');
const amqp = require('amqplib');
const { config } = require('../configs/queue.config');

async function sendNotification(message) {
    const url = config.URL;
    const queue = config.QNAME;
    try {
        console.log('queue configuration', url, queue);

        let connection = await amqp.connect(url);
        let channel = await connection.createChannel();
        await channel.assertQueue(queue, {
            durable: false
        });

        let msg = {
            type: 'NOTIFICATION',
            payload: message
        }

        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        debug('[x] Sent %s', message);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error(error);
    }
}

module.exports = { sendNotification }