import {Command, flags} from '@oclif/command'
import axios from 'axios'
import chalk from 'chalk'

import Logger from '../utilities/logger'

// TODO: add multiple package support
// ADD package.json support
// ADD VALID tests ( for now they just ignoring )
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
    Logger.info(this, `running for ${p}`)
    Logger.progressStart(this, `finding size of ${p}`)
    let url = `https://bundlephobia.com/api/size?package=${p}`

    // this.log('calling: ' + url)
    axios
      .get(url)
      .then(successResponse => {
        // this.showDependencyData(successResponse.data)
        Logger.progressStop(this, this.showDependencyData(successResponse.data))
      })
      .catch(errorResponse => {
        // Logger.warn(this, )
        Logger.progressStopError(this, `[${p}] : ${errorResponse.response.data.error.message}`)
      })

    return true
  }

  private showDependencyData(data: any) {
    // Logger.info(this, `${data.name}@${data.version} minified:${this.getKB(data.size)} gzip:${this.getKB(data.gzip)}`)
    return `${chalk.magenta(data.name)}@${chalk.cyan(data.version)} has ${data.dependencyCount} dependencies with size of ${this.getSize(data.size)}(${this.getSize(data.gzip)} gzipped)`
  }

  private getSize(byteSize: number) {
    if (byteSize >= 1024 * 1024)
      return `${chalk.red((byteSize / (1024 * 1024)).toFixed(1) + 'MB')}`
    else if (byteSize >= 1024)
      return `${chalk.blue((byteSize / (1024)).toFixed(1) + 'KB')}`
    else //if (byteSize < 1024)
       return `${chalk.green(byteSize.toFixed(1) + 'B')}`
  }
}
