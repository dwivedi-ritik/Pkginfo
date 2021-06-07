#!/usr/bin/node

const { archUserRepo, archRepo } = require("./src/finder");

var argv = require("yargs/yargs")(process.argv.slice(2))
  .help("h")
  .usage("Command line tool for finding packages from arch and aur")
  .boolean(["aur", "arch"])
  .describe("aur", "finding package from arch user repositery")
  .describe("arch", "finding packages from arch linux reposite  ry")
  .example("node debug.js --arch or node debug.js --aur")
  .epilog("Arch package cli wrapper").argv;

if (argv.arch) archRepo();
if (argv.aur) archUserRepo();
