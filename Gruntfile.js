'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        app: 'app', // path to app files
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
                spawn: false,
                livereload: true
            },

            watchsass: {
                files: [
                    '<%= app %>/sass/**/*.scss',
                ],
                tasks: ['sass:dev']
            },

            js: {
                files: [
                    '<%= app %>/js/**/*.js'
                ],
                tasks: ['jshint'],
            },


            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= app %>/*.html',
                    '<%= app %>/js/**/*.js',
                    '<%= app %>/css/*.css',
                    '<%= app %>/img/*.{gif,jpg,jpeg,png,svg,webp}'
                ]
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    lineNumbers: true
                },
                files: {
                    '<%= app %>/css/main.css': '<%= app %>/sass/main.scss'
                }
            },
            prod: {
                options: {
                    style: 'compressed',
                    lineNumbers: false
                },
                files: {
                    '<%= app %>/build/css/main.css': '<%= app %>/sass/main.scss'
                }
            }
        },

        clean: [ '<%= app %>/build/' ],

        tag: {
            banner: '/* <%= pkg.name %>*/\n' +
                   '/* v<%= pkg.version %>*/\n' +
                   '/* <%= pkg.author %>*/\n' +
                   '/* Last updated: <%= grunt.template.today("dd-mm-yyyy") %> */\n' +
                   '/* This is a generated file: any changes made here will be lost. */\n'
        },

        uglify: {
            options: {
                banner: '<%= tag.banner %>'
            },
            dist: {
                src: ['<%= app %>/build/js/app.min.js'],
                dest: '<%= app %>/build/js/app.min.js'
            }
        },

        jshint: {
            options: {
                // carry on even if there's warnings ie Warn only
                force: true,
                jshintrc: '.jshintrc',
                reporter: require('jshint-summary')
            },
            all: [
                '<%= app %>/js/*.js'
            ]
        },


        connect: {
            options: {
                port: 9000,
                livereload: 35729
            },
            livereload: {
                options: {
                    base: ['<%= app %>']
                }
            }
        },

        react: {
            jsx: {
                files: {
                    '<%= app %>/build/js/app.min.js' : '<%= app %>/js/calculator.js',
                    'spec/calculator.spec.js' : 'spec/calculator.jsx'
                }
            }
        },

        copy: {
            build: {
                files: {
                    '<%= app %>/build/js/vendor/react.min.js' : '<%= app %>/js/vendor/react.min.js'
                }
            }
        },

        processhtml: {
            build: {
                files: {
                    '<%= app %>/build/index.html' : '<%= app %>/index.html'
                }
            }
        }

    });

    grunt.registerTask('default', ['sass:dev', 'connect:livereload', 'watch']);
    grunt.registerTask('build', ['jshint', 'clean', 'sass:prod', 'react', 'uglify', 'copy', 'processhtml']);
};
