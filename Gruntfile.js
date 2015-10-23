/*
Usage
--------------
# run build tasks is build_state (default dev)
# start watching for changes and build on changes
grunt


# build with compressed css and js
# does NOT start watch
grunt prod


*/

    // we can set our default build state to either
    // 'prod' or 'dev'
    // this value will be used for both the
    // initial process when `grunt` alone is run
    // as well as the tasks run via watch
var build_state = 'prod',
    // sass src files are loaded with sass includes
    // no need to list them here (i.e. only one sass src)
    sass_files = {
        "css/style.min.css": "css/sass/style.scss"
    },
    // watch all .scss files in our sass directory
    // for changes
    watched_sass_files = [ 'css/sass/**/*.scss' ],
    uglify_source_files = [
        'js/vendor/**/*.js',
        'js/custom/*.js',
    ],
    uglify_files = {
        'js/javascript.min.js': uglify_source_files
    },

    watched_js_files = [
        'js/vendor/**/*.js',
        'js/custom/*.js',
    ];

module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        // `grunt watch`
        watch: {
            sass: {
                files: watched_sass_files,
                tasks: ["sass:"+build_state],
                options: {
                    livereload: true
                }
            },
            js: {
                files: watched_js_files,
                tasks: ["uglify:"+build_state],
                options: {
                    livereload: true
                }
            }
        }, // watch

        uglify: {
            // `grunt uglify:dev`
            dev: {
                files: uglify_files,
                options: {
                    beautify: true,
                    mangle: false
                },
            },
            // `grunt uglify:prod`
            prod: {
                files: uglify_files
            },
            releaseUnmin: {
                files: {
                    'js/javascript.js': uglify_source_files
                },
                options: {
                    beautify: true,
                    mangle: false
                }
            }
        }, // uglify
        sass: {
            // `grunt sass:dev`
            dev: {
                options: { outputStyle: "nested", sourceMap: true },
                files: sass_files,
            },
            // `grunt sass:prod`
            prod: {
                options: { outputStyle: "compressed", sourceMap: true },
                files: sass_files,
            },
            releaseUnmin: {
                options: { style: "normal" },
                files: {
                    "css/style.css": "css/sass/style.scss"
                },
            }
        }, // sass
    });

    // when `grunt` is run, do the following tasks
    // run all tasks associated with build_state
    // (either prod or dev), start watch
    // (note: watch also uses build_state when generating output)
    grunt.registerTask('default', [build_state, 'watch']);

    // when `grunt prod` is run, do the following tasks
    grunt.registerTask('prod', ['sass:prod', 'uglify:prod']);

    // when `grunt dev` is run, do the following tasks
    grunt.registerTask('dev', ['sass:dev', 'uglify:dev']);

    // load these tasks (necessary to allow use of sass, watch, and uglify
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-uglify");
};
