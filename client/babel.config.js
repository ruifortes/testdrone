module.exports = {
  comments: false,
  presets: [
    ['@babel/env', {
      loose: true,
      modules: false,
    }],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-syntax-import-meta',
    ['@babel/proposal-class-properties', { loose: true }],
    ['@babel/proposal-object-rest-spread', { useBuiltIns: true, loose: true }]
  ]
}