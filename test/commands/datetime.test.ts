import {expect, test} from '@oclif/test'

describe('datetime', () => {
  test
    .stdout()
    .command(['datetime', '01-Jul-2019'])
    .it('If locale is not given, default - en', ctx => {
      expect(ctx.stdout).to.contain('1st July 2019, 12:0:0 AM, +05:30 UTC')
    })

  test
    .stdout()
    .command(['datetime', '01-Jul-2019', '-l', 'fr'])
    .it('If locale is given for french', ctx => {
      expect(ctx.stdout).to.contain('1er juillet 2019, 12:0:0 AM, +05:30 UTC')
    })

  test
    .stdout()
    .command(['datetime', '01-Jul-2019', '-l', 'hi'])
    .it('If locale is given for hindi', ctx => {
      expect(ctx.stdout).to.contain('१ जुलाई २०१९, १२:०:० रात, +०५:३० UTC')
    })

  test
    .stdout()
    .command(['datetime', 'not a real date'])
    .exit(0)
    .it('Invalid Datetime or Datetime format with args', ctx => {
      expect(ctx.stdout).to.contain('Invalid Datetime or Datetime format')
    })

  test
    .stdout()
    .command(['datetime', '20190501', '-f', 'DD-MM-YYYY'])
    .it('Format Date with a valid Format', ctx => {
      expect(ctx.stdout).to.contain('01-05-2019')
    })

  test
    .stdout()
    .command(['datetime', '201901d'])
    .exit(0)
    .it('Invalid Date passed', ctx => {
      expect(ctx.stdout).to.contain('Invalid Date String Passed')
    })

  test
    .stdout()
    .command(['datetime', '-d', 'not a real date'])
    .exit(0)
    .it('Invalid Datetime or Datetime format with flags', ctx => {
      expect(ctx.stdout).to.contain('Invalid Datetime or Datetime format')
    })
})
