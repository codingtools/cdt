import {Command, flags} from '@oclif/command'

import Logger from '../utilities/logger'

export default class Bundlephobia extends Command {
  static description = 'Find cost of adding a npm/yarn package'

  static flags = {
    help: flags.help({char: 'h'}),
    packages: flags.string({
      char: 'p',
      description: 'packages for which cost is required, pass more than one separated by space',
      multiple: true // can get multiple package names
    }),
  }

  static args = [{name: 'package'}] // only one can be passed club which one passed through flag and arg

  // values needed package
  async run() {
    const {args, flags} = this.parse(Bundlephobia)

    args.packages = this.getPackages(flags, args) // get a list

    this.checkParameters(flags, args)

    args.packages.map(
      (p: string) => this.bundlePhobia(p)
    )

  }

  private getPackages(flags: any, args: any) {
    let packages = []

    if (args.package)
      packages.push(args.package)

    if (flags.packages)
      packages = packages.concat(flags.packages) // not inplace operation

    return packages
  }

  // tslint:disable-next-line:no-unused
  private checkParameters(flags: unknown, args: any) {
    if (args.packages.length === 0)
      Logger.error(this, 'At least one package must be passed')
  }

  private bundlePhobia(p: string) {
    this.log('called for ' + p)

  }
}
