const debug = require('debug')('app:notifications:queue-service');
const amqp = require('amqplib');
const { config } = require('../configs/queue.config');



async function readNotifications() {
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
        }, {
            noAck: true,
        });



    } catch (error) {
        console.error(error);
    }
}

module.exports = { readNotifications }