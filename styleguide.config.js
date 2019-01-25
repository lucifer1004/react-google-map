module.exports = {
  sections: [
    {
      name: 'UI Components',
      // content: 'docs/ui.md',
      components: 'src/lib/components/*.tsx',
      exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
      usageMode: 'expand', // 'hide' | 'collapse' | 'expand'
    },
  ],
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: require('react-scripts/config/webpack.config'),
}
