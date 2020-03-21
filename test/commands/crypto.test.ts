import {expect, test} from '@oclif/test'
import Crypto from '../../src/commands/crypto'

describe('crypto', () => {

  test
    .stdout()
    .command(['crypto', '-d', 'aes', 'U2FsdGVkX1/OLQ6Lp+V3O1d5SaxEf9pAf8CV7ErBC9o=', '-k', 'Secret Passphrase'])
    .it('AES Decryption string passed as string argument', ctx => {
      expect(ctx.stdout).to.contain('Message')
    })

  test
    .stdout()
    .command(['crypto', '-d', 'aes', '-s', 'U2FsdGVkX1/OLQ6Lp+V3O1d5SaxEf9pAf8CV7ErBC9o=', '-k', 'Secret Passphrase'])
    .it('AES Decryption string passed as flag', ctx => {
      expect(ctx.stdout).to.contain('Message')
    })

  test
    .stdout()
    .command(['crypto', '-d', 'des', '-s', 'U2FsdGVkX180d+J1kUcxGL9bbBAErXAw', '-k', 'Secret Passphrase'])
    .it('DES Decryption', ctx => {
      expect(ctx.stdout).to.contain('Message')
    })

  test
    .stdout()
    .command(['crypto', '-d', 'des', '-s', 'U2FsdGVkX186YglxZ7yF7aqTjFQA3Yzs', '-k', 'Secret Passphrase', '-m', 'ECB'])
    .it('DES Decryption with Mode ECB', ctx => {
      expect(ctx.stdout).to.contain('Message')
    })

  test
    .stdout()
    .command(['crypto', '-d', '3des', '-s', 'U2FsdGVkX1+2jkjCxuWwL8uMgdu6SXJc', '-k', 'Secret Passphrase'])
    .it('3DES Decryption', ctx => {
      expect(ctx.stdout).to.contain('Message')
    })

  test
    .stdout()
    .command(['crypto', '-d', 'RABBIT', '-s', 'U2FsdGVkX185oOsUqvpF+7x0zPUxNJw=', '-k', 'Secret Passphrase'])
    .it('RABBIT Decryption', ctx => {
      expect(ctx.stdout).to.contain('Message')
    })

  test
    .stdout()
    .command(['crypto', '-d', 'RC4', '-s', 'U2FsdGVkX1+/oErpaqQQk1Fj2eXwL1o=', '-k', 'Secret Passphrase'])
    .it('RC4 Decryption', ctx => {
      expect(ctx.stdout).to.contain('Message')
    })

  test
    .stdout()
    .command(['crypto', '-d', 'RC4DROP', '-s', 'U2FsdGVkX18+D1WNQ64XzaCwkUM6moE=', '-k', 'Secret Passphrase'])
    .it('RC4Drop Decryption', ctx => {
      expect(ctx.stdout).to.contain('Message')
    })

  test
    .stdout()
    .command(['crypto', '-e', 'aes', '-k', 'Secret Passphrase', 'Message', '-m', 'INVALID'])
    .exit(0)
    .it('Invalid or Unsupported Block Mode', ctx => {
      expect(ctx.stdout).to.contain('Invalid or Unsupported Block Mode')
    })

  test
    .stdout()
    .command(['crypto', '-e', 'aes', '-k', 'Secret Passphrase'])
    .exit(0)
    .it('Input string is empty or undefined', ctx => {
      expect(ctx.stdout).to.contain('Input string is empty or undefined')
    })

  test
    .stdout()
    .command(['crypto', '-e', 'aes', '-s', 'Message'])
    .exit(0)
    .it('if key not passed', ctx => {
      expect(ctx.stdout).to.contain('Key is not passed')
    })

  test
    .stdout()
    .command(['crypto', '-e', 'aes', '-d', 'aes', '-s', 'Message', '-k', 'Secret Passphrase'])
    .exit(0)
    .it('Both encryption and decryption methods passed', ctx => {
      expect(ctx.stdout).to.contain('Both encryption and decryption methods passed')
    })

  test
    .stdout()
    .command(['crypto', '-s', 'Message', '-k', 'Secret Passphrase'])
    .exit(0)
    .it('Neither encryption nor decryption method passed', ctx => {
      expect(ctx.stdout).to.contain('Neither encryption or decryption methods passed')
    })


  test
    .stdout()
    .it('AES encryption and decryption Integration Test', async(ctx) => {
      let encrypt =  await Crypto.run(['crypto', '-e', 'aes', '-s', 'Message', '-k', 'secret']);
      let decrypt = await Crypto.run(['crypto', '-d', 'aes', '-s', encrypt, '-k', 'secret']);
      expect(decrypt).to.contain('Message');
    });

  test
    .stdout()
    .it('DES encryption and decryption Integration Test', async(ctx) => {
      let encrypt =  await Crypto.run(['crypto', '-e', 'DES', '-s', 'Message', '-k', 'secret']);
      let decrypt = await Crypto.run(['crypto', '-d', 'DES', '-s', encrypt, '-k', 'secret']);
      expect(decrypt).to.contain('Message');
    });

  test
    .stdout()
    .it('3DES encryption and decryption Integration Test', async(ctx) => {
      let encrypt =  await Crypto.run(['crypto', '-e', '3DES', '-s', 'Message', '-k', 'secret']);
      let decrypt = await Crypto.run(['crypto', '-d', '3DES', '-s', encrypt, '-k', 'secret']);
      expect(decrypt).to.contain('Message');
    });

  test
    .stdout()
    .it('Rabbit encryption and decryption Integration Test', async(ctx) => {
      let encrypt =  await Crypto.run(['crypto', '-e', 'Rabbit', '-s', 'Message', '-k', 'secret']);
      let decrypt = await Crypto.run(['crypto', '-d', 'Rabbit', '-s', encrypt, '-k', 'secret']);
      expect(decrypt).to.contain('Message');
    });

  test
    .stdout()
    .it('RC4 encryption and decryption Integration Test', async(ctx) => {
      let encrypt =  await Crypto.run(['crypto', '-e', 'RC4', '-s', 'Message', '-k', 'secret']);
      let decrypt = await Crypto.run(['crypto', '-d', 'RC4', '-s', encrypt, '-k', 'secret']);
      expect(decrypt).to.contain('Message');
    });

  test
    .stdout()
    .it('RC4Drop encryption and decryption Integration Test', async(ctx) => {
      let encrypt =  await Crypto.run(['crypto', '-e', 'RC4Drop', '-s', 'Message', '-k', 'secret']);
      let decrypt = await Crypto.run(['crypto', '-d', 'RC4Drop', '-s', encrypt, '-k', 'secret']);
      expect(decrypt).to.contain('Message');
    });

})
