import dns from 'dns';

dns.setServers(['1.1.1.1', '8.8.8.8']);

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { validationResult } from 'express-validator';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import UserModel from './models/user.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose.connect(
    'mongodb+srv://jokerloh12_db_user:3ohIEtbF5wfL7G7d@cluster0.sg0chdt.mongodb.net/blog?appName=Cluster0'
).then(() => {
    console.log('DB OK');
}).catch((err) => console.log('DB Error', err));

const app = express();

const PORT = 4444;

app.use(express.json());

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
/* app.delete('/posts', PostController.remove); */
/* app.patch('/posts', PostController.update); */

app.listen(PORT, (err) => {
    if (err === true) {
        return console.log(err);
    } else {
        console.log('Server OK');
    }
});

