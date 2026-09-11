import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
// req - то, что прислал клиент
// res - то, что мы отправляем клиенту
    res.send('Hellow world!');
});

app.post('/auth/login', (req, res) => {
    console.log(req.body);

    if (req.body.email === 'test@test.ru') {
        //Генерируем веб-токен
        //В теле пишем, что шифруем (в нашем случае email и полное имя)
        const token = jwt.sign({
            email: req.body.email,
            fullName: 'Вася Пупкин'
        }, 'secret123');
        //После } указывается специальный ключ, с помощью чего мы шифруем (можно написать что угодно)
    };

    res.json({
        success: true,
        token
    });
});

app.listen(4444, (err) => {
    if (err === true) {
        return console.log(err);
    } else {
        console.log('Server OK');
    }
});

