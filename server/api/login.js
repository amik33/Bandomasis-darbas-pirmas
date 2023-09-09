import { randomUUID } from 'crypto';
import express from 'express';
import { connection } from '../setupDb.js';
import { hash } from '../lib/hash.js';

export const login = express.Router();

login.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const selectQuery = `SELECT users.id, users.fullname, users.email, roles.role FROM users
                            INNER JOIN roles ON roles.id = users.role_id
                            WHERE email = ? AND password_hash = ?;`;
        const selectRes = await connection.execute(selectQuery, [email, hash(password)]);
        const users = selectRes[0];

        if (users.length === 0) {
            return res.status(200).json({
                status: 'err',
                msg: 'User with such email and password does not exist.',
            });
        }

        const userObj = users[0];

        const token = randomUUID();

        const insertQuery = `INSERT INTO tokens (token, user_id) VALUES (?, ?)`;
        const insertRes = await connection.execute(insertQuery, [token, userObj.id]);
        const insertResObject = insertRes[0];

        if (insertResObject.insertId > 0) {
            const cookie = [
                'dublisToken=' + token,
                'path=/',
                'domain=localhost',
                'max-age=86400',
                // 'Secure',
                'SameSite=Lax',
                'HttpOnly',
            ];

            delete userObj.id;

            return res.status(200).set('Set-Cookie', cookie.join('; ')).json({
                status: 'ok',
                msg: 'Token created',
                user: userObj,
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'Token could not be created',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'POST: LOGIN API - server error.',
        });
    }
});

login.get('/', async(req, res) => {
    const { dublisToken } = req.cookies;

    if (!dublisToken) {
        return res.status(200).json({
            status: 'error',
            msg: 'You are not logged in',
        });
    }

    try {
        const selectQuery = `SELECT users.fullname, users.email, roles.role FROM tokens
                            INNER JOIN users ON tokens.user_id = users.id
                            INNER JOIN roles ON users.role_id = roles.id
                            WHERE token = ?;`;
        const selectRes = await connection.execute(selectQuery, [dublisToken]);
        const users = selectRes[0];

        if (users.length === 0) {
            const cookie = [
                'dublisToken=' + dublisToken,
                'path=/',
                'domain=localhost',
                'max-age=-1',
                // 'Secure',
                'SameSite=Lax',
                'HttpOnly',
            ];
            return res.status(200).set('Set-Cookie', cookie.join('; ')).json({
                status: 'ok',
                msg: 'Session deleted',
            });
        }
        return res.status(200).json({
            status: 'ok',
            user: users[0],
        });

    } catch (error) {

    }

});

login.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "Login" method' });
});