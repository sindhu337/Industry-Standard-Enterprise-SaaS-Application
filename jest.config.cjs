module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/tests/**/*.test.(js|jsx)'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/components/feedback/FallbackPage.jsx',
    'src/features/auth/authSlice.js',
    'src/features/auth/LoginPage.jsx',
    'src/services/auth.api.js',
    'src/features/audit/hooks/useAudit.js'
  ],
}
