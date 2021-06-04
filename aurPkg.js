const axios = require("axios");

const { AutoComplete } = require("enquirer");
const { aurChalkWrite } = require("./formatOut");
//Function for retriving packages from arch user repositery
const aurRetriver = async (query) => {
  const aurUrl = "https://aur.archlinux.org/rpc/";
  const res = await axios({
    url: aurUrl,
    method: "get",
    params: {
      v: 5,
      type: "search",
      arg: query,
    },
  });
  return res.data;
};

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("PKG NAME ==> ", async (pkg) => {
  let res = await aurRetriver(pkg);
  let tempObj = new Array();
  res.results.forEach((el) => {
    tempObj.push(el.Name);
  });

  const prompt = new AutoComplete({
    name: "Package Finder",
    choices: tempObj,
  });
  prompt.run().then((ret) => {
    res.results.forEach((el) => {
      if (el.Name === ret) {
        aurChalkWrite(el);
      }
    });
  });
  readline.close();
});
