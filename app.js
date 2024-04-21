import express, { json } from 'express'
import cors from 'cors'
import osuRouter from './controller/osu-controller.js'
import path from 'path'
import { clearFile } from './utils/clear-file.js'

const app = express()
app.use(json()) // 使用json解析
app.use(cors()) // 允许跨域请求
app.use('/api', osuRouter)
app.use(function (err, req, res, next) {
  res.status(500).json({ errorMsg: err + '' })
})
// clearFile(path.join(path.resolve(), 'public/osu_map'))

app.listen(3000, () => {
  console.log('example app listening port 3000!')
})
