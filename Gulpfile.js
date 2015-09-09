var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    execMap: {
      js: 'node --harmony'
    },
    env: { 'NODE_ENV': 'development' }
  })
})
