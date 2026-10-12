import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'

const distDir = resolve(import.meta.dirname, '..', 'dist')
const repoUrl = 'https://github.com/avichal15/avichal15.github.io.git'

function runGit(args) {
  execFileSync('git', args, { cwd: distDir, stdio: 'inherit' })
}

runGit(['init'])
runGit(['checkout', '-B', 'gh-pages'])
runGit(['config', 'user.name', 'Avichal15'])
runGit(['config', 'user.email', 'avichalgoyal15@gmail.com'])
runGit(['add', '-A'])
runGit(['commit', '-m', 'chore(deploy): publish production bundle for avichalgoyal.me'])
runGit(['push', '-f', repoUrl, 'gh-pages:gh-pages'])
