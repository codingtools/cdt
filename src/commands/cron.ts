import {Command, flags} from '@oclif/command'
import cronstrue from 'cronstrue'
import CryptoJS from 'crypto-js'

import Logger from '../utilities/logger'
import Utilities from '../utilities/utilities'

import { isValidCron } from 'cron-validator'
import chalk from "chalk";
/*
* this Commands add support for cron jobs
*  */
export default class Cron extends Command {
  static description = 'Cron Expressions helper and scheduler'

  static RUN = 'run'
  static DESCRIBE = 'desc'

  static flags = {
    help: flags.help({char: 'h'}),
    string: flags.string({char: 's' , description: 'Cron expression'}),
    describe: flags.boolean({char: 'd' , description: 'Describe cron expressions into human readable descriptions'}),
    run: flags.boolean({char: 'r' , description: 'run command using cron expression'}),
  }

  static args = [{name: 'string'}]

  // only 2 parameters required HASH_TYPE and INPUT_STRING
  async run() {
    const {args, flags} = this.parse(Cron)

    args.string = Utilities.getInputStringFromCmd(this, flags, args) // from either -s or args
    args.action = this.getAction(flags, args) //by default let it be sha1

    //check params after evaluating all
    this.checkParameters(flags, args)
    this.eval(flags, args)
  }

  // to check required parameters passed or not
  // tslint:disable-next-line:no-unused
  private checkParameters(flags: any, args: any) {
    if (args.string === undefined || args.string === '')
      Logger.error(this, 'Input string is empty or undefined')

    if (!isValidCron(args.string)) {
      Logger.error(this, `Invalid Cron expression : ${chalk.red(args.string)}`)
    }

    if (args.action === undefined || args.string === '')
      Logger.error(this, 'Action empty or undefined')
  }

  private eval(flags: any, args: any) {
    // Logger.success(this, `Action: ${chalk.green(args.action)}`)
    if (args.action === Cron.DESCRIBE) {
      let output = cronstrue.toString(args.string)
      Logger.success(this, output)
    } else if (args.action === Cron.RUN){
      Logger.success(this, 'run command, coming soon...')
    }
  }

  private getAction(flags: any, args: any) {
    if (flags.describe) // find  human readable descriptions for cron
      return Cron.DESCRIBE
    else if (flags.run) // if run is given
      return Cron.RUN
    Logger.error(this, 'Invalid Or Unsupported action')
  }
}
