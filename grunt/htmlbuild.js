module.exports = {
    dist: {
        src: './templates/*.html',
        dest: './',
        options: {
            beautify: true,
            relative: true,
            // scripts: {
            //     bundle: [
            //         '<%= fixturesPath %>/scripts/*.js',
            //         '!**/main.js',
            //     ],
            //     main: '<%= fixturesPath %>/scripts/main.js'
            // },
            // styles: {
            //     bundle: [
            //         '<%= fixturesPath %>/css/libs.css',
            //         '<%= fixturesPath %>/css/dev.css'
            //     ],
            //     test: '<%= fixturesPath %>/css/inline.css'
            // },
            sections: {
                // templates: './templates/**/*.html',
                layout: {
                    head: './templates/layout/head.html',
                    nav: './templates/layout/nav.html',
                    footer: './templates/layout/footer.html'
                }
            },
        }
    }
};
