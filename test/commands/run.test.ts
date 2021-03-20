import {expect, test} from '@oclif/test'

describe('run', () => {
  test
    .stdout()
    .command(['run'])
    .exit(0)
    .it('Nothing is passed', ctx => {
      expect(ctx.stdout).to.contain('Command empty or undefined')
    })

  test
    .stdout()
    .command(['run', 'echo test'])
    .it('Run command with arg for input', ctx => {
      expect(ctx.stdout).to.contain('running: echo test')
    })

  test
    .stdout()
    .command(['run', '-s', 'echo test'])
    .it('Describe cron with -s flag for input', ctx => {
      expect(ctx.stdout).to.contain('running: echo test')
    })

})
