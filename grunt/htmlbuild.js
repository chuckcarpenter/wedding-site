module.exports = {
    prepare: {
        src: 'templates/layout/*.html',
        dest: '.tmp/',
        options: {
            relative: false,
            scripts: {
                libs: './js/libs.js'
            },
            styles: {
                main: './css/main.css'
            }
        }
    },
    dist: {
        src: 'templates/*.html',
        dest: './',
        options: {
            beautify: true,
            relative: false,
            sections: {
                // templates: './templates/**/*.html',
                layout: {
                    head: '.tmp/head.html',
                    nav: '.tmp/nav.html',
                    footer: '.tmp/footer.html'
                }
            },
        }
    }
};
