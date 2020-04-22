import express from 'express'
import api from '../api'
const router = express.Router()

router.get('/findanime', api.getFindAnime)
router.get('/saerchanime', api.getSearchAnime)

export {router as apiV1Router}