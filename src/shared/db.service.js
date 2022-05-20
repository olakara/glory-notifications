
const debug = require('debug')('app:notifications:db-service');
const { MongoClient } = require('mongodb');
const { config } = require('../configs/db.config');

async function getDbContext() {

    console.log('Inside the getDbContext method')
    const url = config.URL;
    const dbName = config.DBNAME;

    let client;

    try {
        console.log('database configuration', url, dbName);

        client = await MongoClient.connect(url);
        debug('Connected to the Mongo DB');
        const db = client.db(dbName);
        return [db, client];
    } catch (error) {
        debug(error.stack);
    }
}

module.exports = { getDbContext }
