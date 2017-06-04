// Gruntfile.js

//CAN ACTUALLY run all of dev through Grunt. As for production version, going to use webpack does not handle stylus compiling and whatnor

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
//var stylish = require('jshint-stylish');
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================

  require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)

    
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! Manual  - <%= grunt.template.today("mm-dd-yyyy") %> */\n'
      }, 
      build: {
        src: 'src/factorial.js',
        dest: 'build/factorial.min.js'
      }
    },
    // all of our configuration will go here
    // configure jshint to validate js files -----------------------------------
    /*jshint: {
      options: {
        reporter: stylish // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['gruntfile.js', 'public/js/*.js']
    },*/
    stylus: {
      build: {
        options: {
          linenos: true,
          compress: false
        },
        files: [{
          expand: true,
          cwd: 'src/styles',
          src: [ '**/*.styl' ],
          dest: 'public/css',
          ext: '.css'
        }]
      }
    },
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    watch: {
      // for stylesheets, watch css and less files 
      // only run stylus stylesheets:
      css: {
        files: ['public/css/*.css'] 
      },
      // for scripts, run jshint and uglify 
      scripts: { 
        files: ['public/js/*.js']
      } 
    },
    concurrent: {
      target: {
          tasks: ['nodemon', 'watch'],
          options: {
              logConcurrentOutput: true
          }
      }
    }

    

  });
  
  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these

  //grunt.registerTask('test', ['jshint']);*/

  // The development server (the recommended option for development)
  grunt.registerTask("default", [ 'concurrent', 'uglify']);


};
