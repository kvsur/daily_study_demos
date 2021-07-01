const path = require('path');

module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false
            }
        ]
    ],
    ignore: [/node_modules\/(?!(js-base64|src))/],
    include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'node_modules/js-base64')
    ]
}
