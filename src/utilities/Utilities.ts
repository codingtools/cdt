import * as fs from 'fs'
import Logger from './Logger'

export default class Utilities {
  public static getStringFromFile(thisRef: any, filePath: string) {
    let fileStr = ''
    if (!fs.existsSync(filePath)) {
      Logger.error('reading File') // this will output error and exit command
    } else {
      fileStr = fs.readFileSync(filePath, 'utf8')

      // TODO: fix this Issue #3
      if (fileStr.charAt(fileStr.length - 1) === '\n') {
        fileStr = fileStr.substring(0, fileStr.length - 1)
      }
    }
    return fileStr
  }
}
