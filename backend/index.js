import express from 'express'
import authRoutes from './routes/auth.js'

const app = express()

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`Sever running on ${PORT}`) )