const chalk = require("chalk");

//Function for formated output of arch Linux Respositery
const chalkWriter = (el) => {
  let formatedPrinting = `
    ${chalk.greenBright("PKG INFO(arch repositery)")}\n
    ${chalk.bold.cyanBright(el.pkgname)} (${chalk.greenBright(
    el.repo
  )}) ${chalk.cyanBright(el.pkgver)} \n
    ${chalk.red("DESCRIPTION")}\n\t ${chalk.bold(el.pkgdesc)}\n
    ${chalk.bold.greenBright("==> ")} ${chalk.bold.cyanBright(el.url)}\n\t
    ${chalk.red("EXTRA INFO")}\n\t
    ${chalk.bold.greenBright("LICENSE ")} ${chalk.bold.cyanBright(
    el.licenses
  )}\n
    ${chalk.bold.greenBright("DEPENDECIES ")} ${chalk.bold.cyanBright(
    el.depends
  )}
   `;
  console.log(formatedPrinting);
};

const aurChalkWrite = (el) => {
  let formatedPrinting = `
  ${chalk.greenBright("PKG INFO (arch user repositery)")}\n
  ${chalk.bold.cyanBright(el.Name)} (${chalk.cyanBright(el.Version)}) \n
  ${chalk.red("DESCRIPTION")}\n\t ${chalk.bold(el.Description)}\n
  ${chalk.bold.greenBright("==> ")} ${chalk.bold.cyanBright(el.URL)}\n\t
  ${chalk.red("EXTRA INFO")}\n\t
  ${chalk.bold.greenBright("MAINTAINERS ")} ${chalk.bold.cyanBright(
    el.Maintainer
  )}\n
  ${chalk.bold.greenBright("VOTES  ")} ${chalk.bold.cyanBright(el.NumVotes)}
 `;
  console.log(formatedPrinting);
};

module.exports = { chalkWriter, aurChalkWrite };
