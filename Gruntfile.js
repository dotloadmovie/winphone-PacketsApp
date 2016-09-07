module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
          
            desktopJS: {
                options: {
                    baseUrl: "js/",
                    paths: {
                        "desktop": "app/config/config"
                    },
                    wrap: true,
                    name: "libs/almond",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    findNestedDependencies: true,
                    mainConfigFile: "js/app/config/config.js",
                    include: ["desktop"],
                    out: "js/app/config/config.min.js"
                }
            },
            desktopCSS: {
                options: {
                    optimizeCss: "standard",
                    cssIn: "./css/default.css",
                    out: "./css/default.min.css"
                }
            }
        },
		
		replace: {
		  paths: {
			src: ['js/loader.js'],             // source files array (supports minimatch)
			dest: 'js/loader.js',             // destination directory or file
			replacements: [{
			  from: 'var production = false,',                   // string replacement
			  to: 'var production = true,'
			}]
		  }
		}
        
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-text-replace');
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['requirejs:desktopJS','requirejs:desktopCSS']);
    grunt.registerTask('default', ['build']);

};
