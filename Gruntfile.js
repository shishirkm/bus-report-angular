module.exports = function(grunt) {


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            folder: ["dist","src/css"],
            html: ["dist/*.html", "dist/templates/**.*"],
            js: ["dist/js/**.*"],
            json: ["dist/*.json"],
        },
        sass: {
            dist: {
                files: [
                  {
                      expand: true, // Recursive
                      cwd: "src/scss", // The startup directory
                      src: ["*.scss"], // Source files
                      dest: "dist/css", // Destination
                      ext: ".css" // File extension
                  }
                ]
            }
        },
        browserSync: {
            bsFiles: {
                src : 'dist/**'
            },
            options: {
                server: {
                    baseDir: "dist",
                    index: "index.html"
                },
                watchTask: true
            }
        },
        browserify: {
            dest: {
                options: {
                    browserifyOptions: { debug: true },
                    transform: ["babelify"]
                },
                src: [
                    "src/js/index.js"
                ],
                dest: 'dist/js/index.js'
            }
        },
        copy: {
            all: {
                // This copies all the html and css into the dest/ folder
                // Also ignores the SCSS folder
                expand: true,
                cwd: 'src',
                src: ['**' , '!scss/**', '!js/**'],
                dest: 'dist'
            }
        },
        uglify: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'dist/js/index.js': 'dist/js/index.js'
                }
            }
        },
        watch: {
          sass: {
             // We watch and compile sass files as normal but don't live reload here
             files: ['src/scss/*.scss'],
             tasks: ['sass'],
           },
           html: {
             files: ['src/templates/**/*', 'src/*.html'],
             tasks: ['clean:html', 'copy', 'browserify']
           },
           json: {
             files: ['src/*.json'],
             tasks: ['clean:json', 'jshint', 'copy', 'browserify']
           },
           js: {
             files: ['src/js/**/*'],
             tasks: ['clean:js', 'jshint', 'copy', 'browserify']
           }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporterOutput: '',
            },
            main: [
                'src/js/*.js'
            ]
        }
        
    });

  // Build tasks with browser sync
  grunt.registerTask('build', ['clean','jshint','copy','sass','browserify','uglify','browserSync','watch']);

};
