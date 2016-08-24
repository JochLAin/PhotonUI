var path = require("path");

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        browserify: {
            dist: {
                files: {
                    "dist/<%= pkg.name %>.js": ["src/photonui.js"]
                },
                options: {
                    browserifyOptions: {
                        "standalone": "<%= pkg.name %>"
                    }
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    "dist/<%= pkg.name %>.min.js": ["dist/<%= pkg.name %>.js"]
                }
            }
        },

        yuidoc: {
            doc: {
                name: "<%= pkg.name %>",
                description: "<%= pkg.description %>",
                version: "<%= pkg.version %>",
                url: "<%= pkg.homepage %>",
                options: {
                    linkNatives: true,
                    attributesEmit: true,
                    selleck: true,
                    paths: ["./src/"],
                    outdir: "./doc/",
                    tabtospace: 2
                }
            }
        },

        jshint: {
            all: ["src/**/*.js"],
            options: {
                jshintrc: true
            }
        },

        jscs: {
            src: "src/**/*.js",
            options: {
                config: ".jscsrc"
            }
        },

        less: {
            less_base: {
                options: {
                    paths: ["."],
                    plugins: [
                        new (require("less-plugin-autoprefix"))({browsers: ["last 2 versions"]}),
                        //new (require("less-plugin-clean-css"))()
                    ],
                },
                files: {
                    "dist/photonui-base.css": "less/base/photonui-base.less"
                }
            },
            less_theme: {
                options: {
                    paths: ["."],
                    plugins: [
                        new (require("less-plugin-autoprefix"))({browsers: ["last 2 versions"]}),
                        new (require("less-plugin-clean-css"))()
                    ],
                },
                files: {
                    "dist/photonui-theme-particle.css": "less/theme-particle/photonui-theme-particle.less"
                }
            },
        },

        copy: {
            assets: {
                expand: true,
                flatten: true,
                filter: "isFile",
                cwd: "./node_modules/font-awesome/fonts/",
                src: "**",
                dest: "dist/assets/"
            }
        },

        watch: {
            javascript: {
                files: ["src/**/*.js"],
                tasks: ["browserify"],
                options: {
                    spawn: false
                }
            },
            lessBase: {
                files: ["less/base/**/*.less"],
                tasks: ["less:less_base"],
                options: {
                    spawn: false
                }
            },
            lessTheme: {
                files: ["less/theme-particle/**/*.less"],
                tasks: ["less:less_theme"],
                options: {
                    spawn: false
                }
            }
        },

        clean: {
            dist: ["dist"],
            docs: ["doc"],
            assets: ["dist/assets"]
        },

        githooks: {
            all: {
                options: {
                    template: "test/githook-template.js.hb"
                },
                "pre-commit": "test"
            }
        },

        shell: {
            "update-credits": "npm run update-credits"
        }

    });

    // Load the grunt plugins.
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-yuidoc");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-jscs");
    grunt.loadNpmTasks("grunt-githooks");
    grunt.loadNpmTasks("grunt-shell");

    // Register runnable tasks.
    grunt.registerTask("default", ["gen-js", "gen-docs", "gen-css", "shell:update-credits"]);
    grunt.registerTask("gen-js", ["browserify", "uglify"]);
    grunt.registerTask("gen-css", ["less:less_base", "less:less_theme", "clean:assets", "copy:assets"]);
    grunt.registerTask("gen-docs", ["clean:docs", "yuidoc"]);
    grunt.registerTask("test", ["jshint", "jscs"]);
};
