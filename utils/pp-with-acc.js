import * as rosu from 'rosu-pp-js'

const accList = [95, 97, 98, 99, 100]
/**
 * 计算不同acc的pp值
 * @param {rosu.PerformanceAttributes} maxAttrs 当前铺面的最大值对象
 * @param {number} mods 该成绩的mod
 */
export const calDiffAcc = (maxAttrs, mods) => {
  const accPPlist = accList.map((item) => {
    return {
      acc: item,
      pp: new rosu.Performance({
        accuracy: item,
        mods: mods,
        hitresultPriority: rosu.HitResultPriority.BestCase,
      }).calculate(maxAttrs).pp, // Re-using previous attributes to speed up the calculation.
    }
  })
  return accPPlist
}
