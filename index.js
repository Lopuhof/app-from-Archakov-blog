import express from 'express';

const app = express();

app.get('/', (req, res) => {
// req - то, что прислал клиент
// res - то, что мы отправляем клиенту
    res.send('Hellow world!');
});

app.listen(4444, (err) => {
    if (err === true) {
        return console.log(err);
    } else {
        console.log('Server OK');
    }
});