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
// Finder dot js into ts
const axios_1 = __importDefault(require("axios"));
// const { aurChalkWrite, chalkWriter } = require("./formatOut");
// const rdInterface = () => {
//     const rd = require("readline").createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });
//     return rd;
// };
//Function for retriving packages from arch user repositery
const aurRetriver = (query) => __awaiter(void 0, void 0, void 0, function* () {
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
//Function for retriving packages from arch linux repo except user respositery
const retriver = (query) => __awaiter(void 0, void 0, void 0, function* () {
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
//Function for filtering and user select features
// const usrInteract = (res, tempObj, aur) => {
//     try {
//         if (!res.length) throw new Error(chalk.bold.red("No results found"));
//         const prompt = new Select({
//             name: "Package Finder",
//             message: "Select Package",
//             choices: tempObj,
//         });
//         prompt.run().then((ret) => {
//             res.forEach((el) => {
//                 if (el.Name === ret || el.pkgname === ret) {
//                     aur ? aurChalkWrite(el) : chalkWriter(el);
//                 }
//             });
//         });
//     } catch (err) {
//         console.log(err.message);
//     }
// };
// //Function for retriving package info from arch user repositery
// const archUserRepo = () => {
//     const readline = rdInterface();
//     readline.question(chalk.bold("PKG NAME ==> "), async (pkg) => {
//         let res = await aurRetriver(pkg);
//         let tempObj = new Array();
//         res.results.forEach((el) => {
//             tempObj.push(el.Name);
//         });
//         usrInteract(res.results, tempObj, true);
//         readline.close();
//     });
// };
// const archRepo = () => {
//     const readline = rdInterface();
//     readline.question(chalk.bold("PKG NAME ==> "), async (pkg) => {
//         let res = await retriver(pkg);
//         let tempObj = new Array();
//         res.forEach((el) => {
//             tempObj.push(el.pkgname);
//         });
//         usrInteract(res, tempObj, false);
//         readline.close();
//     });
// };
// module.exports = {
//     archRepo,
//     archUserRepo,
// };
