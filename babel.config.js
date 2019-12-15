module.exports = {
  presets: [
    '@babel/typescript',
    [
      '@babel/env',
      {
        exclude: [
          'transform-async-to-generator',
          'transform-classes',
          'transform-regenerator',
        ],
      },
    ],
  ],
}
