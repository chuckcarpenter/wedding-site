module.exports = {
    // scripts: {
    //     files: [ 'js/*.js' ],
    //     tasks: [ 'eslint' ],
    //     options: {
    //         spawn: false
    //     }
    // }
    html: {
        files: [ './templates/**/*.html' ],
        tasks: [ 'build' ]
    }
};
