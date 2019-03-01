const { join } = require('path');

module.exports = {
    options: {
        debug: true,
        endpointURL: '/graph'
    },

    schema: join(__dirname, '../app/Schema'),
    resolvers: join(__dirname, '../app/Resolvers')
};
