import {expect, test} from '@oclif/test'

describe('view', () => {
  test
    .stdout()
    .command(['view'])
    .exit(0)
    .it('File path not passed', ctx => {
      expect(ctx.stdout).to.contain('File path not passed')
    })

  test
    .stdout()
    .command(['view', 'test/resources/csv/test_view.csv'])
    .it('check 10 lines are found', ctx => {
      expect(ctx.stdout).to.contain('|1       |2     |1  |14.0             |30.0708|1           |0        |')
    })
  test
    .stdout()
    .command(['view', 'test/resources/csv/test_view.csv', '-n', '5'])
    .it('check 5th line is found', ctx => {
      expect(ctx.stdout).to.contain('|0       |3     |0  |35.0|8.05   |0           |0        |')
    })

  test
    .stdout()
    .command(['view', 'test/resources/csv/test_view.csv', '-n', '900'])
    .it('check if the given number is greater than total lines', ctx => {
      expect(ctx.stdout).to.contain('|0       |3     |0  |32.0             |7.75    |0           |0        |')
    })

  test
    .stdout()
    .command(['view', 'test/resources/csv/test_view.csv', '-n', '900'])
    .it('check if 900 count is used, it shows only total present rows', ctx => {
      expect(ctx.stdout).to.contain('showing top 892 rows.')
    })

  test
    .stdout()
    .command(['view', 'test/resources/csv/test_view.csv', '-n', '0'])
    .it('check if the given number is invalid then show default 10 lines', ctx => {
      expect(ctx.stdout).to.contain('|1       |2     |1  |14.0             |30.0708|1           |0        |')
    })
})
