import express from 'express';
import { execute } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Fullstack!');
});

app.get('/bmi', (_req, res) => {
    const w = _req.query.weight;
    const h = _req.query.height;

    const result = execute([h as string, w as string]);

    if (result !== 'Input value was not a number') {
        res.status(200);
        res.send({
            weight: w,
            height: h,
            bmi: result
        });
    } else {
        res.status(400);
        res.send('malformatted parameters');
    }
});

app.get('/exercises', (_req, res) => {
    const e = _req.query.daily_exercises;
    const t = _req.query.target;

    const result = execute([e as string, t as string]);

    if (result !== 'Input value was not a number') {
        res.status(200);
        res.send({result});
    } else {
        res.status(400);
        res.send('malformatted parameters');
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log('hi im index');
});