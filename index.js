#!/usr/bin/env node
const program = require("commander");

const createCommands = require("./lib/core/create");
const helpOptions = require("./lib/core/help");

// 查看版本号
program.version(require("./package.json").version);

// 帮助和可选信息
helpOptions();

// 创建其他指令
createCommands();

program.parse(process.argv);
