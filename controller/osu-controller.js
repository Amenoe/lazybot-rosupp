import express from 'express'
import { ppCalcHandle } from '../services/osu-service.js'
const router = express.Router()

// 处理请求的函数
router.post('/pp_calc', ppCalcHandle)

export default router
