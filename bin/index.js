#!/usr/bin/env node
const program = require("commander");
const { execSync } = require("child_process")
const path = require("path")
const fs = require("fs")
const currentPath = process.cwd()


async function main(git_repo, projectPath) {
  try {
    console.log('Downloading files...');
    execSync(`git clone --depth 1 https://github.com/Omoalfa/solid-express-boiler.git ${projectPath}`);

    process.chdir(projectPath);

    console.log('Installing dependencies...');
    execSync('npm install');

    console.log('Removing useless files');
    execSync('npx rimraf ./.git');
    fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true});

    console.log('The installation is done, this is ready to use !');
    console.log('start you app with npm run dev... HAPPY CODING!')

  } catch (error) {
    console.log(error);
  }
}


console.log('Hello, world!');

program
  .argument('<file>')
  // .option('-r, --repo <repo>', 'The user to authenticate as')
  .option('-p, --path <path>', "The user's password")
  .action(function(file, options) {
    let projectPath = path.join(currentPath, file);
    if (options.path) {
      projectPath = path.join(currentPath, options.path);
    }
    try {
      fs.mkdirSync(projectPath);
    } catch (err) {
      if (err.code === 'EEXIST') {
        console.log(`The file ${file} already exist in the current directory, please give it another name.`);
      } else {
        console.log(err);
      }
      process.exit(1);
    }

    main(options.repo, projectPath);
  })
  .parse(process.argv);
