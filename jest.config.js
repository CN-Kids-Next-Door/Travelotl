
module.exports = {
    verbose: true,
    testTimeout: 4000,
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          '<rootDir>/__tests__/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/__tests__/__mocks__/styleMock.js',
      },
}
