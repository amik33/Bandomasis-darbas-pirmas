import express from 'express';
import { connection } from '../setupDb.js';

export const total = express.Router();

total.post('/', async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            status: 'err',
            msg: 'Total could not be created. Provide "title" value.',
        });
    }

    try {
        const selectQuery = `SELECT * FROM total WHERE title = ?;`;
        const selectRes = await connection.execute(selectQuery, [title]);
        const total = selectRes[0];

        if (total.length > 0) {
            return res.status(200).json({
                status: 'err-list',
                errors: [
                    {
                        input: 'total',
                        msg: 'Such total already exists.',
                    }
                ]
            });
        }

        const insertQuery = `INSERT INTO total (title) VALUES (?)`;
        const insertRes = await connection.execute(insertQuery, [title]);
        const insertResObject = insertRes[0];

        if (insertResObject.insertId > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'total created',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'total could not be created',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'POST: total API - server error.',
        });
    }
});

total.get('/', async (req, res) => {
    try {
        const selectQuery = `SELECT title FROM total;`;
        const selectRes = await connection.execute(selectQuery);
        const total = selectRes[0];

        return res.status(200).json({
            status: 'ok',
            list: total,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'GET: total API - server error.',
        });
    }
});

total.delete('/:title', async (req, res) => {
    const { title } = req.params;

    try {
        const deleteQuery = `DELETE FROM total WHERE title = ?;`;
        const deleteRes = await connection.execute(deleteQuery, [title]);
        const total = deleteRes[0];

        if (total.affectedRows > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'total deleted.',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'There was nothing to delete.',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'DELETE: total API - server error.',
        });
    }
});

total.put('/:oldTitle', async (req, res) => {
    const { oldTitle } = req.params;
    const { newTitle } = req.body;

    if (!oldTitle || !newTitle) {
        return res.status(400).json({
            status: 'err',
            msg: 'CTotal could not be created. Provide "title" values.',
        });
    }

    try {
        const selectQuery = `SELECT * FROM total WHERE title = ?;`;
        const selectRes = await connection.execute(selectQuery, [newTitle]);
        const total = selectRes[0];

        if (total.length > 0) {
            return res.status(200).json({
                status: 'err-list',
                errors: [
                    {
                        input: 'total',
                        msg: 'Such total already exists.',
                    }
                ]
            });
        }

        const updateQuery = `UPDATE total SET title = ? WHERE title = ?`;
        const updateRes = await connection.execute(updateQuery, [newTitle, oldTitle]);
        const updateResObject = updateRes[0];

        if (updateResObject.affectedRows > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'total updated.',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'Total could not be updated.',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'PUT: total API - server error.',
        });
    }
});

total.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "Total" method' });
});