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
    .it('Empty Input String -> cdt hash -t md5', ctx => {
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

  //file input
  test
    .stdout()
    .command(['hash', '-f', 'test/resources/test.txt'])
    .it("File Hashing -> cdt hash -f 'test/resources/test.txt'", ctx => {
      expect(ctx.stdout).to.contain('d246b69fd991a1256f9e00f6914c8bd2d52b432e')
    })

  //Big file input
  test
    .stdout()
    .command(['hash', '-t', 'sha512', '-f', 'test/resources/react.js']) //75KB
    .it("File Hashing -> cdt hash -f 'test/resources/react.js' -t 'sha512'", ctx => {
      expect(ctx.stdout).to.contain('74886dc316093bad0732f29dba9117cff013ad4488c6fa15bae44b9d0cbb2e5e9e12a3af1a112f3027629a9224b324ba882e4d0c1286f9d5d0ded1d44ebb65cb')
    })

  //file input sha512
  test
    .stdout()
    .command(['hash', '-f', 'test/resources/test.txt', '-t', 'sha512'])
    .it("File Hashing -> cdt hash -t sha512 -f 'test/resources/test.txt'", ctx => {
      expect(ctx.stdout).to.contain('4493b97b4a0d21fc561070c48d4a62a9bfbeb78c5d9b3c59abf6d41f70da2e9bd45af63d8c62812cf41e50e352ec41b4f407f71d5778b575c503b70081e7a151')
    })

  test
    .stdout()
    .command(['hash', '-f', 'test/resources/test.txt', '-t', 'sha512', '--output', 'test/resources/output/out.txt'])
    .it("File Hashing, output to a file", ctx => {
      expect(ctx.stdout).to.contain('✔  success   output written to file')
    })

  //file input - file not found
  test
    .stdout()
    .command(['hash', '-f', 'test/resources/filenotfound.txt'])
    .exit(0)
    .it("If File not found ->cdt hash -f 'test/resources/filenotfound.txt'", ctx => {
      expect(ctx.stdout).to.contain('Could not find file')
    })

  // TODO: fix this issue
  // //installer file - checksum check sha1
  // test
  //   .stdout()
  //   .command(['hash', '-t', 'sha1', '-f', 'test/resources/apache-maven-3.6.3-src.tar.gz'])
  //   .it('Installer checksum validation', ctx => {
  //     expect(ctx.stdout).to.contain('ccf441f3bf7f477301ebc80742cbda1da73c30a2')
  //   })

  // //installer file - checksum check sha512
  // test
  //   .stdout()
  //   .command(['hash', '-t', 'sha512', '-f', 'test/resources/apache-maven-3.6.3-src.tar.gz'])
  //   .it('Installer checksum validation', ctx => {
  //     expect(ctx.stdout).to.contain('14eef64ad13c1f689f2ab0d2b2b66c9273bf336e557d81d5c22ddb001c47cf51f03bb1465d6059ce9fdc2e43180ceb0638ce914af1f53af9c2398f5d429f114c')
  //   })

})
