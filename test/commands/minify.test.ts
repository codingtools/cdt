import {expect, test} from '@oclif/test'

describe('minify', () => {
  test
    .timeout(20000) // added timeout to resolve timeout problem
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

  test
    .stdout()
    .command(['minify', '-f', 'test/resources/test.html'])
    .it('Minify HTML', ctx => {
      expect(ctx.stdout).to.contain('<title>TEST</title><h1>heading</h1><p>lorem ipsum 1<p>lorem ipsum 2<p>lorem ipsum 3')
    })

  test
    .stdout()
    .command(['minify', '-f', 'test/resources/test.css'])
    .it('Minify CSS', ctx => {
      expect(ctx.stdout).to.contain('body{margin:25px;background-color:#f0f0f0;font-family:arial,sans-serif;font-size:14px}h1{font-size:35px;font-weight:400;margin-top:5px}.someclass{color:red}#someid{color:green}')
    })

  test
    .stdout()
    .command(['minify', '-f', 'test/resources/test.css', '--output', 'test/resources/output/ouput.css'])
    .it('Minify CSS, output to a file', ctx => {
      expect(ctx.stdout).to.contain('✔  success   output written to file')
    })
})
