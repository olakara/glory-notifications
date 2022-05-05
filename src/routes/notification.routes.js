const express = require('express');
const router = express.Router();
const debug = require('debug')('app:notifications:router');
const queryService = require('../services/query-notification.service');
const createService = require('../services/create-notification.service');


router.get('/', async (req, res) => {

    const vm = await queryService.getAllNotifications()
    res.json(vm);
});

module.exports = router;