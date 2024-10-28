const { configPaths, alias } = require('react-app-rewire-alias')

module.exports = alias(configPaths('./jsconfig.json'))
