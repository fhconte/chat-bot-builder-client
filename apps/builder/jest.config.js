module.exports= 
{
  testPathIgnorePatterns: ["node_modules", "/next/"],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax:'typescript',
            tsx: true,
            decorators: true,
          },
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
            react: {
              runtime: 'automatic'
            },
          },
        },
        module: {
          type: 'es6',
          noInterop: false,
        }
      },
    ]
  },
  setupFilesAfterEnv: [ '<rootDir>/apps/builder/tests/setupTests.ts'],
  testEnvironment: 'jsdom'
}
