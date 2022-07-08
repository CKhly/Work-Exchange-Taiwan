const router = require('express').Router();
const {uploadHost} = require('../../util/util');

const cpUpload = uploadHost.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'other_images', maxCount: 3 }
]);

const {
    createHost,
} = require('../controllers/host_controller');

router.route('/admin/host')
    .post(cpUpload, createHost);

module.exports = router;