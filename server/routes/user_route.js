const router = require("express").Router();

const {
    authentication,
    uploadAvatar
} = require('../../util/util');


const cpUpload = uploadAvatar.fields([
    { name: 'avatar', maxCount: 1 },
]);

const {
    signUp,
    logIn,
    getUserProfile,
    postAvatar,
    createComment,
    postLike,
    deleteLike
} = require('../controllers/user_controller.js');

router.route('/user/signup')
    .post(signUp);

router.route('/user/login')
    .post(logIn);

router.route('/user/avatar')
    .post(authentication(), cpUpload, postAvatar);

router.route('/user/profile')
    .get(authentication(), getUserProfile);

router.route('/user/comment')
    .post(authentication(), createComment);

router.route('/user/like')
    .post(authentication(), postLike)
    .delete(authentication(), deleteLike);

module.exports = router;
