const axios = require("axios");

const { chalkWriter } = require("./formatOut");
const { Select } = require("enquirer");
const chalk = require("chalk");

//This shitty omellete does't work i have to something called enquirer
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const queryUrl = "https://archlinux.org/packages/search/json/";

//Function for retriving packages from arch linux repo except user respositery
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

readline.question(chalk.bold("PKG NAME ==> "), async (pkg) => {
  let res = await retriver(pkg);
  let tempObj = new Array();
  res.forEach((el) => {
    tempObj.push(el.pkgname);
  });

  if (res.length) {
    const prompt = new Select({
      name: "Package Finder",
      message: "Select Package",
      choices: tempObj,
    });
    prompt.run().then((ret) => {
      res.forEach((el) => {
        if (el.pkgname === ret) {
          chalkWriter(el);
        }
      });
    });
  } else {
    console.log(chalk.redBright("Could't able to find anything"));
  }
  readline.close();
});
