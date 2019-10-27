import * as fs from 'fs'
import * as signale from 'signale'

export default class Utilities {
  public static getStringFromFile(thisRef: any, filePath: string) {
    let fileStr = ''
    if (!fs.existsSync(filePath)) {
      this.logError('reading File') // this will output error and exit command
    } else {
      fileStr = fs.readFileSync(filePath, 'utf8')

      // TODO: fix this Issue #3
      if (fileStr.charAt(fileStr.length - 1) === '\n') {
        fileStr = fileStr.substring(0, fileStr.length - 1)
      }
    }
    return fileStr
  }

  // uses signale for logging withoug thisRef
  public static logSuccess( message: string) {
    signale.success(`${message}`)
  }
  public static logInfo(message: string) {
    signale.info(`${message}`)
  }
  public static logError(message: string) {
    signale.error(`${message}`)
  }

  // public static logSuccess(thisRef: any, message: string) {
  //   thisRef.log(` ›   Success: ${message}`)
  // }
  // public static logInfo(thisRef: any, message: string) {
  //   thisRef.log(` ›   Info: ${message}`)
  // }
  // public static logError(thisRef: any, message: string) {
  //   thisRef.error(`${message}`)
  // }

}
