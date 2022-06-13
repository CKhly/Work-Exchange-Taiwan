const express = require("express");
const router = express.Router();
const {
    getHosts,
} = require('../controllers/host_controller');

router.route('/hosts')
    .get(getHosts);

module.exports = router;
