import {expect, test} from '@oclif/test'

// TODO: add test for invalid package
// test for valid with matching
describe('avro', () => {
  test
    .stdout()
    .command(['avro'])
    .exit(0)
    .it('if nothing passed', ctx => {
      expect(ctx.stdout).to.contain('Input is empty or not provided')
    })

  test
    .stdout()
    .command(['avro', '-f' ,'test/resources/avro/test-tabular.avro'])
    .exit(0)
    .it('if command not passed', ctx => {
      expect(ctx.stdout).to.contain('command is empty or not provided')
    })
})
