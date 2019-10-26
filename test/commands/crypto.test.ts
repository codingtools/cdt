import {expect, test} from '@oclif/test'

describe('crypto', () => {
  test
    .stdout()
    .command(['crypto', '-e', 'aes', '-s', 'Message', '-k', 'Secret Passphrase'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('73e54154a15d1beeb509d9e12f1e462a0')
    })

 //values passed as string argument
  test
    .stdout()
    .command(['crypto', '-e', 'aes', 'Message', '-k', 'Secret Passphrase'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('73e54154a15d1beeb509d9e12f1e462a0')
    })

})
