import fs from 'fs'


/**
 * Load files inside a directory, excluding its index and file names
 * containing in blacklist.
 *
 * @param {stirng} path - path of the directory, if not given, default is current
 * @param {*} blacklist - files to exclude from load, default empty
 */
export const loadModules = (path = '.', blacklist = []) => {

  const modules = fs.readdirSync(path, (err) => {
    if (err) {
      console.log('Unable to scan directory: ' + err)
      throw err
    }
  })

  if (!modules || modules.length == 0) return []
  if (!blacklist || !Array.isArray(blacklist)) blacklist = []

  return modules
    .filter(model => !model.includes('index.js') && !blacklist.includes(model))
    .map(model => {
      const name = `${path}/${model.replace('.js', '')}`
      const instance = require(name)
      return instance.default
    })
}

export default {}
