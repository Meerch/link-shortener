import express from "express"
import config from "config"
import mongoose from 'mongoose'
import routerAuth from './routes/auth.routes.js'
import routerLink from './routes/link.routes.js'
import routerRedirect from "./routes/redirect.routes.js"

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', routerAuth)
app.use('/api/link', routerLink)
app.use('/t', routerRedirect)

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
