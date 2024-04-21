/**
 * 定期删除public/osu_map下的文件
 */

import fs from 'fs'
import path from 'path'
export const clearFile = (url) => {
  setInterval(() => {
    var files = []
    if (fs.existsSync(url)) {
      //判断给定的路径是否存在

      files = fs.readdirSync(url) //返回文件和子目录的数组
      files.forEach(function (file, index) {
        var curPath = path.join(url, file)

        if (fs.statSync(curPath).isDirectory()) {
          //同步读取文件夹文件，如果是文件夹，则函数回调
          deleteDir(curPath)
        } else {
          fs.unlinkSync(curPath) //是指定文件，则删除
        }
      })

      fs.rmdirSync(url) //清除文件夹
    } else {
      console.log('给定的路径不存在！')
    }
  }, 1000 * 60 * 60 * 12)
}
