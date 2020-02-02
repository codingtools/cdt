// tslint:disable-next-line:file-name-casing
import * as chalk from 'chalk'
import * as fs from 'fs'

import Logger from './logger'
// tslint:disable-next-line:no-unnecessary-class
export default class Utilities {
  public static getStringFromFile(thisRef: any, filePath: string) {
    let fileStr = ''
    if (!fs.existsSync(filePath)) {
      Logger.error(thisRef, `Could not find file: ${chalk.red(filePath)}`) // this will output error and exit command
    } else {
      let fileBuffer = fs.readFileSync(filePath)
      fileStr = fileBuffer.toString() // by default utf8
    }
    return fileStr
  }
  public static getJsonObjectFromFile(thisRef: any, filePath: string) {
    if (!fs.existsSync(filePath)) {
      Logger.error(thisRef, `Could not find file: ${chalk.red(filePath)}`) // this will output error and exit command
    } else {
      let jsonString = fs.readFileSync(filePath, 'utf8')
      try {
        return JSON.parse(jsonString)
      } catch (err) {
        Logger.error(this, 'Error parsing JSON string:' + err)
      }
    }
  }

  public static getInputString(thisRef: any , flags: any, args: any) { //need to make it static so Crypto can use this
    // if -s or -f is not passed we will take it from args
    if (flags.string) //if -s given
      return flags.string
    else if (flags.file) { // if -f given
      Logger.info(thisRef, `reading file: ${chalk.green(flags.file)}`)
      return Utilities.getStringFromFile(thisRef, flags.file)
    } else
      return args.string
  }

  public static writeStringToFile(thisRef: any, filePath: string, string: string) {
    if (!fs.existsSync(filePath))
      Logger.info(thisRef, `Could not find file: ${chalk.yellow(filePath + ', creating new one')}`) // this will output error and exit command
    else
      Logger.warn(thisRef, `File already exists: ${chalk.green(filePath)}, ${chalk.yellow('overriding content')}`) // this will output error and exit command

    fs.writeFileSync(filePath, string)
    Logger.success(thisRef, `output written to file: ${chalk.green(filePath)}`) // this will output error and exit command
    // return `${chalk.red(pkg)} ${message}`

  }
}
