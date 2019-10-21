import {expect, test} from '@oclif/test'

describe('hash', () => {
  test
    .stdout()
    .command(['hash', 'ashish'])
    .it("cdt hash 'ashish'", ctx => {
      expect(ctx.stdout).to.contain('428b6da53085b8fd7b37e9fb259c0c609bd09984')
    })

  // passing sha1 as option
  test
    .stdout()
    .command(['hash', 'ashish' ,'-t','sha1'])
    .it("cdt hash 'ashish' -t 'sha1'", ctx => {
      expect(ctx.stdout).to.contain('428b6da53085b8fd7b37e9fb259c0c609bd09984')
    })

  //overriding string with option -s
  test
    .stdout()
    .command(['hash', '-s', 'ashish'])
    .it("cdt hash -s 'ashish'", ctx => {
      expect(ctx.stdout).to.contain('428b6da53085b8fd7b37e9fb259c0c609bd09984')
    })

  // if both passed then need to take flag value of -s
  test
    .stdout()
    .command(['hash', 'patel', '-s', 'ashish'])
    .it("cdt hash 'patel' -s 'ashish'", ctx => {
      expect(ctx.stdout).to.contain('428b6da53085b8fd7b37e9fb259c0c609bd09984')
    })

  //sha256
  test
    .stdout()
    .command(['hash', '-t', 'sha256', 'ashish'])
    .it("cdt hash -t sha256 'ashish'", ctx => {
      expect(ctx.stdout).to.contain('05d08de271d2773a504b3a30f98df26cccda55689a8dc3514f55d3f247553d2b')
    })

  //md5
  test
    .stdout()
    .command(['hash', '--type', 'md5', 'ashish'])
    .it("cdt hash --type md5 'ashish'", ctx => {
      expect(ctx.stdout).to.contain('7b69ad8a8999d4ca7c42b8a729fb0ffd')
    })

  //sha512
  test
    .stdout()
    .command(['hash', '--type', 'sha512', 'ashish'])
    .it("cdt hash --type sha512 'ashish'", ctx => {
      expect(ctx.stdout).to.contain('2e076fcbd0e5dcb29d30da42a554de919864bbc29eaefe6d32c4f6bcb219d77ce5e48dada485dae92c918b10a03f42008c43ca721f06da6efa5fa9a223401907')
    })

  //rmd160
  test
    .stdout()
    .command(['hash', '--type', 'rmd160', 'ashish'])
    .it("cdt hash --type rmd160 'ashish'", ctx => {
      expect(ctx.stdout).to.contain('a85a72b0a240abecdf27f127aa75fd8663d6d5be')
    })
})
