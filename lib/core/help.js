const program = require("commander");

const helpOptions = () => {
  // 增加自己的option
  program.option("-w --wwq", "a cli made by wwq");
  program.option(
    "-d --dest <dest>",
    "a destination folder, 例如: -d /src/components"
  );
  program.option("-f --framework <framework>", "模版类型, 例如: -f vue");

  program.on("--help", function () {
    console.log();
    console.log("Other: ");
    console.log("   other options~ ");
  });
};

module.exports = helpOptions;
