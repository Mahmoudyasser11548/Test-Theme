module.exports = {

    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/fileMock.js",
        '@src/(.+)': "<rootDir>/src/$1",
        '@styles/(.+)': "<rootDir>/__mocks__/styleMock.js",
        '@assets/(.+)': "<rootDir>/src/@core/assets/$1",
        '@components/(.+)': "<rootDir>/src/@core/components/$1",
        '@layouts/(.+)': "<rootDir>/src/@core/layouts/$1",
        '@store/(.+)': "<rootDir>/src/redux/$1",
        '@styles/(.+)': "<rootDir>/src/@core/scss/$1",
        '@configs/(.+)': "<rootDir>/src/configs/$1",
        '@utils': "<rootDir>/src/utility/Utils",
        '@hooks/(.+)': "<rootDir>/src/utility/hooks/$1"
    },
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.js?$": "babel-jest"
    },
}