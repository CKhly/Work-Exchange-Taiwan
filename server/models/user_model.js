require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('./mysqlcon');
const salt = parseInt(process.env.BCRYPT_SALT);
const { TOKEN_EXPIRE, TOKEN_SECRET } = process.env;
const got = require('got');

const USER_ROLE = {
    ALL: -1,
    ADMIN: 1,
    USER: 2,
};

const signUp = async (name, roleId, email, password) => {
    const conn = await pool.getConnection();
    try {
        await conn.query('START TRANSACTION');

        const emails = await conn.query('SELECT email FROM user_table WHERE email = ? FOR UPDATE', [email]);
        if (emails[0].length > 0) {
            await conn.query('COMMIT');
            return { error: 'Email Already Exists' };
        }

        const loginAt = new Date();

        const user = {
            provider: 'native',
            role_id: roleId,
            email: email,
            password: bcrypt.hashSync(password, salt),
            name: name,
            picture: null,
            access_expired: TOKEN_EXPIRE,
            login_at: loginAt,
        };
        const accessToken = jwt.sign(
            {
                provider: user.provider,
                name: user.name,
                email: user.email,
                picture: user.picture,
            },
            TOKEN_SECRET
        );
        user.access_token = accessToken;

        const queryStr = 'INSERT INTO user_table SET ?';
        const [result] = await conn.query(queryStr, user);

        user.id = result.insertId;
        await conn.query('COMMIT');
        return { user };
    } catch (error) {
        console.log(error);
        await conn.query('ROLLBACK');
        return { error };
    } finally {
        await conn.release();
    }
};


const nativeLogIn = async (email, password) => {
    const conn = await pool.getConnection();
    try {
        await conn.query('START TRANSACTION');

        const [users] = await conn.query('SELECT * FROM user_table WHERE email = ?', [email]);
        const user = users[0];
        if (!bcrypt.compareSync(password, user.password)) {
            await conn.query('COMMIT');
            return { error: 'Password is wrong' };
        }

        const loginAt = new Date();
        const accessToken = jwt.sign(
            {
                provider: user.provider,
                name: user.name,
                email: user.email,
                picture: user.picture,
            },
            TOKEN_SECRET
        );

        const queryStr = 'UPDATE user_table SET access_token = ?, access_expired = ?, login_at = ? WHERE user_id = ?';
        await conn.query(queryStr, [accessToken, TOKEN_EXPIRE, loginAt, user.id]);

        await conn.query('COMMIT');

        user.access_token = accessToken;
        user.login_at = loginAt;
        user.access_expired = TOKEN_EXPIRE;

        return { user };
    } catch (error) {
        await conn.query('ROLLBACK');
        return { error };
    } finally {
        await conn.release();
    }
};

const facebookLogIn = async (id, roleId, name, email) => {
    const conn = await pool.getConnection();
    try {
        await conn.query('START TRANSACTION');
        const loginAt = new Date();
        let user = {
            provider: 'facebook',
            role_id: roleId,
            email: email,
            name: name,
            picture: 'https://graph.facebook.com/' + id + '/picture?type=large',
            access_expired: TOKEN_EXPIRE,
            login_at: loginAt,
        };

        const [users] = await conn.query("SELECT user_id FROM user_table WHERE email = ? AND provider = 'facebook' FOR UPDATE", [email]);
        let userId;
        if (users.length === 0) {
            // Insert new user
            const queryStr = 'INSERT INTO user_table set ?';
            const [result] = await conn.query(queryStr, user);
            userId = result.insertId;
        } else {
            // Update existed user
            userId = users[0].id;
            const queryStr = 'UPDATE user_table SET access_expired = ?, login_at = ?  WHERE user_id = ?'; /* access_token = ? */
            await conn.query(queryStr, [TOKEN_EXPIRE, loginAt, userId]); /* accessToken, */
        }
        user.id = userId;
        const accessToken = jwt.sign({
            userId: userId,
            provider: user.provider,
            name: user.name,
            email: user.email,
            picture: user.picture
        }, TOKEN_SECRET);
        user.access_token = accessToken;
        const queryStr = 'UPDATE user_table SET access_token = ?  WHERE user_id = ?'; 
        await conn.query(queryStr, [accessToken, userId]);
        await conn.query('COMMIT');
        console.log({ user })
        return { user };
    } catch (error) {
        console.log(error)
        await conn.query('ROLLBACK');
        return { error };
    } finally {
        await conn.release();
    }
};

