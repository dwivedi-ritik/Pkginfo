#!/usr/bin/node

const axios = require("axios");
const chalk = require("chalk");
const { Select } = require("enquirer");
const { aurChalkWrite, chalkWriter } = require("./formatOut");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

//Function for retriving packages from arch linux repo except user respositery
const retriver = async (query) => {
  queryUrl = "https://archlinux.org/packages/search/json/";
  const res = await axios({
    url: queryUrl,
    method: "get",
    params: {
      q: query,
    },
  });
  return res.data.results;
};

//Function for filtering and user select features

const usrInteract = (res, tempObj, aur) => {
  try {
    if (!res.length) throw new Error(chalk.bold.red("No results found"));
    const prompt = new Select({
      name: "Package Finder",
      message: "Select Package",
      choices: tempObj,
    });

    prompt.run().then((ret) => {
      res.forEach((el) => {
        if (el.Name === ret) {
          console.log(type);
          aur ? aurChalkWrite(el) : chalkWriter(el);
        }
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

//Function for retriving package info from arch user repositery
const archUserRepo = () => {
  readline.question(chalk.bold("PKG NAME ==> "), async (pkg) => {
    let res = await aurRetriver(pkg);
    let tempObj = new Array();
    res.results.forEach((el) => {
      tempObj.push(el.Name);
    });
    usrInteract(res.results, tempObj, true);
    readline.close();
  });
};

const archRepo = () => {
  readline.question(chalk.bold("PKG NAME ==> "), async (pkg) => {
    let res = await retriver(pkg);
    let tempObj = new Array();
    res.forEach((el) => {
      tempObj.push(el.pkgname);
    });
    usrInteract(res, tempObj, false);
    readline.close();
  });
};

module.exports = {
  archRepo,
  archUserRepo,
};
