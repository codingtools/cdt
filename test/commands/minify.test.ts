import {expect, test} from '@oclif/test'

describe('minify', () => {
  test
    .stdout()
    .command(['minify', '-t', 'js'])
    .exit(0)
    .it('File path not passed', ctx => {
      expect(ctx.stdout).to.contain('File path not passed')
    })

  test
    .stdout()
    .command(['minify', 'test/resources/test.txt'])
    .exit(0)
    .it('Invalid File Type', ctx => {
      expect(ctx.stdout).to.contain('Invalid File Type')
    })

  test
    .stdout()
    .command(['minify', 'test/resources/test.js'])
    .it('Minify Js', ctx => {
      expect(ctx.stdout).to.contain('console.log("lorem ipsum");let x=10;x<10?console.log("x is less than: "+x):x>10?console.log("x is more than: "+x):console.log("x is equals to: "+x);')
    })

  // using flag -f
  test
    .stdout()
    .command(['minify', '-f', 'test/resources/test.js'])
    .it('Minify Js with Flag', ctx => {
      expect(ctx.stdout).to.contain('console.log("lorem ipsum");let x=10;x<10?console.log("x is less than: "+x):x>10?console.log("x is more than: "+x):console.log("x is equals to: "+x);')
    })

})
