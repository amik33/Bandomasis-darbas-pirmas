import express from 'express';
import { connection } from '../setupDb.js';

export const forms = express.Router();

forms.post('/', async (req, res) => {
    const { role, id } = req.user;

    if (role !== 'user') {
        return res.status(400).json({
            status: 'err',
            msg: 'You are not a seller.',
        });
    }

    const { image, title, price, color, total,
        year, steeringWheel, location } = req.body;

    if (!title) {
        return res.status(400).json({
            status: 'err',
            msg: 'form could not be created. Provide "title" value.',
        });
    }

    if (!image) {
        return res.status(400).json({
            status: 'err',
            msg: 'form could not be created. Provide "image" value.',
        });
    }

    if (!price) {
        return res.status(400).json({
            status: 'err',
            msg: 'form could not be created. Provide "price" value.',
        });
    }

    if (!color) {
        return res.status(400).json({
            status: 'err',
            msg: 'form could not be created. Provide "color" value.',
        });
    }

    if (!total) {
        return res.status(400).json({
            status: 'err',
            msg: 'form could not be created. Provide "total" value.',
        });
    }

    if (!year) {
        return res.status(400).json({
            status: 'err',
            msg: 'form could not be created. Provide "year" value.',
        });
    }

    if (!steeringWheel) {
        return res.status(400).json({
            status: 'err',
            msg: 'form could not be created. Provide "steeringWheel" value.',
        });
    }

    if (!location) {
        return res.status(400).json({
            status: 'err',
            msg: 'form could not be created. Provide "location" value.',
        });
    }

    try {
        const totalQuery = `SELECT id FROM total WHERE title = ?`;
        const totalRes = await connection.execute(totalQuery, [total]);
        const totalResArray = totalRes[0];

        if (totalResArray.length < 1) {
            return res.status(400).json({
                status: 'err',
                msg: 'form type value is invalid.',
            });
        }

        const totalId = totalResArray[0].id;

        const steeringWheelQuery = `SELECT id FROM \`steering-wheel\` WHERE side = ?`;
        const steeringWheelRes = await connection.execute(steeringWheelQuery, [steeringWheel]);
        const steeringWheelResArray = steeringWheelRes[0];

        if (steeringWheelResArray.length < 1) {
            return res.status(400).json({
                status: 'err',
                msg: 'form steering wheel value is invalid.',
            });
        }

        const steeringWheelId = steeringWheelResArray[0].id;

        const insertQuery = `INSERT INTO forms
            (user_id, total_id, title, color, price, year, steering_wheel_id, location, mileage, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const insertRes = await connection.execute(insertQuery,
            [id, totalId, title, color, price, year, steeringWheelId, location, 0, image]);
        const insertResObject = insertRes[0];

        if (insertResObject.insertId > 0) {
            return res.status(201).json({
                status: 'ok',
                msg: 'form created',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'form could not be created',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'err',
            msg: 'POST: Form API - server error.',
        });
    }
});

forms.get('/', async (req, res) => {
    const role = req.user.role;
    let selectQuery = '';

    if (role === 'admin') {
        selectQuery = `SELECT forms.id, forms.title, total.title as total, forms.image, 
                            forms.price, forms.color, forms.location
                        FROM forms
                        INNER JOIN total ON total.id = forms.total_id;`;
    } else if (role === 'user') {
        selectQuery = `SELECT * FROM forms WHERE user_id = ?;`;
    } else {
        return res.status(403).json({
            status: 'err',
            msg: 'Forbiden.',
        });
    }

    try {
        const selectRes = await connection.execute(selectQuery, [req.user.id]);
        const totale = selectRes[0];

        return res.status(200).json({
            status: 'ok',
            list: totale,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'GET: Form API - server error.',
        });
    }
});

forms.get('/:formId', async (req, res) => {
    const { formId } = req.params;

    try {
        const selectQuery = `SELECT forms.id, forms.title, total.title as total, forms.image, 
                                forms.price, forms.color, forms.location, \`steering-wheel\`.side as steeringWheel
                            FROM forms
                            INNER JOIN total ON total.id = forms.total_id
                            INNER JOIN \`steering-wheel\` ON \`steering-wheel\`.id = forms.steering_wheel_id
                            WHERE forms.id = ?;`;
        const selectRes = await connection.execute(selectQuery, [formId]);
        const forms = selectRes[0];

        return res.status(200).json({
            status: 'ok',
            form: forms[0],
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'err',
            msg: 'GET: Form API - server error.',
        });
    }
});

forms.delete('/:title', async (req, res) => {
    const { title } = req.params;

    try {
        const deleteQuery = `DELETE FROM total WHERE title = ?;`;
        const deleteRes = await connection.execute(deleteQuery, [title]);
        const totale = deleteRes[0];

        if (totale.affectedRows > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'form type deleted.',
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
            msg: 'DELETE: Form API - server error.',
        });
    }
});

forms.put('/:oldTitle', async (req, res) => {
    const { oldTitle } = req.params;
    const { newTitle } = req.body;
    console.log(oldTitle, newTitle);

    if (!oldTitle || !newTitle) {
        return res.status(400).json({
            status: 'err',
            msg: 'form type could not be created. Provide "title" values.',
        });
    }

    try {
        const selectQuery = `SELECT * FROM total WHERE title = ?;`;
        const selectRes = await connection.execute(selectQuery, [newTitle]);
        const totale = selectRes[0];

        if (totale.length > 0) {
            return res.status(200).json({
                status: 'err-list',
                errors: [
                    {
                        input: 'total',
                        msg: 'Such form type already exists.',
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
                msg: 'form type updated.',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'form type could not be updated.',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'PUT: Form API - server error.',
        });
    }
});

forms.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "Forms" method' });
});