"use strict";

module.exports = function (grunt) {
  // determine time to complete tasks
  require("time-grunt")(grunt);

  // load all grunt tasks using load-grunt-config
  require("load-grunt-config")(grunt, {
    init: true,
    data: {
      // path to Grunt file for exclusion
      gruntfile: "Gruntfile.js",
      // generalize the module information for banner output
      banner:
        "/**\n" + " * Wedding Website for Chuck and Sarah, 2015\n" + "**/\n",
    },
    loadGruntTasks: {
      pattern: ["grunt-*", "@*/grunt-*", "gruntify-*"],
    },
  });
};
