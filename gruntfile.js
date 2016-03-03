// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  
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
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['gruntfile.js', 'public/js/*.js']
    },
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
        files: ['src/styles/*.styl'], 
        tasks: ['stylus'] 
      },
      // for scripts, run jshint and uglify 
      scripts: { 
        files: 'public/js/*.js',
        tasks: ['jshint'] 
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
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
   // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['concurrent', 'uglify', 'jshint']); 
};
