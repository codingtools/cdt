import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import CronValidate from 'cron-validate'
import cronstrue from 'cronstrue'
import NodeCron from 'node-cron'

import Logger from '../utilities/logger'
import Utilities from '../utilities/utilities'

// https://github.com/Airfooox/cron-validate
/*
* this Commands add support for cron jobs
*  */
export default class Cron extends Command {
  static description = 'Cron Expressions helper and scheduler'

  static RUN = 'run'
  static DESCRIBE = 'desc'

  static PRESET_DEFAULT = {
    preset: 'default',
    override: {
      useAliases: true, // optional, default to false
      useBlankDay: true,
    }
  }

  static PRESET_DEFAULT_WITH_SECONDS = {
    preset: 'default',
    override: {
      useSeconds: true, // override preset option
      useAliases: true, // optional, default to false
      useBlankDay: true,
    }
  }
  static PRESET_DEFAULT_WITH_SECONDS_AND_YEARS = {
    preset: 'default',
    override: {
      useSeconds: true, // override preset option
      useYears: true,
      useAliases: true, // optional, default to false
      useBlankDay: true,
    }
  }

  // adding more options to have bit loosen validation rules
  static VALIDATOR_OPTIONS = {
    seconds: true,
    allowBlankDay: true,
    alias: true ,
    allowSevenAsSunday: true
  }

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
    this.evalCron(flags, args)
  }

  // to check required parameters passed or not
  // tslint:disable-next-line:no-unused
  private checkParameters(flags: any, args: any) {
    if (args.string === undefined || args.string === '')
      Logger.error(this, 'Input string is empty or undefined')

    // for more present settings check - https://github.com/Airfooox/cron-validate
    let preset = Cron.PRESET_DEFAULT

    // if we have 6 inputs enable seconds as an option
    let charCount = (args.string.match(/\s+/g) || []).length + 1
    console.log(charCount)
    if (charCount === 6) {
      preset = Cron.PRESET_DEFAULT_WITH_SECONDS
    } else if (charCount === 7) {
      preset = Cron.PRESET_DEFAULT_WITH_SECONDS_AND_YEARS
    }
    const cronResult = CronValidate(args.string, preset)

    if (!cronResult.isValid()) {
      const errorValue = cronResult.getError()
      // The error value contains an array of strings, which represent the cron validation errors.
      Logger.error(this, `Invalid Cron expression : ${chalk.yellow(errorValue)}`)
    }
    // if (!isValidCron(args.string, Cron.VALIDATOR_OPTIONS)) {
    //   Logger.error(this, `Invalid Cron expression : ${chalk.red(args.string)}`)
    // }

    if (args.action === undefined || args.string === '')
      Logger.error(this, 'Action empty or undefined')
  }

  // tslint:disable-next-line:no-unused
  private evalCron(flags: any, args: any) {
    // Logger.success(this, `Action: ${chalk.green(args.action)}`)
    if (args.action === Cron.DESCRIBE) {
      let output = cronstrue.toString(args.string)
      Logger.success(this, output)
    } else if (args.action === Cron.RUN) {
      Logger.success(this, 'run command, coming soon...')
      NodeCron.schedule('*/10 * * * * *', function () {
        // tslint:disable-next-line:no-console
        console.log('Status Logged!')
      })
    }
  }

  // tslint:disable-next-line:no-unused
  private getAction(flags: any, args: any) {
    if (flags.describe) // find  human readable descriptions for cron
      return Cron.DESCRIBE
    else if (flags.run) // if run is given
      return Cron.RUN
    Logger.error(this, 'Invalid Or Unsupported action')
  }
}
