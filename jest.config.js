module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.js?(x)',
    '!src/**/*.story.js?(x)',
    '!src/**/stories/*.js?(x)',
  ],
  //  coveragePathIgnorePatterns: ['/node_modules/', '/lib/', '/coverage/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/config/', '/coverage/', '/lib/'],
  coverageReporters: ['lcov', 'html', 'text-summary'],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 60,
      functions: 60,
      lines: 60,
    },
  },
  forceExit: true,
  globals: {
    __DEV__: false,
  },
  maxWorkers: '30%',
  setupFiles: ['<rootDir>/config/jest/setup.js'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupAfterEnv.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.js?(x)',
    '<rootDir>/src/**/*.(spec|test).js?(x)',
    '<rootDir>/config/**/*.(spec|test).js?(x)',
  ],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.s?css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  //  testPathIgnorePatterns: ['/config/', '/lib/'],
  testPathIgnorePatterns: ['/lib/'],
  transformIgnorePatterns: [
    'node_modules/(?!(carbon-components|recharts|@carbon/charts))',
    '__mocks__/copy-to-clipboard.js',
    '__mocks__/svgrMock.js',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgrMock.js',
    '^dnd-core$': 'dnd-core/dist/cjs',
    '^react-dnd$': 'react-dnd/dist/cjs',
    '^react-dnd-html5-backend$': 'react-dnd-html5-backend/dist/cjs',
    '^react-dnd-touch-backend$': 'react-dnd-touch-backend/dist/cjs',
    '^react-dnd-test-backend$': 'react-dnd-test-backend/dist/cjs',
    '^react-dnd-test-utils$': 'react-dnd-test-utils/dist/cjs',
  },

  moduleFileExtensions: ['js', 'json', 'jsx'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
