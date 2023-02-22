#!/usr/bin/env node
import path from 'path';
import fs  from 'fs';
import ora from 'ora';
import inquirer from 'inquirer';
import chalk from 'chalk';

const warning = chalk.yellow;
const cyanBright = chalk.cyanBright;

/**loading */
const spinner = ora({
    text: 'Loading unicorns...',
    color: 'green'
});

const directoryEnum = {
    outermost: '    |',
    start: '    |-- ',
    line: ' ---------------------------------- #'
}

const target = process.cwd();
const rootName = target.split('\\')[target.split('\\').length -1];

const treeSort = (data, objectPath) => {
    // TODO: 要求：文件夹> 文件 > 字母
    return data.sort((a, b) => {
        const stateA = fs.statSync(path.join(objectPath, a))
        const stateB = fs.statSync(path.join(objectPath, b))
        if (stateA.isDirectory() && stateB.isDirectory()) return a > b ? 1 : -1;
        if (!stateA.isDirectory() && !stateB.isDirectory())return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
        if (stateA.isDirectory() && !stateB.isDirectory()) return -1;
        if (!stateA.isDirectory() && stateB.isDirectory()) return 1;
        return 1
    });
}

const EventProcessingCenter = class {
    constructor(props){
        this.filterFolder = props.filterFolder;
        this.directory = `# ${rootName} 项目目录\n\n`;
        this.tree = {
            root: rootName,
            children: []
        }
    }

    useQueryFile(filterFolder) {
        const buildTree = (objectPath, start = '') => {
            const docs = treeSort(fs.readdirSync(objectPath), objectPath);
            docs.forEach(item => {
                const absolutePath = path.join(objectPath, item)
                const state = fs.statSync(absolutePath);
                /**folder*/
                if(state.isDirectory() && !filterFolder.includes(item)) {
                    this.directory += `${start}${directoryEnum.start}${item}${directoryEnum.line}\n`;
                    const level = objectPath.split('\\').length > 1 ? objectPath.split('\\').length -2 : 0;
                    const newStart = directoryEnum.outermost.repeat(level)
                    buildTree(path.join(`${objectPath}\\${item}`), newStart);
                } else {
                    /**file*/
                    this.directory += `${start}${directoryEnum.start}${item}${directoryEnum.line}\n`;
                }
            })
        }
        return {
            buildTree
        }
    }

    run() {
        spinner.start();
        setTimeout(() => {
            const { buildTree } = this.useQueryFile(this.filterFolder);
            buildTree(process.cwd());
            fs.writeFile(this.fileName, this.directory, (error) => {
                if(error){
                    console.log(error(new Error(`write ${ this.fileName} error`, { err })))
                    return;
                }
            })
            spinner.succeed('success !');
        }, 1000)
    }

    useInquirer (fileName){
        const docs = fs.readdirSync(process.cwd());
        this.fileName = fileName;
        if(docs.includes(fileName)) {
            const coverInit = [
                {
                    type:'confirm',
                    name: 'confirm',
                    message: warning(`${cyanBright(fileName)} already exists in the Target directory ${cyanBright(process.cwd())} folder, do you want to continue? (y/n)`),
                    default: 'y'
                },
            ];
            inquirer.prompt(coverInit).then(({confirm}) => {
                if(confirm) {
                    this.run();
                } else console.log(cyanBright('--- Directory has been canceled ---'))
            });
            return;
        }
        this.run();
    }
}

export default EventProcessingCenter