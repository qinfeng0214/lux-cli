#! /usr/bin/env node
import packageConfig from '../package.json' assert { type: "json" }

// 命令行指令配置
import { Command } from 'commander';

// // 命令行美化
import chalk from 'chalk'

// 生成基于ASCII的艺术字
import figlet from 'figlet'


// 解析用户执行时输入的参数

const program = new Command();
program
  .command("create <project-name>") // 增加创建指令
  .description("create a new project") // 添加描述信息
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action( async (projectName, cmd) => {
    // 引入 create 模块，并传入参数
    try {
      const modules = await import ('../lib/create.js')
      modules.create(projectName, cmd)
    } catch (error) {
      console.log(error)
    }
  })
program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set option[key] is value")
  .option("-d, --delete <key>", "delete option by key")
  .action((value, keys) => {
    console.log(value, keys);
  });

program.on("--help", function () {
  console.log(
    "\r\n" +
      figlet.textSync("lux-cli", {
        font: "3D-ASCII",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
  );
  // 前后两个空行调整格式，更舒适
  console.log();
  console.log(
    `Run ${chalk.cyan(
      "lux-cli <command> --help"
    )} for detailed usage of given command.`
  );
  console.log();
});

program
  .name("lux-cli")
  .usage(`<command> [option]`)
  .version(`lux-cli ${packageConfig.version}`);

program.parse(process.argv);