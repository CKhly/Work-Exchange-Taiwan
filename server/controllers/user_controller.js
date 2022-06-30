const validator = require('validator');
const User = require('../models/user_model');
const path = require('path');

const jwt_decode = require('jwt-decode');

const signUp = async (req, res) => {
    console.log(req.body)
    let { name } = req.body;
    const { role, email, password  } = req.body;
    if (!name || !role || !email || !password) {
        res.status(400).send({ error: 'Request Error: name, role, email and password are required.' });
        return;
    }

    if (!validator.isEmail(email)) {
        res.status(400).send({ error: 'Request Error: Invalid email format' });
        return;
    }

    name = validator.escape(name);

    const result = await User.signUp(name, role, email, password);
    if (result.error) {
        res.status(403).send({ error: result.error });
        return;
    }

    const user = result.user;
    if (!user) {
        res.status(500).send({ error: 'Database Query Error' });
        return;
    }

    res.status(200).send({
        data: {
            access_token: user.access_token,
            access_expired: user.access_expired,
            login_at: user.login_at,
            user: {
                id: user.id,
                provider: user.provider,
                name: user.name,
                role: user.role,
                email: user.email,
                picture: user.picture,
            },
        },
    });
};

const nativeLogIn = async (email, password) => {
    if (!email || !password) {
        return { error: 'Request Error: email and password are required.', status: 400 };
    }

    try {
        return await User.nativeLogIn(email, password);
    } catch (error) {
        return { error };
    }
};

const facebookLogIn = async (accessToken) => {
    if (!accessToken) {
        return { error: 'Request Error: access token is required.', status: 400 };
    }

    try {
        const profile = await User.getFacebookProfile(accessToken);
        console.log("profile: ", profile)
        const { id, name, email } = profile;

        if (!id || !name || !email) {
            return { error: 'Permissions Error: facebook access token can not get user id, name or email' };
        }

        return await User.facebookLogIn(id, User.USER_ROLE.USER, name, email);
    } catch (error) {
        console.log(error)
        return { error: error };
    }
};

const googleLogIn = async (accessToken) => {
    if (!accessToken) {
        return { error: 'Request Error: access token is required.', status: 400 };
    }
    try {
        //jwt decode
        const profile = jwt_decode(accessToken)
        const { sub, name, email, picture } = profile;

        if (!sub || !name || !email || !picture) {
            return { error: 'Permissions Error: facebook access token can not get user id, name or email' };
        }

        return await User.googleLogIn(sub, User.USER_ROLE.USER, name, email, picture);
    } catch (error) {
        return { error: error };
    }
};

const logIn = async (req, res) => {
    const data = req.body;
    console.log(data)
    let result;
    switch (data.provider) {
        case 'native':
            result = await nativeLogIn(data.email, data.password);
            break;
        case 'facebook':
            result = await facebookLogIn(data.access_token);
            break;
        case 'google':
            result = await googleLogIn(data.access_token);
            break;
        default:
            result = { error: 'Wrong Request' };
    }

    if (result.error) {
        const status_code = result.status ? result.status : 403;
        res.status(status_code).send({ error: result.error });
        return;
    }

    const user = result.user;
    if (!user) {
        res.status(500).send({ error: 'Database Query Error' });
        return;
    }

    res.status(200).send({
        data: {
            access_token: user.access_token,
            access_expired: user.access_expired,
            login_at: user.login_at,
            user: {
                id: user.id,
                provider: user.provider,
                name: user.name,
                email: user.email,
                picture: user.picture,
            },
        },
    });
};

const getUserProfile = async (req, res) => {
    console.log("getUserProfile: ",req.user)
    const detail = await User.getUserDetail(req.user.email)
    const comments = await User.getComments(String(req.user.id))
    const likes = await User.getLikes(String(req.user.id))
    res.status(200).send({
        data: {
            provider: req.user.provider,
            name: req.user.name,
            email: req.user.email,
            picture: detail.picture,
            userId: req.user.userId,
            introduction: detail.introduction,
            comments,
            likes
        },
    });
    return;
};

const createComment = async(req, res) => {
    const body = req.body;
    console.log(req.body)
    const comment = {
        host_id: parseInt(body.hostId),
        user_id: req.user.id,
        content: body.content,
        create_time: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }
    console.log(comment)
    const commentId = await User.createComment(comment);
    console.log(commentId)
    if (commentId == -1) {
        res.status(500);
    } else {
        res.status(200).send({commentId});
    }
}

const postAvatar = async(req, res)=>{
    const avatar = req.files.avatar[0].filename;
    console.log('avatar:',　req.user.email, avatar)
    const result = await User.updateAvatar(req.user.email, avatar);
    console.log(result)
    res.json(result)
}

const postLike = async(req, res)=>{
    const likes = {
        user_id: req.user.id,
        host_id: req.body.hostId
    }
    const result = await User.createLike(likes);
    console.log(result)
    res.json(result)
}

const deleteLike = async(req, res)=>{
    const result = await User.deleteLike(req.user.id, req.body.hostId);
    console.log(result)
    res.json(result)
}


module.exports = {
    signUp,
    logIn,
    getUserProfile,
    createComment,
    postAvatar,
    postLike,
    deleteLike
    // // 
};