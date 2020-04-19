// code here to write the tool for csv tool show
import {Command, flags} from '@oclif/command'

import Logger from '../utilities/logger'
import Utilities from '../utilities/utilities'

export default class ShowFile extends Command {
  static description = 'File Minifier'

  static flags = {
    help: flags.help({char: 'h'}),
    file: flags.string({char: 'f' , description: 'formatted file to be shown'}),
    num: flags.string({char: 'n' , description: 'rows to show'})
  }

  static args = [{name: 'file'}]

  // required FILE
  async run() {
    const {args, flags} = this.parse(ShowFile)

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
    return flags.num || 10
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

    this.printRow(rows[0].split(','), widthArray, '+', true)
    for (let i = 0; i < recordsToShow; i++) {
      let row = rows[i]
      this.printRow(row.split(','), widthArray, '|', false)
      this.printRow(row.split(','), widthArray, '+', true)
    }
    this.log(`showing top ${recordsToShow} rows.`)
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
