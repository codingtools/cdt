import {expect, test} from '@oclif/test'

describe('bundlephobia', () => {
  test
    .stdout()
    .command(['bundlephobia'])
    .exit(0)
    .it('if no package passed', ctx => {
      expect(ctx.stdout).to.contain('At least one package must be passed')
    })

  test
    .stdout()
    .command(['bundlephobia', 'react@16.10.2'])
    .it('if package passed with argument', ctx => {
      setTimeout(() => // TODO: can we remove it and check if we can resolve promise here
        expect(ctx.stdout).to.contain(' [react@16.10.2] minified:6.5 kB gzip:2.6 kB')
      , 5000) // proving 5 seconds just to be safe
    })

  test
    .stdout()
    .command(['bundlephobia', '-p', 'react@16.10.2'])
    .it('if package passed with flag', ctx => {
      setTimeout(() => // TODO: can we remove it and check if we can resolve promise here
      expect(ctx.stdout).to.contain(' [react@16.10.2] minified:6.5 kB gzip:2.6 kB')
      , 5000)
    })
})
