import {expect, test} from '@oclif/test'

describe('minify', () => {
  test
    .stdout()
    .command(['minify', '-t', 'js'])
    .exit(0)
    .it('File path not passed', ctx => {
      expect(ctx.stdout).to.contain('File path not passed')
    })

  test
    .stdout()
    .command(['minify', 'test/resources/test.txt'])
    .exit(0)
    .it('Invalid File Type', ctx => {
      expect(ctx.stdout).to.contain('Invalid File Type')
    })
})
