import express from 'express'

const app = express()

app.get('/hello', (_req, res) => {
    res.send('Hello Fullstack!')
})