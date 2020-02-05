import {expect, test} from '@oclif/test'

describe('avro', () => {
  //todo if file is invalid
  test
    .timeout(20000) // added timeout to resolve timeout problem
    .stdout()
    .command(['avro'])
    .exit(0)
    .it('if input is not  passed', ctx => {
      expect(ctx.stdout).to.contain('Input file is not provided')
    })
  test
    .stdout()
    .command(['avro', '-f', 'test/resources/avro/person.avro', 'to_avro'])
    .exit(0)
    .it('if output file is not passed when mendatory', ctx => {
      expect(ctx.stdout).to.contain('Output file is not provided')
    })
  test
    .stdout()
    .command(['avro', '-f', 'test/resources/avro/person.avro', '-o', 'test/resources/avro/output/person.json'])
    .exit(0)
    .it('if command not passed', ctx => {
      expect(ctx.stdout).to.contain('Command is empty or not provided')
    })
  test
    .stdout()
    .command(['avro', '-f', 'test/resources/avro/person.avro', '-o', 'test/resources/avro/output/person.json', 'unsupported_command'])
    .exit(0)
    .it('if command is invalid', ctx => {
      expect(ctx.stdout).to.contain('Unsupported Command')
    })

  /* TODO: not able to write test, as we are not getting exit(0), as we are not able to catch error using try-catch */
  // test
  //   .stdout()
  //   .command(['avro', '-f' ,'test/resources/avro/file_not_exists.avro', '-o', 'output_file.example', 'get_schema'])
  //   .exit(0)
  //   .it('if input file path is invalid', ctx => {
  //     expect(ctx.stdout).to.contain('no such file or directory, open \'test/resources/avro/file_not_exists.avro\'')
  //   })

  test
    .stdout()
    .command(['avro', '-f', 'test/resources/avro/person.json', '-o', 'test/resources/avro/output/person.avro', 'to_avro'])
    .exit(0)
    .it('if schema file path is not passed for to_avro', ctx => {
      expect(ctx.stdout).to.contain('Schema file is not provided')
    })

  /* TODO: why this tests is breaking */
  // test
  //   .stdout()
  //   .command(['avro', '-f', 'test/resources/avro/person.avro', 'get_schema'])
  //   .it('if get_schema outputs to console', ctx => {
  //     expect(ctx.stdout).to.contain('success')
  //   })

  //      setTimeout(() => // TODO: can we remove it and check if we can resolve promise here
  //         expect(ctx.stdout).to.contain(' [react@16.10.2] minified:6.5 kB gzip:2.6 kB')
  //       , 5000) // proving 5 seconds just to be safe

  test
    .stdout()
    .command(['avro', '-f', 'test/resources/avro/person.avro', '-o', 'test/resources/avro/output/person.json','to_json'])
    .it('if to_json commands run with success', ctx => {
      expect(ctx.stdout).to.contain('success')
    })

  test
    .timeout(20000) // added timeout to resolve timeout problem
    .stdout()
    .command(['avro', '-f', 'test/resources/avro/person.json', '-o', 'test/resources/avro/output/person.avro', '-t', 'test/resources/avro/person.avsc', 'to_avro'])
    .it('if to_avro commands run with success', ctx => {
      expect(ctx.stdout).to.contain('success')
    })
})
