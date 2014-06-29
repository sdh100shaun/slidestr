module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {

        stylesheets_less: {
            files: ['stylesheets/less/*'],
            tasks: ['compile_less'],
        },
    },
    less: {
        compile_less: {
            files: [
                {
                    expand: true,
                    cwd: 'stylesheets/less',
                    src: '**/*.less',
                    dest: 'stylesheets/css',
                    ext: '.css'
                }
            ]
        },
    }
  });

  // Plugins

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['less']);

  // LESS Tasks
  grunt.registerTask('stylesheets_less', ['less:compile_less']);
};
