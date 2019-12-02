// tslint:disable-next-line:file-name-casing
import * as fs from 'fs'

const detectCharacterEncoding = require('detect-character-encoding')
const Encoding = require('encoding-japanese')

import Logger from './logger'
// tslint:disable-next-line:no-unnecessary-class
export default class Utilities {
  public static getStringFromFile(thisRef: any, filePath: string) {
    let fileStr = ''
    if (!fs.existsSync(filePath)) {
      Logger.error(thisRef, `Could not find file: ${filePath}`) // this will output error and exit command
    } else {
      let fileBuffer = fs.readFileSync(filePath)

      // let detected = Encoding.detect(fileBuffer)
      let charsetMatch = detectCharacterEncoding(fileBuffer)

      // thisRef.log('BUFFER:'+detected)
      // thisRef.log(charsetMatch.encoding)
      //
      fileStr = fileBuffer.toString()
      // fileStr = fileBuffer.toString('utf8') //converting to utf8

      thisRef.log('BEFORE:' + Encoding.detect(fileStr))

      thisRef.log(fileStr.length)
      fileStr = Encoding.convert(fileStr, {
        to: 'UTF8', // to_encoding
        from: charsetMatch.encoding, // from_encoding
      })
      thisRef.log('AFTER:' + Encoding.detect(fileStr))

      thisRef.log(fileStr.length)

      // TODO: fix this Issue #3
      if (fileStr.charAt(fileStr.length - 1) === '\n') {
        fileStr = fileStr.substring(0, fileStr.length - 1)
      }
    }
    return fileStr
  }
  public static getJsonObjectFromFile(thisRef: any, filePath: string) {
    if (!fs.existsSync(filePath)) {
      Logger.error(thisRef, `Could not find file: ${filePath}`) // this will output error and exit command
    } else {
      let jsonString = fs.readFileSync(filePath, 'utf8')
      try {
        return JSON.parse(jsonString)
      } catch (err) {
        Logger.error(this, 'Error parsing JSON string:' + err)
      }
    }
  }

}
