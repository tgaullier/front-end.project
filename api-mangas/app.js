import express from 'express'
import cors from 'cors'

import {apiV1Router} from './routes/apiV1'

const app = express()

app.use(cors())

app.use('/api/v1/', apiV1Router)

app.listen(3000, () => {
    console.log('Application running ...')
})