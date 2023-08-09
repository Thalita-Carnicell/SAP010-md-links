#!/usr/bin/env node

const { stat } = require("fs");
const { mdLinks } = require("./index.js");
const path = require("path");

const caminhoDoArquivo = process.argv[2];

if (!caminhoDoArquivo) {
  console.error("Por favor, informe o caminho do arquivo a ser processado.");
  process.exit(1);
}

const caminhoAbsolutoDoArquivo = path.resolve(caminhoDoArquivo);

function printLink(link) {
  console.log(link);
}

const options = process.argv.slice(3);
const isValidate = options.includes("--validate");
const isStats = options.includes("--stats");

function print(options={validate:true,stats:true},result){
    if (options.validate && options.stats){
        const stats = result.stats;
        console.log(`totalLinks: ${stats.totalLinks}`);
        console.log(`uniqueLinks: ${stats.uniqueLinks}`);
        console.log(`totalBrokenLinks: ${stats.totalBrokenLinks}`);
    } else if (options.stats){
        console.log(`totalLinks: ${result.totalLinks}`);
        console.log(`uniqueLinks: ${result.uniqueLinks}`);
    } else if (options.validate) {
        result.links.forEach(printLink);
    } else {
      console.log(`File:${result.file}`);
      console.log(`Text:${result.text}`);
      console.log(`Url:${result.url}`);
    }
}
  mdLinks(caminhoAbsolutoDoArquivo, { validate: isValidate, stats: isStats })
    .then((result) => {
        opt={ validate: isValidate, stats: isStats }
      print(opt,result)
    })
    .catch((err) => {
      console.error(err);
    });