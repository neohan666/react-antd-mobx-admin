module.exports = {
  extends: 'stylelint-config-standard',
  overrides: [{
    'files': ['**/*.less'],
    'customSyntax': 'postcss-less'
  }],
  rules: {
    'rule-empty-line-before': null,
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'color-hex-case': null,
    'no-empty-source': null,
    'block-no-empty': null,
    'selector-pseudo-class-no-unknown': [true,
      { 'ignorePseudoClasses': ['global'] }
    ],
    'string-quotes': null,
    'selector-class-pattern': null,
    'value-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'color-function-notation': null,
    'alpha-value-notation': null
  },
  ignoreFiles: [
    'node_modules/**/*',
    'public/**/*',
    'dist/**/*',
    'build/**/*',
    '**/*.js',
    '**/*.jsx',
    '**/*.ts',
    '**/*.tsx'
  ]
}
