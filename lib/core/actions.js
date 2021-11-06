const { promisify } = require("util");
const path = require("path");

const download = promisify(require("download-git-repo"));
const open = require("open");

const { vueRepo } = require("../config/repo-config");
const { commandSpawn } = require("../utils/terminal");
const { compile, writeToFile } = require("../utils/utils");

const createProjectAction = async (project) => {
  console.log("wwq help you create your project~");

  // 1.clone项目
  await download(vueRepo, project, { clone: true });

  // 2.执行npm install
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  await commandSpawn(command, ["install"], { cwd: `./${project}` });

  // 3.运行npm run server
  commandSpawn(command, ["run", "serve"], { cwd: `./${project}` });

  // 4.打开浏览器, 在3之前打开, 或者3不加await
  open("http://localhost:8080/");
};

// 添加组件的action
const addComponentsAction = async (name, dest) => {
  // 1. 有对应的ejs模版
  // 2. 编译ejs模版 result
  const result = await compile("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  // 3. 将result写入到.vue文件中
  const targetPath = path.resolve(dest, `${name}.vue`);
  console.log(targetPath);
  writeToFile(targetPath, result);

  // 4. 放到对应的文件夹中
};

// 添加组件和路由
const addPageAndRoute = async (name, dest) => {
  // 1. 编译ejs模版
  const data = {name, lowerName: name.toLowerCase()}
  const pageResult = await compile("vue-component", {
    name,
    lowerName: name.toLowerCase(),
  });
  const routeResult = await compile("vue-route", {
    name,
    lowerName: name.toLowerCase(),
  });
  // 2. 写入文件
  const targetPagePath = path.resolve(dest, `${name}.vue`);
  const targetRoutePath = path.resolve(dest, 'router.js');
  writeToFile(targetPagePath, pageResult)
  writeToFile(targetRoutePath, routeResult)

};

module.exports = {
  createProjectAction,
  addComponentsAction,
  addPageAndRoute,
};
