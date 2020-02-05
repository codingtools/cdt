import {expect, test} from '@oclif/test'

// TODO: add test for invalid package
// test for valid with matching
describe('avro', () => {
  //todo if file is invalid
  test
    .timeout(10000) // added timeout to remove timeout problem
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

  /* not able to write test, as we are not getting exit(0), as we are not able to catch error using try-catch */
  // test
  //   .stdout()
  //   .command(['avro', '-f' ,'test/resources/avro/file_not_exists.avro', '-o', 'output_file.example', 'get_schema'])
  //   .exit(0)
  //   .it('if input file path is invalid', ctx => {
  //     expect(ctx.stdout).to.contain('no such file or directory, open \'test/resources/avro/file_not_exists.avro\'')
  //   })

  test
    .stdout()
    .command(['avro', '-f' ,'test/resources/avro/person.avro', '-o', 'output_file.example', 'to_avro'])
    .exit(0)
    .it('if schema file path is not passed for to_avro', ctx => {
      expect(ctx.stdout).to.contain('Schema file is not provided')
    })

  // positive cases
  // 1 - get schema
  // 2 - to json
  // 3 - to avro
})
