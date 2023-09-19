// create-file.js
// command: yarn create-file-vue <ProjectName> <mode: views/components> <FileName> <typeBase:dictionary-detail/dictionary-list>
//Ex: yarn create-project-vue MISA.QLCH.WebSupport

const fs = require('fs');
const path = require('path');
const file = require('../library/file');
const folder = require('../library/folder');
const fileNameConvention = require('../library/convention-file');
try {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error('Usage: node create-project-template.js <file-name>');
        process.exit(1);
    }
    const projectName = args[0];
    const folderSevenZipPath = path.join(__dirname, '..', 'blank','ProjectVue.7z');
    const folderProjectPath = path.join(__dirname,'..','..',projectName);
    folder.decompressor(folderSevenZipPath,projectName)


} catch (error) {
    console.error(`Error creating module: ${error.message} in ${error.stack}`);
}
