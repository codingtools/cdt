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

    Logger.progressStart(this, 'finding size...')

    let size = 0
    let gzip = 0
    let dependencyCount = 0

    let promiseList = args.packages.map(
      (pkg: string) => this.bundlePhobia(pkg)
    )

    // @ts-ignore
    axios.all(promiseList).then(
      axios.spread((...responses) => {
        responses.map((successResponse: any) => {
          size += successResponse.data.size
          gzip += successResponse.data.gzip
          dependencyCount += successResponse.data.dependencyCount
          Logger.progressStop(this, this.getSuccessMessage(successResponse.data))
        })
      })
    )
      .catch((...errors) => {
        errors.map(errorResponse => {
          Logger.progressStopError(this, this.getErrorMessage('pkg', errorResponse.response.data.error.message))
        })
      })
      .finally(() => {
        Logger.success(this, '\n' + this.getFinalMessage({
          count: args.packages.length,
          dependencyCount,
          size,
          gzip
        }))
      })

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

  private bundlePhobia(pkg: string) {
    let url = `https://bundlephobia.com/api/size?package=${pkg}`
    return axios
      .get(url, {
        headers: {'User-Agent': '@codingtools/cdt', 'X-Bundlephobia-User': '@codingtools/cdt'}
      })
  }

  private getFinalMessage(data: any) {
    return `${chalk.magenta('Total')} [${chalk.cyan(data.count + ' packages')}] has ${data.dependencyCount} dependencies with size of ${this.getSize(data.size)}(${this.getSize(data.gzip)} gzipped)`
  }

  private getSuccessMessage(data: any) {
    return `${chalk.magenta(data.name)}@${chalk.cyan(data.version)} has ${data.dependencyCount} dependencies with size of ${this.getSize(data.size)}(${this.getSize(data.gzip)} gzipped)`
  }

  private getErrorMessage(pkg: string, message: string) {
    // replacing will be useful when we do not have specific version
    // output will be like below
/*
    ⚠ @codingtools/cdt@1.2.3 This package has not been published with this particular version.
                     Valid versions - `<code>latest</code>`, `<code>0.1.1</code>` and `<code>0.1.2</code>`
*/
    if (message.includes('This package has not been published with this particular version.'))
      message = message.replace(/`<code>|<\/code>`/g, '')

    return `${chalk.magenta(pkg)} ${message}`
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
