const axios = require("axios");
const chalk = require("chalk");
const { AutoComplete } = require("enquirer");
//Dead link lol
const URL = "https://aur.archlinux.org/rpc?type=suggest&arg=";

//This shitty omellete does't work i have to something called enquirer

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

const chalkWriter = (el) => {
  let formatedPrinting = `
  ${chalk.greenBright("PKG INFO")}\n
  ${chalk.bold.cyanBright(el.pkgname)} (${chalk.greenBright(
    el.repo
  )}) ${chalk.cyanBright(el.pkgver)} \n
  ${chalk.red("DESCRIPTION")}\n\t ${chalk.bold(el.pkgdesc)}\n
  ${chalk.bold.greenBright("==> ")} ${chalk.bold.cyanBright(el.url)}\n\t
  ${chalk.red("EXTRA INFO")}\n\t
  ${chalk.bold.greenBright("LICENSE ")} ${chalk.bold.cyanBright(el.licenses)}\n
  ${chalk.bold.greenBright("DEPENDECIES ")} ${chalk.bold.cyanBright(el.depends)}
 `;
  console.log(formatedPrinting);
};

readline.question(chalk.bold.cyanBright("PKG NAME ==> "), async (pkg) => {
  let res = await retriver(pkg);
  let tempObj = new Array();
  res.forEach((el) => {
    tempObj.push(el.pkgname);
  });

  const prompt = new AutoComplete({
    name: "Package Finder",
    choices: tempObj,
  });

  prompt.run().then((ret) => {
    res.forEach((el) => {
      if (el.pkgname === ret) {
        chalkWriter(el);
      }
    });
  });

  readline.close();
});
