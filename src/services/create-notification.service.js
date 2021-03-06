const express = require('express');
const debug = require('debug')('app:notifications:create-service')
const { getDbContext } = require('../shared/db.service');

async function storeNotification(notificationDto) {

    const [db, client] = await getDbContext();

    try {
        const notificationDm = {
            ...notificationDto,
            createdBy: 'SYSTEM',
            status: 'UNREAD',
            isDeleted: false
        };

        console.log(JSON.stringify(notificationDm));

        const response = await db.collection('notifications').insertOne(notificationDm);
        return response;

    } catch (error) {
        debug(error.stack);
    }
    client.close();
}

module.exports = { storeNotification };
