import {expect, test} from '@oclif/test'

describe('hash', () => {
  test
    .stdout()
    .command(['hash', 'ashish'])
    .it("Check default type -> cdt hash 'ashish'", ctx => {
      expect(ctx.stdout).to.contain('428b6da53085b8fd7b37e9fb259c0c609bd09984')
    })

  //invalid type
  test
    .stdout()
    .command(['hash', '-t', 'invalid', 'ashish'])
    .exit(0)
    .it("Invalid type -> cdt hash -t invalid 'ashish'", ctx => {
      expect(ctx.stdout).to.contain('Invalid Or Unsupported hash type')
    })

  //empty string
  test
    .stdout()
    .command(['hash', '-t', 'md5'])
    .exit(0)
    .it("Empty Input String -> cdt hash -t md5", ctx => {
      expect(ctx.stdout).to.contain('Input string is empty or undefined')
    })


  // passing sha1 as option
  test
    .stdout()
    .command(['hash', 'ashish' , '-t', 'sha1'])
    .it("Passing Default type:sha -> cdt hash 'ashish' -t 'sha1'", ctx => {
      expect(ctx.stdout).to.contain('428b6da53085b8fd7b37e9fb259c0c609bd09984')
    })

  //overriding string with option -s
  test
    .stdout()
    .command(['hash', '-s', 'ashish'])
    .it("Passing string with -s flag -> cdt hash -s 'ashish'", ctx => {
      expect(ctx.stdout).to.contain('428b6da53085b8fd7b37e9fb259c0c609bd09984')
    })

  // if both passed then need to take flag value of -s
  test
    .stdout()
    .command(['hash', 'patel', '-s', 'ashish'])
    .it("Overriding argument string with -s flag -> cdt hash 'patel' -s 'ashish'", ctx => {
      expect(ctx.stdout).to.contain('428b6da53085b8fd7b37e9fb259c0c609bd09984')
    })

  //sha256
  test
    .stdout()
    .command(['hash', '-t', 'sha256', 'ashish'])
    .it("Hash Sha256 -> cdt hash -t sha256 'ashish'", ctx => {
      expect(ctx.stdout).to.contain('05d08de271d2773a504b3a30f98df26cccda55689a8dc3514f55d3f247553d2b')
    })

  //md5
  test
    .stdout()
    .command(['hash', '--type', 'md5', 'ashish'])
    .it("Hash Md5 -> cdt hash --type md5 'ashish'", ctx => {
      expect(ctx.stdout).to.contain('7b69ad8a8999d4ca7c42b8a729fb0ffd')
    })

  //sha512
  test
    .stdout()
    .command(['hash', '--type', 'sha512', 'ashish'])
    .it("Hash Sha512 -> cdt hash --type sha512 'ashish'", ctx => {
      expect(ctx.stdout).to.contain('2e076fcbd0e5dcb29d30da42a554de919864bbc29eaefe6d32c4f6bcb219d77ce5e48dada485dae92c918b10a03f42008c43ca721f06da6efa5fa9a223401907')
    })

  //rmd160
  test
    .stdout()
    .command(['hash', '--type', 'rmd160', 'ashish'])
    .it("Hash rmd160 -> cdt hash --type rmd160 'ashish'", ctx => {
      expect(ctx.stdout).to.contain('a85a72b0a240abecdf27f127aa75fd8663d6d5be')
    })

  //file input - file not found TODO: solve issue #4
  test
    .stdout()
    .command(['hash', '-f', 'test/resources/filenotfound.txt'])
    .exit(0)
    .it("cdt hash -f 'test/resources/filenotfound.txt'", ctx => {
      expect(ctx.stdout).to.contain('Could not find file')
    })

  //file input
  test
    .stdout()
    .command(['hash', '-f', 'test/resources/test.txt'])
    .it("cdt hash -f 'test/resources/test.txt'", ctx => {
      expect(ctx.stdout).to.contain('97ee6255ffc855e79e2324d5495b6538e29034f9')
    })

})
