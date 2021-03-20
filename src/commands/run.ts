import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import shelljs from 'shelljs'

import Logger from '../utilities/logger'
import Utilities from '../utilities/utilities'
/*
* this Commands add support for cron jobs
*  */
export default class Run extends Command {
  static description = 'Cron Expressions helper and scheduler'

  static flags = {
    help: flags.help({char: 'h'}),
    string: flags.string({char: 's' , description: 'unix command'}),
  }

  static args = [{name: 'string'}]

  // only 2 parameters required HASH_TYPE and INPUT_STRING
  async run() {
    const {args, flags} = this.parse(Run)

    args.string = Utilities.getInputStringFromCmd(this, flags, args) // from either -s or args

    //check params after evaluating all
    this.checkParameters(flags, args)
    this.evalRun(flags, args)
  }

  // to check required parameters passed or not
  // tslint:disable-next-line:no-unused
  private checkParameters(flags: any, args: any) {
    if (args.string === undefined || args.string === '')
      Logger.error(this, 'Command empty or undefined')
  }

  // tslint:disable-next-line:no-unused
  private evalRun(flags: any, args: any) {
    Logger.success(this, `running: ${chalk.green(args.string)}`)
    shelljs.exec(args.string)
  }

}
