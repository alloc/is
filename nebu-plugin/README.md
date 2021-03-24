# nebu-plugin-alloc__is

This package provides two plugins:
- **self:** Transforms `dist/is.mjs` to use named exports instead of `export { is }`
- **importer:** Transforms `@alloc/is` imports to use `import * as is`

When combined, these plugins provide tree-shaking for `@alloc/is`. Voilà!
