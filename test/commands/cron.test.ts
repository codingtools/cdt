import {expect, test} from '@oclif/test'

describe('cron', () => {
  test
    .stdout()
    .command(['cron'])
    .exit(0)
    .it('Nothing is passed', ctx => {
      expect(ctx.stdout).to.contain('Invalid Or Unsupported action')
    })
  test
    .stdout()
    .command(['cron', '-d', '* * * x *'])
    .exit(0)
    .it('Invalid Cron Expression', ctx => {
      expect(ctx.stdout).to.contain('Invalid Cron expression')
    })

  test
    .stdout()
    .command(['cron', '-d', '15 14 1 * *'])
    .it('Describe cron with arg for input', ctx => {
      expect(ctx.stdout).to.contain('At 02:15 PM, on day 1 of the month')
    })

  test
    .stdout()
    .command(['cron', '-d', '-s', '0 22 * * 1-5'])
    .it('Describe cron with -s flag for input', ctx => {
      expect(ctx.stdout).to.contain('At 10:00 PM, Monday through Friday')
    })

  test
    .stdout()
    .command(['cron', '-d', '-s', '10 * * * * *'])
    .it('Seconds functionality Enabled', ctx => {
      expect(ctx.stdout).to.contain('At 10 seconds past the minute')
    })

 test
    .stdout()
    .command(['cron', '-d', '-s', '0 22 * * 1-5'])
    .it('Range functionality enabled', ctx => {
      expect(ctx.stdout).to.contain('At 10:00 PM, Monday through Friday')
    })

 test
    .stdout()
    .command(['cron', '-d', '-s', '0 0 12 1/2 * ? 2020'])
    .it('Year functionality enabled', ctx => {
      expect(ctx.stdout).to.contain('At 12:00 PM, every 2 days, only in 2020')
    })

 test
    .stdout()
    .command(['cron', '-d', '-s', '0 0 12 1/2 mon,tue'])
    .it('Days functionality enabled', ctx => {
      expect(ctx.stdout).to.contain('At 12:00 AM, on day 12 of the month, and on Monday and Tuesday, every 2 months')
    })

})
