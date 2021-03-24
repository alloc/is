const alloc_is = '@alloc/is'

/** @type {import('nebu').Plugin} */
const plugin = {
  ImportDeclaration(decl, state) {
    const source = decl.source.value
    if (source == alloc_is) {
      state[alloc_is] = {
        importDecl: decl,
        usedExports: new Set(),
      }
    }
  },
  MemberExpression(expr, state) {
    const { object, property } = expr
    if (
      object.isIdentifier() &&
      object.name == 'is' &&
      property.isIdentifier()
    ) {
      expr.replace(renameExport(property.name))
      state[alloc_is].usedExports.add(property.name)
    }
  },
  Program(prog, state) {
    prog.yield(() => {
      const { importDecl, usedExports } = state[alloc_is] || {}
      const namedImports = Array.from(usedExports, renameExport).join(', ')
      importDecl.replace(`import { ${namedImports} } from '${alloc_is}'`)
    })
  },
}

module.exports = plugin

function renameExport(name) {
  return 'is' + name[0].toUpperCase() + name.slice(1)
}
