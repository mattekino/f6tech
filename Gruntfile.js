module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      // Project settings
      f6template: {
        // configurable paths
        html: 'html'
      },
      // sass compilation
      sass: {
          dev: {
              options: {
                  style: 'expanded',
                  lineNumbers: true,
              },
              files: {
                  '<%= f6template.html %>/css/style.css': 'scss/style.scss'
              }
          },
          prod: {
              options: {
                  style: 'compressed',
                  lineNumbers: false,
              },
              files: {
                  '<%= f6template.html %>/css/style.min.css': 'scss/style.scss'
              }
          }
      },
      // watch / livereload
      watch: {
          js: {
              files: ['<%= f6template.html %>/js-source/{,*/}*.js'],
              tasks: ['newer:jshint:project', 'newer:buildrjs'],
              options: {
                livereload: true
              }
          },
          scss: {
              files: 'scss/**',
              tasks: ['sass:prod'],
              options: {
                  livereload: true
              }
          },
          livereload: {
            options: {
              livereload: '<%= connect.options.livereload %>'
            },
            files: [
              '<%= f6template.html %>/{,*/}*.html',
              '<%= f6template.html %>/gfx/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
              '<%= f6template.html %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ]
          }
      },
      // copy
      copy: {
          init: {
              files: [
                  {
                      expand: true,
                      flatten: true,
                      cwd: 'bower_components',
                      src: ['requirejs/require.js', 'modernizr/modernizr.js', 'srcset/srcset.js'],
                      dest: '<%= f6template.html %>/js/vendor/',
                      filter: 'isFile'
                  }
              ]
          }
      },
      // concat
      concat: {
          options: {
              separator: ';'
          },
          dist: {
              src: ['<%= f6template.html %>/js/main.js', '<%= f6template.html %>/js/plugins.js'],
              dest: '<%= f6template.html %>/js/scripts.js'
          }
      },
      // uglify
      uglify: {
          dist: {
              src: ['<%= f6template.html %>/js/scripts.js'],
              dest: '<%= f6template.html %>/js/scripts.min.js'
          }
      },
      validation: {
          options: {
              reset: grunt.option('reset') || false,
              stoponerror: false,
              reportpath: "validation-report.json",
              relaxerror: ["Bad value X-UA-Compatible for attribute http-equiv on element meta."]
          },
          files: {
              src: ['<%= f6template.html %>/{,*/}*.html']
          }
      },
      requirejs: {
          compile: {
              options: {
                  baseUrl: './html/js-source/lib',
                  mainConfigFile: "./html/js-source/config/routing.js",
                  name: '../home-page',
                  out: '<%= f6template.html %>/js/home-page.min.js'
              }
          }
      },
      // Make sure code styles are up to par and there are no obvious mistakes
      jshint: {
        options: {
          jshintrc: '.jshintrc',
          reporter: require('jshint-stylish')
        },
        all: [
          'Gruntfile.js',
          '<%= f6template.html %>/js/{,*/}*.js',
          '<%= f6template.html %>/js-source/{,*/}*.js'
        ],
        project: [
          '<%= f6template.html %>/{,*/}*.html',
          '<%= f6template.html %>/js-source/config/{,*/}*.js',
          '<%= f6template.html %>/js-source/constructor/{,*/}*.js',
          '<%= f6template.html %>/js-source/lib/{,*/}*.js',
          '<%= f6template.html %>/js-source/module/{,*/}*.js',
          '<%= f6template.html %>/js-source/*.js'
        ]
      },
      // The actual grunt server settings
      connect: {
        options: {
          port: 9000,
          // Change this to '0.0.0.0' to access the server from outside.
          hostname: 'localhost',
          livereload: 35729
        },
        livereload: {
          options: {
            open: true,
            base: [
              '<%= f6template.html %>'
            ]
          }
        }
      }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-bower-verify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-jscs-checker');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-newer');

    // Default task(s).
    // compile scss
    grunt.registerTask('default', ['sass:prod', 'jshint:project']);
    // validate html
    grunt.registerTask('validate', ['validation']);
    // test js
    grunt.registerTask('testjs', ['jshint:project']);
    // copy dependencies and compile scss
    grunt.registerTask('init', ['copy:init', 'sass:prod']);
    // compile scss, concat and min js
    grunt.registerTask('dist', ['sass:dist', 'concat:dist', 'uglify:dist']);
    // serve
    grunt.registerTask('serve', ['connect:livereload', 'watch']);

    grunt.registerTask('buildrjs', function() {
        var dir='html/js/';
        grunt.file.setBase(dir);
        var files = grunt.file.expand(['*-page.js']);
        files.forEach(function(filename) {
            grunt.config.set('appFile', filename.replace('.js', ''));
            grunt.task.run('requirejs:compile');
        });
    });
};
