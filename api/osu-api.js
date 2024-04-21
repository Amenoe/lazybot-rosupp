import fs from 'fs'
import path from 'path'
import request from 'request'
const baseUrl = 'https://osu.ppy.sh/osu'
/**
 *  下载铺面
 * @param {string} beatmapId
 */
export const beatmapDownLoad = (beatmapId) => {
  const beatmapUrl = `${baseUrl}/${beatmapId}`
  // 创建文件夹目录
  const dirPath = path.join(path.resolve(), 'public/osu_map')
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }
  const fileName = beatmapUrl.split('/').pop() + '.osu'
  return new Promise((resolve, reject) => {
    // 检查文件是否存在于当前目录中。
    if (!fs.existsSync(path.join(dirPath, fileName))) {
      let stream = fs.createWriteStream(path.join(dirPath, fileName))
      request(beatmapUrl)
        .pipe(stream)
        .on('close', function (err) {
          resolve('文件' + fileName + '下载完成')
        })
        .on('error', function (err) {
          reject(err)
        })
    } else {
      resolve('文件已存在')
    }
  })
}
