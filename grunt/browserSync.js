module.exports = {
  serve: {
    options: {
      host: 'dev.chuckandsarah.us',
      open: 'external',
      port: 9000,
      server: {
        baseDir: './'
      },
      watchTask: true
    }
    // bsFiles: {
    //   src: ['./index.html', './examples/*.html', './build/*.js']
    // }
  }
};
