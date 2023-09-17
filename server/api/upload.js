import path from 'path';
import express from 'express';
import multer from 'multer';

export const upload = express.Router();


const formStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/form');
    },
    filename: (req, file, cb) => {
        cb(null, 'form_' + Date.now() + path.extname(file.originalname));
    },
});
const formUpload = multer({
    storage: formStorage,
    limits: {
        fileSize: 1e7,
    },
});

upload.use('/form', formUpload.single('form_image'), (req, res) => {
    return res.status(201).json({
        status: 'ok',
        msg: 'Upload complete.',
        path: 'images/form/' + req.file.filename,
    });
});

upload.use('/', (req, res) => {
    return res.status(400).json({
        status: 'err',
        msg: 'Upsupported "Upload" route.',
        options: [
            'http://localhost:3001/api/upload/form',
        ],
    });
});

upload.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "Upload" method' });
});