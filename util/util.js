const crypto = require('crypto');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const axios = require('axios')
const {TOKEN_SECRET} = process.env;
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../server/models/user_model');

const uploadHost = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const hostId = req.body.host_id;
            const imagePath = path.join(__dirname, `../public/assets/${hostId}`);
            if (!fs.existsSync(imagePath)) {
                fs.mkdirSync(imagePath);
            }
            cb(null, imagePath);
        },
        filename: (req, file, cb) => {
            const customFileName = crypto.randomBytes(18).toString('hex').substr(0, 8);
            const fileExtension = file.mimetype.split('/')[1]; // get file extension from original file name
            cb(null, customFileName + '.' + fileExtension);
        }
    })
});

const uploadAvatar = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // const userId = req.user.id;
            const imagePath = path.join(__dirname, `../public/assets/avatar`);
            if (!fs.existsSync(imagePath)) {
                fs.mkdirSync(imagePath);
            }
            cb(null, imagePath);
        },
        filename: (req, file, cb) => {
            const customFileName = crypto.randomBytes(18).toString('hex').substr(0, 8);
            const fileExtension = file.mimetype.split('/')[1]; // get file extension from original file name
            cb(null, customFileName + '.' + fileExtension);
        }
    })
});

const authentication = (roleId) => {
    return async function (req, res, next) {
        let accessToken = req.get('Authorization');
        if (!accessToken) {
            res.status(401).send({error: 'Unauthorized'});
            return;
        }

        accessToken = accessToken.replace('Bearer ', '');
        if (accessToken == 'null') {
            res.status(401).send({error: 'Unauthorized'});
            return;
        }
        console.log("authentication", accessToken)
        try {
            const user = await promisify(jwt.verify)(accessToken, TOKEN_SECRET);
            req.user = user;
            console.log("user", user)
            // if (roleId == null) {
            //     next();
            // } else {
                let userDetail;
                if (roleId == User.USER_ROLE.ALL) {
                    userDetail = await User.getUserDetail(user.email);
                } else {
                    userDetail = await User.getUserDetail(user.email, roleId);
                }
                console.log("userDetail", userDetail);
                if (!userDetail) {
                    res.status(403).send({error: 'Forbidden'});
                } else {
                    req.user.id = userDetail.user_id;
                    req.user.role_id = userDetail.role_id;
                    next();
                }
            // }
            return;
        } catch(err) {
            console.log(err)
            res.status(403).send({error: 'Forbidden'});
            return;
        }
    };
};

const GetCoordinates = async(address) => {
    let data = await (await axios.get(`https://www.google.com/maps/place?q=${encodeURI(address)}`)).data;
    data = data.toString();
    let pos = data.indexOf('center') + 7;
    data = data.slice(pos, pos + 50);
    const lat = data.slice(0, data.indexOf('%2C'));
    const lng = data.slice(data.indexOf('%2C') + 3, data.indexOf('&amp'));
    return [parseFloat(lng), parseFloat(lat)];
}

module.exports = {
    uploadHost,
    uploadAvatar,
    authentication,
    GetCoordinates
};
