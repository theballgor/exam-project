import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import {config as dotenvInit} from 'dotenv'
import {default as authRoutes} from './routes/auth.routes.js'
import {default as profileRoutes} from './routes/profile.routes.js'
import {default as recordsRoutes} from './routes/record.routes.js'
import {default as adminRoutes} from './routes/admin.routes.js'

dotenvInit()

const app = express()

app.use(express.json({ extended: true }))
app.use(cors())

app.use('/api/auth/', authRoutes)
app.use('/api/profile/', profileRoutes)
app.use('/api/records/', recordsRoutes)
app.use('/api/admin/', adminRoutes)

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const start = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => {
            console.log(`Server started on port:${PORT}`)
        })

    } catch (e) {
        console.log('Fatal error: ', e.message)
        process.exit()
    }
}

start()