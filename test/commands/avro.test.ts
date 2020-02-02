import {expect, test} from '@oclif/test'

// TODO: add test for invalid package
// test for valid with matching
describe('avro', () => {
  //todo if file is invalid
  test
    .stdout()
    .command(['avro'])
    .exit(0)
    .it('if input is not  passed', ctx => {
      expect(ctx.stdout).to.contain('Input file is not provided')
    })
  test
    .stdout()
    .command(['avro', '-f' ,'test/resources/avro/person.avro'])
    .exit(0)
    .it('if output is not passed', ctx => {
      expect(ctx.stdout).to.contain('Output file is not provided')
    })

  test
    .stdout()
    .command(['avro', '-f' ,'test/resources/avro/person.avro', '-o', 'output_file.example'])
    .exit(0)
    .it('if command not passed', ctx => {
      expect(ctx.stdout).to.contain('Command is empty or not provided')
    })

  test
    .stdout()
    .command(['avro', '-f' ,'test/resources/avro/person.avro', '-o', 'output_file.example', 'unsupported_command'])
    .exit(0)
    .it('if command is invalid', ctx => {
      expect(ctx.stdout).to.contain('Unsupported Command')
    })

  test
    .stdout()
    .command(['avro', '-f' ,'test/resources/avro/file_not_exists.avro', '-o', 'output_file.example', 'get_schema'])
    .exit(0)
    .it('if input file path is invalid', ctx => {
      expect(ctx.stdout).to.contain('Unsupported Command')
    })

  test
    .stdout()
    .command(['avro', '-f' ,'test/resources/avro/.avro', '-t' ,'test/resources/avro/schema.avsc', '-o', 'output_file.example', 'get_schema'])
    .exit(0)
    .it('if schema file path is not passed', ctx => {
      expect(ctx.stdout).to.contain('Unsupported Command')
    })
})