const googleLogIn = async (id, roleId, name, email, picture) => {
    const conn = await pool.getConnection();
    try {
        await conn.query('START TRANSACTION');
        const loginAt = new Date();
        let user = {
            provider: 'google',
            role_id: roleId,
            email: email,
            name: name,
            picture: picture,
            access_expired: TOKEN_EXPIRE,
            login_at: loginAt,
        };
        
        const [users] = await conn.query("SELECT user_id FROM user_table WHERE email = ? AND provider = 'google' FOR UPDATE", [email]);
        console.log(users)
        let userId;
        if (users.length === 0) {
            // Insert new user
            const queryStr = 'INSERT INTO user_table set ?';
            const [result] = await conn.query(queryStr, user);
            userId = result.insertId;
        } else {
            // Update existed user
            userId = users[0].id;
            const queryStr = 'UPDATE user_table SET access_expired = ?, login_at = ?  WHERE user_id = ?'; /* access_token = ? */
            await conn.query(queryStr, [TOKEN_EXPIRE, loginAt, userId]); /* accessToken, */
        }
        user.id = userId;
        const accessToken = jwt.sign({
            userId: userId,
            provider: user.provider,
            name: user.name,
            email: user.email,
            picture: user.picture
        }, TOKEN_SECRET);
        user.access_token = accessToken;
        const queryStr = 'UPDATE user_table SET access_token = ?  WHERE user_id = ?'; 
        await conn.query(queryStr, [accessToken, userId]);
        await conn.query('COMMIT');

        return { user };
    } catch (error) {
        console.log(error)
        await conn.query('ROLLBACK');
        return { error };
    } finally {
        await conn.release();
    }
};


const getFacebookProfile = async function (accessToken) {
    try {
        let res = await got('https://graph.facebook.com/me?fields=id,name,email&access_token=' + accessToken, {
            responseType: 'json',
        });
        return res.body;
    } catch (e) {
        console.log(e);
        throw 'Permissions Error: facebook access token is wrong';
    }
};


const getUserDetail = async (email, roleId) => {
    try {
        if (roleId) {
            const [users] = await pool.query('SELECT * FROM user_table WHERE email = ? AND role_id = ?', [email, roleId]);
            return users[0];
        } else {
            const [users] = await pool.query('SELECT * FROM user_table WHERE email = ?', [email]);
            return users[0];
        }
    } catch (e) {
        console.log(e)
        return null;
    }
};


const getComments = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const [comments] = await conn.query('SELECT * FROM comments WHERE user_id = ?', [userId])
        return comments;
    } catch (e) {
        console.log(e)
        return -1;
    } finally {
        await conn.release();
    }
}

const getLikes = async function (userId){
    const conn = await pool.getConnection();
    try {
        const [likes] = await conn.query('SELECT host_table.* FROM likes LEFT JOIN host_table on likes.host_id = host_table.host_id WHERE user_id = ?', [userId])
        console.log("likes", likes);
        return likes;
    } catch (e) {
        console.log(e)
        return -1;
    } finally {
        await conn.release();
    }
}

const createComment = async function (comment) {
    const conn = await pool.getConnection();
    try {
        console.log("comment", comment)
        const [result] = await conn.query('INSERT INTO comments SET ?', comment)
        return result.insertId;
    } catch (e) {
        console.log(e)
        return -1;
    } finally {
        await conn.release();
    }
}

const updateAvatar = async function (email, avatar){
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query('UPDATE user_table SET picture = ? WHERE email = ?', [avatar, email])
        return result;
    } catch (e) {
        console.log(e)
        return -1;
    } finally {
        await conn.release();
    }
}

const createLike = async function (likes){
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query('INSERT INTO likes SET ?', [likes])
        return result;
    } catch (e) {
        console.log(e)
        return -1;
    } finally {
        await conn.release();
    }
}

const deleteLike = async function (userId, hostId) {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query('DELETE FROM likes WHERE user_id = ? AND host_id = ?', [ userId, hostId])
        return result;
    } catch (e) {
        console.log(e)
        return -1;
    } finally {
        await conn.release();
    }
}

module.exports = {
    USER_ROLE,
    signUp,
    nativeLogIn,
    facebookLogIn,
    googleLogIn,
    getUserDetail,
    getFacebookProfile,
    getComments,
    getLikes,
    createComment,
    updateAvatar,
    createLike,
    deleteLike
};