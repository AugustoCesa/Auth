module.exports = { 
    testEnvironment: "node",
    preset: "jest-expo",
    transform: { '^.+\\.jsx$': 'babel-jest', },
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
    ]
};