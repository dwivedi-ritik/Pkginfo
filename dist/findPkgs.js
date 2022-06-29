"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const chalk_1 = __importDefault(require("chalk"));
const { Select } = require('enquirer');
const { aurChalkWrite, archChalkWriter } = require("./chalkWriter");
const readlineInterface = () => {
    const rd = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return rd;
};
//Function for retriving packages from {Arch user repositery}
const jsonAUR = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const aurUrl = "https://aur.archlinux.org/rpc/";
    const res = yield (0, axios_1.default)({
        url: aurUrl,
        method: "get",
        params: {
            v: 5,
            type: "search",
            arg: query,
        },
    });
    return res.data;
});
//Function for retriving packages from {Arch Linux Repositery}
const jsonARCH = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let queryUrl = "https://archlinux.org/packages/search/json/";
    const res = yield (0, axios_1.default)({
        url: queryUrl,
        method: "get",
        params: {
            q: query,
        },
    });
    return res.data.results;
});
const usrInteract = (res, pkgNames, whichRepo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!res.length)
            throw new Error(chalk_1.default.bold.red("No results found"));
        const prompt = new Select({
            name: "Package Finder",
            message: "Select Package",
            choices: pkgNames,
        });
        let answer = yield prompt.run();
        res.forEach((eachAns) => {
            if (eachAns.Name === answer || eachAns.pkgname === answer) {
                whichRepo === "aur" ? aurChalkWrite(eachAns) : archChalkWriter(eachAns);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
//Function for retriving package info from arch user repositery
const archUserRepo = () => __awaiter(void 0, void 0, void 0, function* () {
    const readline = readlineInterface();
    readline.question(chalk_1.default.bold("PKG NAME ==> "), (pkg) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield jsonAUR(pkg);
        let pkgNames = new Array();
        res.results.forEach((el) => {
            pkgNames.push(el.Name);
        });
        usrInteract(res.results, pkgNames, "aur");
        readline.close();
    }));
});
const archRepo = () => {
    const readline = readlineInterface();
    readline.question(chalk_1.default.bold("PKG NAME ==> "), (pkg) => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield jsonARCH(pkg);
        let pkgNames = new Array();
        res.forEach((el) => {
            pkgNames.push(el.pkgname);
        });
        usrInteract(res, pkgNames, "arch");
        readline.close();
    }));
};
module.exports = {
    archRepo,
    archUserRepo,
};
