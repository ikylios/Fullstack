/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import bodyParser from 'body-parser';
import { execute } from './bmiCalculator';
import { executeExercise } from './exerciseCalculator';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/exercises', (_req, res) => {
    const e: string[] = _req.body.daily_exercises;
    const t: string = _req.body.target;

    const result = executeExercise(t, e);

    if ("error" in result) {
        res.status(400);
    } else {
        res.status(200);
    }
    res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log('hi im index');
});