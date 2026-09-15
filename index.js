import dns from 'dns';

dns.setServers(['1.1.1.1', '8.8.8.8']);

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { validationResult } from 'express-validator';
import { registerValidation } from './validations/auth.js';

import UserModel from './models/user.js';


mongoose.connect(
    'mongodb+srv://jokerloh12_db_user:3ohIEtbF5wfL7G7d@cluster0.sg0chdt.mongodb.net/?appName=Cluster0'
).then(() => {
    console.log('DB OK');
}).catch((err) => console.log('DB Error', err));

const app = express();

const PORT = 4444;

app.use(express.json());

app.post('/auth/register', registerValidation, async (req, res) => {
    //отправляем пост-запрос, если проходит проверка через registerValidation, то идем дальше
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //Если (массив с ошибками не пустой)
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10); //шифруем пароль в 10 символах
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash,
    });

    const user = await doc.save();

    res.json(user);
});

app.listen(PORT, (err) => {
    if (err === true) {
        return console.log(err);
    } else {
        console.log('Server OK');
    }
});

