#!/usr/bin/env node

import fs  from 'fs';
import { program } from 'commander';
import chalk from 'chalk';
import EventProcessingCenter from './event.js';

const pack = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
console.log(chalk.blueBright.bold(`directory-doc v${pack.version}`));

/**node_modules .git and other folders do not need to be recursive*/
let filterFolder = ['node_modules', '.git'];

program
    .name('directory-doc')
    .version(pack.version, '-v, --version', 'output the current version');

program
    .command('init')
    .description('Build the project file directory')
    .option('-i, --ignore [ignore...]', 'You can ignore specific directory name', )
    .option('-e, --export <file>', 'You can define the file name for the export', 'directory.md')
    .action((options) => {
        filterFolder = typeof options.ignore === 'undefined' ? filterFolder : options.ignore;
        const processingCenter = new EventProcessingCenter({filterFolder})
        processingCenter.useInquirer(`${options.export}`);
    })
program.parse(process.argv);

// Try the following:
//  node .\index.js -v
//  node .\index.js init
//  node .\index.js init -i  node_modules
//  node .\index.js init -i  node_modules .git
//  node .\index.js init -e  directory.txt
//  node .\index.js init -e  directory.md
