// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
//var stylish = require('jshint-stylish');
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config.js");

  require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)

    webpack: {
      options: webpackConfig,
      build: {
        plugins: webpackConfig.plugins.concat(
          new webpack.DefinePlugin({
            "process.env": {
              // This has effect on the react lib size
              "NODE_ENV": JSON.stringify("production")
            }
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
        )
      },
      "build-dev": {
        devtool: "sourcemap",
        debug: true
      }
    },
    "webpack-dev-server": {
      options: {
        webpack: webpackConfig,
        publicPath: "/" + webpackConfig.output.publicPath
      },
      start: {
        keepAlive: true,
        webpack: {
          devtool: "eval",
          debug: true
        }
      }
    },
    
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
      app: {
        files: ["app/**/*", "web_modules/**/*"],
        tasks: ["webpack:build-dev"],
        options: {
          spawn: false,
        }
      }, 
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

  //grunt.registerTask('test', ['jshint']);*/

  // The development server (the recommended option for development)
  grunt.registerTask("default", [ 'concurrent', 'uglify', "webpack-dev-server:start"]);

  // Build and watch cycle (another option for development)
  // Advantage: No server required, can run app from filesystem
  // Disadvantage: Requests are not blocked until bundle is available,
  //               can serve an old app on too fast refresh
  grunt.registerTask("dev", ["webpack:build-dev", "watch:app"]);

  // Production build
  grunt.registerTask("build", ["webpack:build"]); 
};
