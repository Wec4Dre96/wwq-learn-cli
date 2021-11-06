const program = require("commander");

const {
  createProjectAction,
  addComponentsAction,
  addPageAndRoute,
} = require("./actions");

const createCommands = () => {
  program
    .command("create <project> [others...]")
    .description("clone repository into a folder")
    .action(createProjectAction);

  program
    .command("addcpn <name>")
    .description(
      "add a vue component, 例如: wwq addcpn HelloWorld -d src/components"
    )
    .action((name) =>
      addComponentsAction(name, program.dest || "src/components")
    );

  program
    .command("addpage <page>")
    .description(
      "add vue page and router config, 例如: wwq addapge Home [-d src/pages]"
    )
    .action((page) => {
      addPageAndRoute(page, program.dest || "src/pages");
    });
};

module.exports = createCommands;
