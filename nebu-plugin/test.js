const { test } = require('uvu')
const { nebu } = require('nebu')
const assert = require('uvu/assert')
const fs = require('fs')

test('transform importer', () => {
  const input = `
    import { is } from '@alloc/is'
    is.array(1)
  `
  const output = nebu.process(input, {
    plugins: [require('./importer')],
  })

  assert.match(output.js, 'import { isArray }')
  assert.match(output.js, 'isArray(1)')
})

test.run()
