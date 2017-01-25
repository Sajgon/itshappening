module.exports = {
    "globals": {
        "$":true,
        "jQuery":true,
        "RestEntity":true,
        "restEntityFactory": true,
        "hljs":true,
        "mongoose":true
    },
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "no-console": 0,
        "no-unused-vars": 0,
        "no-trailing-spaces": 1
    }
};