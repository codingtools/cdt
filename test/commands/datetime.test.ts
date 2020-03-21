import {expect, test} from '@oclif/test'
import * as moment from 'moment-timezone' //has both momentjs and timezone support

describe('datetime', () => {
  test
    .stdout()
    .command(['datetime', '2019-07-01 00:00:00'])
    .it('If locale is not given, default - en', ctx => {
      expect(ctx.stdout).to.contain(`1st July 2019, 12:0:0 AM, ${moment('01-Jul-2019').format('Z')} UTC`)
    })

  test
    .stdout()
    .command(['datetime', '2019-07-01 00:00:00', '-l', 'fr'])
    .it('If locale is given for french', ctx => {
      expect(ctx.stdout).to.contain(`1er juillet 2019, 12:0:0 AM, ${moment('01-Jul-2019').format('Z')} UTC`)
    })


  // test for hindi commented because of Timezone runtime
  // test
  //   .stdout()
  //   .command(['datetime', '2019-07-01 00:00:00', '-l', 'hi'])
  //   .it('If locale is given for hindi', ctx => {
  //     expect(ctx.stdout).to.contain('१ जुलाई २०१९, १२:०:० रात, +०५:३० UTC')
  //   })

  test
    .stdout()
    .command(['datetime', 'not a real date'])
    .exit(0)
    .it('Invalid Datetime or Datetime format with args', ctx => {
      expect(ctx.stdout).to.contain('Invalid Date String Passed')
    })

  test
    .stdout()
    .command(['datetime', '-d', 'not a real date'])
    .exit(0)
    .it('Invalid Datetime or Datetime format with flags', ctx => {
      expect(ctx.stdout).to.contain('Invalid Date String Passed')
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

})
