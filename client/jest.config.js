// jest.config.js
export default {
    testEnvironment: 'node',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.css$': '<rootDir>/path/to/empty/styleMock.js', // Add this line if you have CSS imports
    },
  };
  