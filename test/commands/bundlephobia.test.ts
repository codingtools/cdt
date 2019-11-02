import {expect, test} from '@oclif/test'

describe('bundlephobia', () => {
  test
    .stdout()
    .command(['bundlephobia'])
    .exit(0)
    .it('if no package passed', ctx => {
      expect(ctx.stdout).to.contain('At least one package must be passed')
    })
})
