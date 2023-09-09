import express from 'express';
// import { register } from './register.js';
// import { login } from './login.js';
// import { logout } from './logout.js';
// import { containerTypes } from './container-types.js';
// import { users } from './users.js';
// import { boxes } from './boxes.js';
// import { upload } from './upload.js';

export const api = express.Router();

api.all('/', (req, res) => {
    return res.json({
        msg: 'Incomplete URL',
    });
});

// api.use('/register', register);
// api.use('/login', login);
// api.use('/logout', logout);
// api.use('/container-types', containerTypes);
// api.use('/users', users);
// api.use('/boxes', boxes);
// api.use('/upload', upload);