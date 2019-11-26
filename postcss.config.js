module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-cssnext')({
      browsers: ['last 2 versions', 'ie > 8']
    }),
    require('cssnano')({
      autoprefixer: false
    }),
  ],
};
