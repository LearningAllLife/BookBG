/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len*/
const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

const config = {
    connectionString: 'mongodb://localhost/books-db-test',
    port: 3002,
};

gulp.task('pre-test', () => {
    return gulp.src([
            './app/**/*.js',
            './server.js',
        ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src([
            './tests/unit/**/*.js',
        ])
        .pipe(mocha({

        }))
        .pipe(istanbul.writeReports())
        .on('end', () => {
            /* eslint-disable no-undef */
            process.exit(0);
        });
});

const { MongoClient } = require('mongodb');

gulp.task('test-server:stop', () => {
    return MongoClient.connect(config.connectionString)
        .then((db) => {
            return db.dropDatabase();
        });
});

gulp.task('test-server:start', () => {
    let database;
    return Promise.resolve()
        .then(() => require('./app/db').init(config.connectionString))
        .then((db) => {
            database = db;
            return require('./app/data').init(db);
        })
        .then((data) => require('./app').init(data, database))
        .then((app) => {
            const server = app.listen(
                config.port,
                () => console.log(`Test server running on : ${config.port}`));
            require('./app/socket').init(server);
        });
});

gulp.task('tests:integration', ['pre-test', 'test-server:start'], () => {
    return gulp.src(['./tests/integration/**/*.js', './tests/unit/**/*.js'])
        .pipe(mocha({
            timeout: 20000,
        }))
        .pipe(istanbul.writeReports({}))
        .once('end', () => {
            gulp.start('test-server:stop');
            /* eslint-disable no-undef */
            process.exit(0);
        });
});


gulp.task('tests:browser', ['test-server:start'], () => {
    return gulp.src('./tests/browser/**/*.js')
        .pipe(mocha({
            timeout: 20000,
        }))
        .once('end', () => {
            gulp.start('test-server:stop');
        });
});