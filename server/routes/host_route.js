const express = require("express");
const router = express.Router();
const {
    getHosts,
    getHostDetail,
} = require('../controllers/host_controller');

router.route('/hosts/:location')
    .get(getHosts);

router.route('/host/:id')
    .get(getHostDetail);


module.exports = router;
