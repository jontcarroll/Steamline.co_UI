import es from 'event-stream';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import runSequence from 'run-sequence';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-dart-sass';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import stylelint from 'gulp-stylelint';
import concat from 'gulp-concat';
import riot from 'gulp-riot';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';


const reload = browserSync.reload;
const srcPaths = { 
	styles: 'src/styles/',
	js: 'src/js/',
	fonts: 'src/fonts/',
	images: 'src/img/',
	tags: 'src/tags/'
};
const viewsPath = 'views/';

const outputPath = 'static/';
const tempPath = '.tmp/';

// By default, use plumber to catch errors.
let usePlumber = true;
 
const component_folders = [
  'common',
  'nav-bar',
  'game-finder'
];

function buildTaskBodyPerFolder(taskBody) {
  let bodies = component_folders.map(taskBody);
  return es.concat.apply(null, bodies);
}

/* Add tasks here. */

/**
 * Styles Gulp Task.
 * Plumbs styles, runs dart sass, and outputs to the outputPath.
 */

 var styleSources = [ 
                      `${srcPaths.styles}all.scss`,
                      `${srcPaths.styles}css/**/*.css`
                    ]

gulp.task('styles', () => {
  return gulp.src(styleSources)
    .pipe(gulpif(usePlumber, plumber()))
    .pipe(gulpif('**/*.scss', stylelint({
  	reporters: [
  			{formatter: 'string', console: true}
  		]
  	})))
    .pipe(sourcemaps.init())
    .pipe(gulpif('**/*.scss', sass({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    })).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe(concat('all.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${outputPath}styles`))
    .pipe(reload({stream: true}));
});

/**
 * Js Gulp Task.
 * Runs Plumber and outputs js to the .tmp folder.
 */
gulp.task('js', () => {
  return buildTaskBodyPerFolder(folder => {
    return gulp.src(`${srcPaths.js}${folder}/**/*.js`)
      .pipe(gulpif(usePlumber, plumber()))
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(concat(`${folder}.scripts.js`))
      .pipe(gulp.dest(`${tempPath}${folder}`))
      .pipe(reload({ stream: true }));
  });
});

/**
 * Riot Gulp Task.
 * Compiles Riot .tags into .js in the .tmp folder.
 */
gulp.task('riot', ()=>{
  return buildTaskBodyPerFolder(folder => {
    return gulp.src(`${srcPaths.js}${folder}/**/*.tag`)
      .pipe(gulpif(usePlumber, plumber()))
      .pipe(concat(`${folder}-riot.tags.js`))
      .pipe(riot({
        compact: true
      }))
      .pipe(gulp.dest(`${tempPath}${folder}`));
  });
});

/**
 * CompileJS Gulp Task.
 * Compiles all JS in the .tmp folder into one file.
 */
gulp.task('compileJs', ()=>{
  return buildTaskBodyPerFolder(folder => {
    return gulp.src(`${tempPath}${folder}/**/*.js`)
      .pipe(gulpif(usePlumber, plumber()))
      .pipe(concat(`${folder}.js`))
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(`${outputPath}js`))
      .pipe(reload({ stream: true }));
  });
});

/**
 * Images Gulp Task.
 * Minifies images.
 */
gulp.task('images', () => {
  return gulp.src(`${srcPaths.images}**/*`)
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .pipe(gulp.dest(`${outputPath}img`));
});

/**
 * Fonts Gulp Task.
 * Pipes font changes to the outputPath.
 */
gulp.task('fonts', () => {
  return gulp.src(`${srcPaths.fonts}**/*.{eot,svg,ttf,woff,woff2}`)
    .pipe(gulp.dest(`${outputPath}fonts`));
});

/**
 * Clean Gulp Task.
 * Deletes the outputPath folder
 */
gulp.task('clean', del.bind(null, [`${outputPath}`, `${tempPath}`]));

gulp.task('beforeWatch', (callback) => { 
  runSequence(['images', 'styles', 'riot', 'js', 'fonts'], 
    'compileJs', callback);
});

/**
 * Watch Gulp Task.
 * Watches styles, js, fonts, and images.
 * Reloads browsers on change.
 */
gulp.task('watch', ['beforeWatch'], () => {
  gulp.watch([
    `${srcPaths.images}**/*`,
    `${outputPath}fonts/**/*`,
    `${viewsPath}**/*.html`
  ]).on('change', reload);
  gulp.watch(`${srcPaths.styles}**/*.scss`, ['styles']);
  gulp.watch(`${srcPaths.js}**/*.tag`, ['riot']);
  gulp.watch(`${srcPaths.js}**/*.js`, ['js']);
  gulp.watch(`${tempPath}**/*.js`, ['compileJs']);
  gulp.watch(`${srcPaths.fonts}**/*`, ['fonts']);
});

/**
 * Browsersync Gulp Task.
 */
gulp.task('browserSync', () => {
  browserSync.init({
    proxy: 'http://localhost:3000',
    notify: false,
    ghostMode: false,
  });
});

/**
 * Gulp Dev Task.
 * Cleans, runs browserSync and then begins a watch.
 */
gulp.task('dev', (callback) => {
	runSequence('clean', 'browserSync', 'watch', callback);
});

gulp.task('build', (callback) => {
  // Turn off plumber for builds, because we want builds to return
  // an exit code if they fail.
  usePlumber = false;

  runSequence('clean', 
    ['images', 'styles', 'riot', 'js', 'fonts'],
    'compileJs',
    callback);
});

gulp.task('setup', (callback) => {
  return gulp.src('.env.example')
      .pipe(rename('.env'))
      .pipe(gulp.dest('.'));
});

/**
 * Default Gulp Task.
 * This is executed if Gulp is run without providing a task.
 * Lists other available tasks and returns.
 */
gulp.task('default', () => {
 
    console.log("AVAILABLE TASKS:")
    for (let gulpTask in gulp.tasks){
        console.log('  ', gulpTask);
    }
 
});