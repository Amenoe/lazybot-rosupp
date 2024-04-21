import { beatmapDownLoad } from '../api/osu-api.js'
import path from 'path'
import * as rosu from 'rosu-pp-js'
import * as fs from 'fs'

import { Mods } from '../utils/osu-mod-map.js'
import { calDiffAcc } from '../utils/pp-with-acc.js'

/**
 * 计算不同acc的pp值
 * @param {*} req
 * @param {*} res
 */
export const ppCalcHandle = async (req, res, next) => {
  // 获取get请求/后的参数
  // const map_id = req.params.id
  // post 请求参数
  try {
    if (Object.keys(req.body).length === 0) throw '不接受该格式的请求'
    const { beatmapId, mods, n300, n100, n50, combo, misses, accuracy } = req.body
    let sumMods = 0
    if (Array.isArray(mods)) {
      mods.forEach((element) => {
        element = element.toUpperCase()
        console.log(element)
        if (Object.hasOwnProperty.call(Mods, element)) {
          sumMods += Mods[element]
        } else {
          throw '不存在此mods'
        }
      })
    } else {
      throw 'mods请传入数组'
    }

    // console.log(typeof Object.keys(Mods)[0])
    const ppConfig = {
      mods: sumMods, // Must be the same as before in order to use the previous attributes!
      n300,
      n100,
      n50,
      combo,
      misses,
      accuracy: accuracy * 100,
    }
    const flag = await beatmapDownLoad(beatmapId)
    console.log(flag)
    // 读取文件
    const bytes = fs.readFileSync(path.join(path.resolve(), 'public/osu_map', beatmapId + '.osu'))

    // 分析地图
    let map = new rosu.Beatmap(bytes)

    // 可以选择将beatmap转换为特定模式。
    // map.convert(rosu.GameMode.Osu)

    const maxAttrs = new rosu.Performance({ mods: ppConfig.mods }).calculate(map)
    const accPPlist = calDiffAcc(maxAttrs)

    // 计算iffc，猫直接用acc算，雨沫用50和100算
    const fcAttrs = new rosu.Performance({
      n100: ppConfig.n100,
      n50: ppConfig.n50,
      hitresultPriority: rosu.HitResultPriority.BestCase,
    }).calculate(maxAttrs)

    const detailAttrs = new rosu.Performance({
      ...ppConfig,
      hitresultPriority: rosu.HitResultPriority.BestCase,
    }).calculate(maxAttrs)
    // console.log(`PP: ${currAttrs.pp}/${maxAttrs.pp}/${currAttrs.ppAim}| Stars: ${maxAttrs.difficulty.stars}`)
    res.json({
      accPPlist,
      iffc: fcAttrs.pp,
      detailAttrs,
    })
  } catch (error) {
    return next(error)
  }
}
