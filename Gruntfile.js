module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            start: {
                src: ['_dist', '.tmp']
            },
            end: {
                src: ['.tmp']
            }
        },

        sass: {
            dist: {
                files: {
                    'css/options.css': 'css/options.scss',
                    'css/content.css': 'css/content.scss'
                }
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['img/*.png','img/*.svg', 'background.js', 'options.html', 'manifest.json'],
                        dest: '_dist'
                    },
                    {
                        expand: true,
                        cwd: '.tmp/js/',
                        src: ['*.js', '*.map', '*/*.js', '*/*.map'],
                        dest: '_dist/js'
                    },
                    {
                        expand: true,
                        cwd: 'css',
                        src: ['*.css'],
                        dest: '_dist/css'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/jquery/dist',
                        src: [
                            'jquery.min.js',
                            'jquery.min.map'
                        ],
                        dest: '_dist/js'
                    }
                ]
            }
        },

        concat: {
            options: {
                separator: '\r\n\r\n',
                stripBanners: true,
                banner: '(function(){\r\n\r\n',
                footer: '\r\n\r\n\r\n\r\n})();'
            },
            main: {
                files: [
                    {
                        src: [
                            'js/lib/Github.js',
                            'js/content.js'
                        ],
                        dest: '.tmp/js/content.js'
                    },
                    {
                        src: [
                            'js/options.js'
                        ],
                        dest: '.tmp/js/options.js'
                    }
                ]
            }
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015'],
                plugins: [
                    ['transform-class-properties', 'transform-es2015-modules-commonjs', { 'spec': true }]
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'js/',
                        src: ['background.js', 'test.js'],
                        dest: '.tmp/js/'
                    },
                    {
                        expand: true,
                        cwd: '.tmp/js/',
                        src: ['main.js', 'options.js', 'content.js'],
                        dest: '.tmp/js/'
                    }
                ]
            }
        },

        uglify: {
            stick: {
                options: {
                    sourceMap: true,
                    sourceMapName: '.tmp/js/main.min.map'
                },
                files: {
                    '.tmp/js/main.min.js': ['.tmp/js/main.js']
                }
            }
        },

        sharp: {
            default: {
                files: [
                    {
                        expand: true,
                        cwd: 'img/',
                        src: 'icon.png',
                        dest: '_dist/img/'
                    },
                    {
                        expand: true,
                        cwd: 'img/',
                        src: 'icon-bw.png',
                        dest: '_dist/img/'
                    }
                ],
                options: {
                    tasks: [128, 48, 16].map(n => ({ resize: n, rename: '{base}' + n + '.{ext}' }))
                }
            }
        },

        watch: {
            js: {
                files: ['js/*.js', 'js/**/*.js'],
                tasks: [
                    'concat',
                    'babel',
                    //'uglify',
                    'copy',
                    'clean:end'
                ],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['css/*.scss', 'css/**/*.scss'],
                tasks: ['sass', 'copy'],
                options: {
                    spawn: false
                }
            },
            others: {
                expand: true,
                files: ['background.js', 'test.html', 'options.html', 'manifest.json'],
                tasks: ['copy'],
                options: {
                    spawn: false
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-sharp');

    grunt.registerTask('default', [
        'clean:start',
        'sass',
        'concat',
        'babel',
        //'uglify',
        'copy',
        'sharp',
        'clean:end'
    ]);
};