// tslint:disable-next-line:file-name-casing
import * as fs from 'fs'

import Logger from './logger'
// tslint:disable-next-line:no-unnecessary-class
export default class Utilities {
  public static getStringFromFile(thisRef: any, filePath: string) {
    let fileStr = ''
    if (!fs.existsSync(filePath)) {
      Logger.error(thisRef, `Could not find file: ${filePath}`) // this will output error and exit command
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
