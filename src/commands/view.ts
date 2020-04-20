// code here to write the tool for csv tool show
import {Command, flags} from '@oclif/command'
import * as chalk from 'chalk'

import Logger from '../utilities/logger'
import Utilities from '../utilities/utilities'

export default class View extends Command {
  static description = 'View file content and more'

  static DEFAULT_COUNT = 10
  static flags = {
    help: flags.help({char: 'h'}),
    file: flags.string({char: 'f' , description: 'formatted file to be shown'}),
    num: flags.string({char: 'n' , description: `no. of rows to show, default:${View.DEFAULT_COUNT}`})
  }

  static args = [{name: 'file'}]

  // required FILE
  async run() {
    const {args, flags} = this.parse(View)

    args.file = this.getFilePath(flags, args)
    args.num = this.getFileLinesToShow(flags)

    // args.rowsToShow

    this.checkParameters(flags, args)
    this.showFile(args)
  }

  private getFilePath(flags: any, args: any) {
    if (args.file)
      return args.file
    if (flags.file)
      return flags.file9
    Logger.error(this, 'File path not passed')
  }

  private getFileLinesToShow(flags: any) {
    if (flags.num && flags.num > 0) // if value available and valid
      return flags.num
    else
      return View.DEFAULT_COUNT
  }
  // tslint:disable-next-line:no-unused
  private checkParameters(flags: unknown, args: { [p: string]: any }) {
    if (args.file === undefined || args.file === '')
      Logger.error(this, 'File path is empty')
    // others already checked
  }

  private showFile(args: any) {
    let data = Utilities.getStringFromFile(this, args.file)
    let rows = data.split('\n')
    let widthArray = []

    let recordsToShow = parseInt(args.num, 10) + 1

    for (let i = 0; i < rows[0].length; i++) {
      widthArray[i] = 0
    }

    if (recordsToShow > rows.length) {
      recordsToShow = rows.length - 1
    }

    for (let i = 0; i < recordsToShow; i++) {
      let row = rows[i].split(',')
      for (let j = 0; j < row.length; j ++) {
        if (widthArray[j] < row[j].length) {
          widthArray[j] = row[j].length
        }
      }
    }

    // -1 need to be done to exclude header
    // ${chalk.yellow('Avro Schema')
    Logger.info(this, `Total ${chalk.greenBright(rows.length - 2)} records in file.`)
    Logger.info(this, `showing top ${chalk.yellow(recordsToShow - 1)} records.`)

    this.printRow(rows[0].split(','), widthArray, '+', true)
    for (let i = 0; i < recordsToShow; i++) {
      let row = rows[i]
      this.printRow(row.split(','), widthArray, '|', false)
      this.printRow(row.split(','), widthArray, '+', true)
    }

    Logger.success(this, 'done.\n')
  }

  private printRow(row: any, widthArray: any, seperator: any, isLineSeparator: any) {
    let output = seperator
    for (let i = 0; i < row.length; i ++) {
      let totalSize = widthArray[i]
      let dataLength = 0
      let space = '-'
      if (!isLineSeparator) {
        let data = row[i]
        data = data.split(/\r/)[0]
        output += data
        dataLength = data.length
        space = ' '
      }
      for (let j = 0; j < totalSize - dataLength; j++) {
        output += space
      }
      output += seperator
    }
    this.log('' + output)
  }
}
