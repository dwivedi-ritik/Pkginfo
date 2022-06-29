import axios from "axios";
import chalk from "chalk";

const { Select } = require('enquirer')
const { aurChalkWrite, archChalkWriter } = require("./chalkWriter");

const readlineInterface = (): any => {
    const rd = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return rd;
};

//Function for retriving packages from {Arch user repositery}
const jsonAUR = async (query: string): Promise<any> => {
    const aurUrl: string = "https://aur.archlinux.org/rpc/";
    const res: any = await axios({
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


//Function for retriving packages from {Arch Linux Repositery}
const jsonARCH = async (query: String): Promise<any> => {
    let queryUrl: string = "https://archlinux.org/packages/search/json/";
    const res: any = await axios({
        url: queryUrl,
        method: "get",
        params: {
            q: query,
        },
    });
    return res.data.results;
};



const usrInteract = async (res: any, pkgNames: string[], whichRepo: "arch" | "aur") => {
    try {
        if (!res.length) throw new Error(chalk.bold.red("No results found"));

        const prompt = new Select({
            name: "Package Finder",
            message: "Select Package",
            choices: pkgNames,
        });

        let answer: string = await prompt.run()
        res.forEach((eachAns: any) => {
            if (eachAns.Name === answer || eachAns.pkgname === answer) {
                whichRepo === "aur" ? aurChalkWrite(eachAns) : archChalkWriter(eachAns)
            }
        })

    } catch (error: unknown) {
        console.log(error);
    }
};

//Function for retriving package info from arch user repositery
const archUserRepo = async (): Promise<void> => {
    const readline: any = readlineInterface()

    readline.question(chalk.bold("PKG NAME ==> "), async (pkg: string) => {
        let res = await jsonAUR(pkg);
        let pkgNames: string[] = new Array();

        res.results.forEach((el: any) => {
            pkgNames.push(el.Name);
        });
        usrInteract(res.results, pkgNames, "aur");
        readline.close();
    });
};

const archRepo = () => {
    const readline = readlineInterface();
    readline.question(chalk.bold("PKG NAME ==> "), async (pkg: string) => {
        let res = await jsonARCH(pkg);
        let pkgNames: string[] = new Array();
        res.forEach((el: any) => {
            pkgNames.push(el.pkgname);
        });
        usrInteract(res, pkgNames, "arch");
        readline.close();
    });
};



module.exports = {
    archRepo,
    archUserRepo,
};


