// const axios = require("axios");

const chalk = require("chalk");

//I dont need cheerio anymore i have found an api for this

// const retriver = async () => {
//   const res = await axios.get(
//     "https://aur.archlinux.org/packages/pcmanfm-git/"
//   );
//   return res.data;
// };

const queryUrl = "https://archlinux.org/packages/search/json/";

const retriver = async (query) => {
  const res = await axios({
    url: queryUrl,
    method: "get",
    params: {
      q: query,
    },
  });
  return res.data.results;
};

// main();
// Debug file for chalk
console.log(chalk.red("This is chalk node library"));

const log = console.log;

// Combine styled and normal strings
log(chalk.blue("Hello") + " World" + chalk.red("!"));

// Compose multiple styles using the chainable API
log(chalk.blue.bgRed.bold("Hello world!"));

// Pass in multiple arguments
log(chalk.blue("Hello", "World!", "Foo", "bar", "biz", "baz"));

// Nest styles
log(chalk.red("Hello", chalk.underline.bgBlue("world") + "!"));

// Nest styles of the same type even (color, underline, background)
log(
  chalk.green(
    "I am a green line " +
      chalk.blue.underline.bold("with a blue substring") +
      " that becomes green again!"
  )
);

// ES2015 template literal
log(`
CPU: ${chalk.red("90%")}
RAM: ${chalk.green("40%")}
DISK: ${chalk.yellow("70%")}
`);

// ES2015 tagged template literal
// log(chalk`
// CPU: {red ${cpu.totalPercent}%}
// RAM: {green ${(ram.used / ram.total) * 100}%}
// DISK: {rgb(255,131,0) ${(disk.used / disk.total) * 100}%}
// `);

// Use RGB colors in terminal emulators that support it.
log(chalk.rgb(123, 45, 67).underline("Underlined reddish color"));
log(chalk.hex("#DEADED").bold("Bold gray!"));

//Chalk writer

const chalkWriter = (el) => {
  let formatedPrinting = `
  ${el.pkgname} ( ${chalk.greenBright(el.repo)}) ${chalk.cyanBright(
    el.pkgver
  )} \n
  ${chalk.red("DESCRIPTION")}\n\t ${el.pkgdesc}
  ${chalk.green("URL ")} ${chalk.green("==> ")} ${el.url}
 `;
  console.log(formatedPrinting);
};
