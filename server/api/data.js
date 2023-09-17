import express from 'express';
import { connection } from '../setupDb.js';

export const data = express.Router();

data.get('/', async (req, res) => {
    return res.status(400).json({
        status: 'err',
        msg: 'Need more specific route.',
        options: [
            'http://localhost:3001/api/data/steering-wheel-sides',
        ],
    });
});

data.get('/steering-wheel-sides', async (req, res) => {
    try {
        const selectQuery = `SELECT side FROM \`steering-wheel\``;
        const selectRes = await connection.execute(selectQuery);
        const data = selectRes[0];

        return res.status(200).json({
            status: 'ok',
            list: data,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'GET: DATA API - server error.',
        });
    }
});

data.get('/*', async (req, res) => {
    return res.status(400).json({
        status: 'err',
        msg: 'Upsupported "Data" route.',
    });
});

data.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "Data" method' });
});