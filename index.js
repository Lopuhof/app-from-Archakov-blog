import dns from 'dns';

dns.setServers(['1.1.1.1', '8.8.8.8']);

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import multer from 'multer';

import { validationResult } from 'express-validator';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import UserModel from './models/user.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';

import { UserController, PostController } from './controllers/index.js'; 

mongoose.connect(
    'mongodb+srv://jokerloh12_db_user:3ohIEtbF5wfL7G7d@cluster0.sg0chdt.mongodb.net/blog?appName=Cluster0'
).then(() => {
    console.log('DB OK');
}).catch((err) => console.log('DB Error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer( { storage });

const PORT = 4444;

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register',  registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

//Получать одну или все статьи могут любые пользователи
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
//Создавать, удалять или обновлять могут только авторизованные пользователи
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update);

app.listen(PORT, (err) => {
    if (err === true) {
        return console.log(err);
    } else {
        console.log('Server OK');
    }
});

