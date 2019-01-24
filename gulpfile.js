'use strict'
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const jade = require('gulp-jade')
const serve = require('gulp-serve')
const pkg = require('./package')

const paths = {
  css: {
    entry: [
      './src/css/hack.css',
      './src/css/themes/*.css'
    ],
    all: './src/css/**/*.css'
  },
  html: {
    entry: ['./src/html/*.jade'],
    all: './src/html/**/*.jade'
  },
  static: {
    entry: ['./src/static/*'],
    all: './src/static/*'
  }
}

gulp.task('serve', serve({
  host: '127.0.0.1',
  port: 4001,
  root: './demo'
}))

gulp.task('css', () => {
  return gulp.src(paths.css.entry)
    .pipe(postcss([
      require('postcss-import')(),
      require('postcss-mixins'),
      require('postcss-simple-vars'),
      require('postcss-cssnext')({
        browsers: ['last 2 versions', 'ie > 8']
      }),
      require('cssnano')({
        autoprefixer: false
      })
    ]))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./demo'))
})

gulp.task('html', () => {
  return gulp.src(paths.html.entry)
    .pipe(jade({
      pretty: true,
      locals: {
        time: Date.now(),
        version: pkg.version,
        build: Math.floor(Date.now() / 1000)
      }
    }))
    .pipe(gulp.dest('./demo'))
})

gulp.task('static', () => {
  return gulp.src(paths.static.entry)
    .pipe(gulp.dest('./demo'))
})

gulp.task('watch', () => {
  gulp.watch(paths.css.all, gulp.series(['css']))
  gulp.watch(paths.html.all, gulp.series(['html']))
  gulp.watch(paths.static.all, gulp.series(['static']))
  return Promise.resolve();
})

gulp.task('build', gulp.series('css', 'html', 'static'))

gulp.task('default', gulp.series('build', 'watch', 'serve'))
