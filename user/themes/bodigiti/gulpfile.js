/* Gulp Tasks for Rachael

!!! SASS/CSS working method (refer to below commands)
    1) run 'gulp sass' as you are working on the 'dev' site and not yet pushing
    the changes to production

    2) once you are happy with your sass/css
      a. run: gulp sass-prod
      b. run: gulp minify-css

    gulp sass
    ---> converts .scss files to .css and includes the source maps so you
    can see in the browser 'inspector' which file and line the css styles
    are coming from

    gulp sass-prod
    ---> does same as above, except excludes the source maps, saving lots
    of file size

    gulp minify-css
    ---> removes all blank/white space from .css files, saving files size

!!! JAVASCRIPT working method (refer to below commands)
    1) edit the files in theme/js/source
    2) run: gulp js-mini
    3) refresh browser

    gulp js-mini
    ---> removes all blank/white space from .js files, saving file size.  
    It takes all the files from theme/js/source/ and 
    saves them to theme/js/dist/ ---> this directory is where the theme
    looks for your js files... that is, all theme js files in twig have been
    updated to find the files in theme/js/dist/

*/

// Require Gulp!
// http://stackoverflow.com/questions/32490328/gulp-autoprefixer-throwing-referenceerror-promise-is-not-defined
require('es6-promise').polyfill();
var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var uncss = require('gulp-uncss');
var uglifyJS = require('gulp-uglify-es').default; // Minimizes JS
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var del = require('del');
var spritesmith = require('gulp.spritesmith');
var responsive = require('gulp-responsive'); // version limited to patches of 2.12.x as 2.13 renames 'jpg' to 'jpeg'
////
// Run Sequence
// Sequentially run tasks
// https://www.npmjs.com/package/run-sequence
// https://stackoverflow.com/questions/22824546/how-to-run-gulp-tasks-sequentially-one-after-the-other
var runSequence = require('run-sequence');

// Sass
gulp.task('sass', function() {
  gulp.src('style/scss/**/*.scss')
    .pipe(sourcemaps.init()) // Initialize sourcemaps
    .pipe(sass({
        errLogToConsole: true
      })
    )
    .on('error', swallowError)
    .pipe(prefix('last 2 versions', '>1%', 'ie 8'))
    .pipe(sourcemaps.write()) // Writes sourcemaps into the CSS file
    .pipe(gulp.dest('style/css'));
})

// Sass no-sourcemaps
gulp.task('sass-prod', function() {
  gulp.src('style/scss/**/*.scss')
    .pipe(sass({
        errLogToConsole: true
        }))
    .on('error', swallowError)
    .pipe(prefix('last 2 versions', '>1%', 'ie 8')) 
    .pipe(gulp.dest('style/css'));
})

// UNCSS
// https://github.com/uncss/uncss#within-nodejs
// https://www.fourkitchens.com/blog/article/use-gulp-and-uncss-slim-down-your-css-framework/
//
// IMPORTANT
// add 'ignore' css selectors for those that are added to page by JS or the css
// selectors will be deleted even though they are needed
//
// gulp.task('uncss', function() {
//   return gulp.src([
//       'style/css/styles.css'
//     ])
//     .pipe(uncss({
//       ignore: [
//         '.snipcart-wrapper.cart-not-empty',
//         '#snipcart-close .js-icon-text',
//         '.toggle-button__off',
//         '.toggle-button__on',
//         '.toggle-button-icon .handle',
//         '.toggle-button-icon.on',
//         '.toggle-button-icon.on .handle',
//         '.toggle-button-icon.on.red',
//         '.toggle-button-icon.on.red .handle'
//       ],
//       html: [
//         'https://jaxgrav.test/',
//         'https://jaxgrav.test/offline.html'
//       ]
//     }))
//     // Prefixes here after uncss because uncss delete prefixes since the prefixes
//     // do not appear in chrome browser 'localhost:8000' where uncss is looking for
//     // css selectors to keep
//     .pipe(prefix('last 2 versions', '>1%', 'ie 8')) 
//     .pipe(gulp.dest('style/css'));
// });

// Minify CSS
gulp.task('minify-css', function() {
  return gulp.src('style/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('style/css'));
});

//////////////////////////////////////////////////////////////////////////////////////////////////
// JS Tasks won't work until the apporopriate directories are created in the theme's /js/ directory ---> js/source and js/dist
//
// Minify JS
// Gulp task to minify JavaScript files
gulp.task('js-mini', function() {
  return gulp.src('js/source/*.js')
    // Minify the file
    .pipe(uglifyJS())
    // Output
    .pipe(gulp.dest('js/dist'))
});
// // Concatenate JS Files
// gulp.task('js-concat', function() {
//   return gulp.src(['js/dist/site.js', 'js/dist/snipcart-custom.js', 'js/dist/service-worker-initiate.js',])
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest('./js/dist/'));
// });
// // JS --> All Tasks
// gulp.task('scripts', function(done) {
//   runSequence('js-mini', 'js-concat', function() {
//       done();
//   });
// });

// Watch
// gulp.task('watch', function() {
//   gulp.watch('style/scss/**/*.scss', ['sass'])
//   .on('error', swallowError)
// })

// Clean
gulp.task('clean', function(cb) {
    del(['style/css/**/*.css'], cb)
});

// Default
// gulp.task('default', ['sass', 'watch']);

// Run Tasks sequentially with 'runSequence' module so mifiy runs after uncss and not before
// gulp.task('dist', function(done) {
//   runSequence('sass', 'sass-prod', 'uncss', 'minify-css', 'scripts', function() {
//       done();
//   });
// });

// Sprite
// gulp.task('sprite', function() {
//   var spriteData =
//     gulp.src('images/sprite-these/*.*') // source path of the sprite images
//       .pipe(spritesmith({
//           imgName: 'sprite-manufacturer-logos.png',
//           cssName: '_sprite-manufacturer-logos.scss',
//       }));

//   spriteData.img.pipe(gulp.dest('images/')); // output path for the sprite
//   spriteData.css.pipe(gulp.dest('style/scss/init/sprites/')); // output path for the SCSS
// });

// Handle the error
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}

// Prevent errors from breaking / crashing gulp watch
// https://stackoverflow.com/questions/23971388/prevent-errors-from-breaking-crashing-gulp-watch
// Swallow Error
function swallowError (error) {
  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}
