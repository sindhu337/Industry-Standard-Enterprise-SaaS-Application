import fs from 'fs'
import path from 'path'
import { parse } from '@babel/parser'
import generateModule from '@babel/generator'

const generate = generateModule.default || generateModule
const ROOT = path.resolve(process.cwd(), 'src')
const exts = ['.js', '.jsx']

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') continue
      walk(fullPath)
      continue
    }
    if (!exts.includes(path.extname(entry.name))) continue
    stripComments(fullPath)
  }
}

function stripComments(filePath) {
  const source = fs.readFileSync(filePath, 'utf8')
  if (!source.match(/\/\/|\/\*|\*\//)) return

  let ast
  try {
    ast = parse(source, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'classProperties',
        'classPrivateProperties',
        'classPrivateMethods',
        'decorators-legacy',
        'dynamicImport',
        'optionalChaining',
        'nullishCoalescingOperator',
        'objectRestSpread',
        'topLevelAwait',
      ],
      attachComment: true,
      tokens: true,
    })
  } catch (err) {
    console.error(`Failed to parse ${filePath}: ${err.message}`)
    return
  }

  const output = generate(ast, { comments: false, retainLines: true }, source)
  fs.writeFileSync(filePath, output.code)
  console.log(`Stripped comments from ${path.relative(process.cwd(), filePath)}`)
}

walk(ROOT)
