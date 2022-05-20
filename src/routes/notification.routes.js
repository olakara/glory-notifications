const express = require('express');
const router = express.Router();
const debug = require('debug')('app:notifications:router');
const queryService = require('../services/query-notification.service');



router.get('/', async (req, res) => {
    console.log('Get all notifications...');
    const vm = await queryService.getAllNotifications();
    res.json(vm);
});

module.exports = router;