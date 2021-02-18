
const _1H_inMileseconds = 3600000
const _1Min = 60


export const diff = (d1, d2) => {
  if (!d1 || !d2) throw Error('Missing args.')
    
  let start = d1, end = d2

  if (Object.prototype.toString.call(d1) != '[object Date]')
    start = Date.parse(d1)

  if (Object.prototype.toString.call(d2) != '[object Date]')
    end = Date.parse(d2)

  if (!start || !end )
    throw Error('Invalid arguments')

  const diff = start > end
    ? start - end
    : end - start

  return diff
}

export const durationStr = (timeMilisec) => {
  let hstr = false, mstr = false
  const fH = Math.abs(timeMilisec/_1H_inMileseconds)
 
  const hours = Math.trunc(fH)
  // fH % 1 gets decimal part
  const min =  Math.trunc(Math.abs((fH % 1) * _1Min))

  if (hours > 0)
    hstr = `${hours} hour(s)`
    
  if (min > 0)
    mstr = `${min} minute(s)`
    

  return (hstr && mstr
    ? `${hstr} and ${mstr}`
    : hstr || mstr)
}

export default {
  diff,
  durationStr
}