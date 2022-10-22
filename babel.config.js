const { BABEL_ENV } = process.env;

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: BABEL_ENV === 'cjs' ? 'commonjs' : false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  ignore: ['__mocks__'],
  plugins: [
    'babel-plugin-lodash',
    'babel-plugin-styled-components',
    'babel-plugin-react-docgen',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-json-strings',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-logical-assignment-operators',
    '@babel/plugin-proposal-optional-chaining',
    [
      '@babel/plugin-proposal-pipeline-operator',
      {
        proposal: 'minimal',
      },
    ],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-transform-runtime',
    'dev-expression',
    'inline-json-import',
    'inline-react-svg',
    [
      'import-redirect',
      BABEL_ENV === 'cjs'
        ? {
            redirect: {
              '@carbon/react/es/(.*)': '@carbon/react/lib/$1',
              'recharts/es6/(.*)': 'recharts/lib/$1',
            },
          }
        : false,
    ],
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
          },
        ],
      ],
      plugins: ['require-context-hook', ['inline-react-svg', false]],
    },
  },
};
