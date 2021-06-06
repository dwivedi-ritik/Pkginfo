// // const axios = require("axios");

// const chalk = require("chalk");

// const chalkWriter = require("./formatOut");
// //I dont need cheerio anymore i have found an api for this

// // const retriver = async () => {
// //   const res = await axios.get(
// //     "https://aur.archlinux.org/packages/pcmanfm-git/"
// //   );
// //   return res.data;
// // };

// const queryUrl = "https://archlinux.org/packages/search/json/";

// const retriver = async (query) => {
//   const res = await axios({
//     url: queryUrl,
//     method: "get",
//     params: {
//       q: query,
//     },
//   });
//   return res.data.results;
// };

// // main();
// // Debug file for chalk
// console.log(chalk.red("This is chalk node library"));

// const log = console.log;

// // Combine styled and normal strings
// log(chalk.blue("Hello") + " World" + chalk.red("!"));

// // Compose multiple styles using the chainable API
// log(chalk.blue.bgRed.bold("Hello world!"));

// // Pass in multiple arguments
// log(chalk.blue("Hello", "World!", "Foo", "bar", "biz", "baz"));

// // Nest styles
// log(chalk.red("Hello", chalk.underline.bgBlue("world") + "!"));

// // Nest styles of the same type even (color, underline, background)
// log(
//   chalk.green(
//     "I am a green line " +
//       chalk.blue.underline.bold("with a blue substring") +
//       " that becomes green again!"
//   )
// );

// // ES2015 template literal
// log(`
// CPU: ${chalk.red("90%")}
// RAM: ${chalk.green("40%")}
// DISK: ${chalk.yellow("70%")}
// `);

// // ES2015 tagged template literal
// // log(chalk`
// // CPU: {red ${cpu.totalPercent}%}
// // RAM: {green ${(ram.used / ram.total) * 100}%}
// // DISK: {rgb(255,131,0) ${(disk.used / disk.total) * 100}%}
// // `);

// // Use RGB colors in terminal emulators that support it.
// log(chalk.rgb(123, 45, 67).underline("Underlined reddish color"));
// log(chalk.hex("#DEADED").bold("Bold gray!"));

// //Chalk writer

// const ochalkWriter = (el) => {
//   let formatedPrinting = `
//   ${el.pkgname} ( ${chalk.greenBright(el.repo)}) ${chalk.cyanBright(
//     el.pkgver
//   )} \n
//   ${chalk.red("DESCRIPTION")}\n\t ${el.pkgdesc}
//   ${chalk.green("URL ")} ${chalk.green("==> ")} ${el.url}
//  `;
//   console.log(formatedPrinting);
// };

// chalkWriter();

// const readline = require("readline");

// readline.emitKeypressEvents(process.stdin);

// if (process.stdin.isTTY) {
//   process.stdin.setRawMode(true);
// }
// process.stdin.on("keypress", (str, key) => {
//   console.log("op");
//   // if (key.ctrl && key.name === "c") {
//   //   // do stuff
// });

// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: "OHAI> ",
// });

// rl.prompt();

// rl.on("line", (line) => {
//   switch (line.trim()) {
//     case "hello":
//       console.log("world!");
//       break;
//     default:
//       console.log(`Say what? I might have heard '${line.trim()}'`);
//       break;
//   }
//   rl.prompt();
// }).on("close", () => {
//   console.log("Have a great day!");
//   process.exit(0);
// });

//looks like i am stuck in between something and i can not figure out how to get out of it.
//i am tring to be the same level at others are but seems like i am not that capable.
//competition helps people to improve himself by comparing himself to the others.
//but sometime it can lead to a unwanted situation where only thing is left to taunt yourself.
//possibly i am in that situation i don't where to share this , this is why i am writing it to the beloved
//visual studio code.

//I know my priorities i just don't focus on them. B tech/Linux/Programming/English these are my new Priorites.
//i will focus on my new priorites , from now i realise people don't care , i will help only those who have
//helped me. I know my circle i do not have to make it bigger.

//Peace out myself :)

//Returning and handling promises
// const jumper = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("Hello World");
//     }, 2000);
//   });
// };

// (async () => {
//   console.log("retriving data");
//   const res = await jumper();
//   console.log("Done wating!" + res);
// })();

// const { Select } = require("enquirer");

// let tempObj = [];
// try {
//   (() => {
//     const prompt = new Select({
//       name: "AUR Package Finder",
//       message: "Select Package",
//       choices: tempObj,
//     });
//     prompt.run((res) => {
//       console.log(res);
//     });
//   })();
// } catch (err) {
//   console.log("error ocurred");
// }

// here i will be adding some fetaure of yargs and will nest both arch and arch user repositery packages

// var argv = require("yargs/yargs")(process.argv.slice(2))
//   .usage("Usage:  -w [num] -h [num]")
//   .demandOption(["w", "h"]).argv;

// console.log("The area is:", argv.w * argv.h);

//Alias is used for shorting a option argument

const { archUserRepo, archRepo } = require("./src/finder");

var argv = require("yargs/yargs")(process.argv.slice(2))
  .help("h")
  .usage("Command line tool for finding packages from arch and aur")
  .boolean(["aur", "arch"])
  .describe("aur", "finding package from arch user repositery")
  .describe("arch", "finding packages from arch linux reposite  ry")
  .example("node debug.js --arch or node debug.js --aur").argv;

if (argv.arch) archRepo();
if (argv.aur) archUserRepo();
