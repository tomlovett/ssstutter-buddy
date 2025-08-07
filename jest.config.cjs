module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/frontend/$1',
    '^@/components/ui$': '<rootDir>/app/frontend/components/ui',
    '^@/components/ui/(.*)$': '<rootDir>/app/frontend/components/ui/$1',
    '^@/components/(.*)$': '<rootDir>/app/frontend/components/$1',
    '^@/lib/(.*)$': '<rootDir>/app/frontend/lib/$1',
    '^@/schemas/(.*)$': '<rootDir>/app/frontend/schemas/$1',
    '^@/pages/(.*)$': '<rootDir>/app/frontend/pages/$1',
    '^@tests/(.*)$': '<rootDir>/app/frontend/__tests__/$1',
    // Handle aliased UI component imports
    '^@ui/(.*)$': '<rootDir>/app/frontend/components/ui/$1',
    // Handle relative component imports
    '^components/(.*)$': '<rootDir>/app/frontend/components/$1',
    // Handle CSS and static assets
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  testMatch: [
    '<rootDir>/app/frontend/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/app/frontend/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/tmp/', '/dist/', '/helpers/', '/mocks/', '/utils/'],
  collectCoverageFrom: [
    'app/frontend/**/*.{js,jsx}',
    '!app/frontend/**/*.d.ts',
    '!app/frontend/entrypoints/**',
    '!app/frontend/styles/**',
    '!app/frontend/components/ui/**/*.tsx',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      },
    ],
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}
