'use strict'
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const jade = require('gulp-jade')
const serve = require('gulp-serve')

const paths = {
  css: {
    entry: ['./src/css/hack.css'],
    all: './src/css/*.css'
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
  gulp.src(paths.css.entry)
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
  gulp.src(paths.html.entry)
    .pipe(jade({
      pretty: true,
      locals: {
        time: Date.now()
      }
    }))
    .pipe(gulp.dest('./demo'))
})

gulp.task('static', () => {
  gulp.src(paths.static.entry)
    .pipe(gulp.dest('./demo'))
})

gulp.task('watch', () => {
  gulp.watch(paths.css.all, ['css'])
  gulp.watch(paths.html.all, ['html'])
  gulp.watch(paths.static.all, ['static'])
})

gulp.task('build', ['css', 'html', 'static'])

gulp.task('default', ['build', 'watch', 'serve'])