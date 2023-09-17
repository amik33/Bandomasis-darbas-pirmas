import express from 'express';
import { register } from './register.js';
import { login } from './login.js';
import { logout } from './logout.js';
import { users } from './users.js';
import { total } from './total.js';
import { forms } from './forms.js';
import { data } from './data.js';
import { upload } from './upload.js';


export const api = express.Router();

api.all('/', (req, res) => {
    return res.json({
        msg: 'Incomplete URL',
    });
});

api.use('/register', register);
api.use('/login', login);
api.use('/logout', logout);
api.use('/users', users);
api.use('/total', total);
api.use('/forms', forms);
api.use('/data', data);
api.use('/upload', upload);
