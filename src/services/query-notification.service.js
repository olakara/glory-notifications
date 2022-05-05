const express = require('express');
const debug = require('debug')('app:notifications:query-service');
const { getDbContext } = require('../shared/db.service');


async function getAllNotifications() {

    const [db, client] = await getDbContext();
    try {

        // TODO: Query only the user specific notifications that are not read
        const notifications = await db.collection('notifications').find().toArray();

        const result = notifications.map((x) => {
            return {
                id: x._id,
                message: x.message,
                createDate: x.createDate,
                status: x.status
            }
        });

        return result;

    } catch (error) {
        debug(error.stack);
    }
    client.close();
}


module.exports = { getAllNotifications };