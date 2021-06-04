const axios = require("axios");

const chalkWriter = require("./formatOut");
const { AutoComplete } = require("enquirer");

//Dead link lol
const URL = "https://aur.archlinux.org/rpc?type=suggest&arg=";

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

readline.question("PKG NAME ==> ", async (pkg) => {
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
