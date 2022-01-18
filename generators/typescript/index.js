const Generator = require("yeoman-generator");
const path = require("path");

const BASE_RESOURCES = "src/main/resources";

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "list",
        name: "nodePackageManager",
        message: "Enter your Node package manager",
        choices: [
          {
            name: "NPM",
            value: "npm",
          },
          {
            name: "Yarn",
            value: "yarn",
          },
        ],
        default: "yarn",
      },
      {
        type: "input",
        name: "appType",
        message: "Enter your application type",
        default: "sandbox",
      },
      {
        type: "input",
        name: "appId",
        message: "Enter your application ID",
        default: "myAppId",
      },
      {
        type: "input",
        name: "appName",
        message: "Enter your application name",
        default: "myAppName",
      },
      {
        type: "input",
        name: "appDesc",
        message: "Enter your application description",
        default: "",
      },
      {
        type: "input",
        name: "appPublisher",
        message: "Enter your application publisher",
        default: "",
      },
      {
        type: "input",
        name: "appDomain",
        message: "Enter your application domain",
        default: "localhost",
      },
    ]);
  }

  async writing() {
    // copy input options as answers to be used in templates
    /*this.answers.host = this.options.host;
    this.answers.username = this.options.username;
    this.answers.framework = this.options.framework;
    this.answers.application = this.options.application;
    this.answers.appId = this.options.appId;*/

    // npm/yarn install wil be executed after installation, then it will use the one selected by the user
    this.env.options.nodePackageManager = this.answers.nodePackageManager;

    // Copy all non-dotfiles
    this.fs.copy(
      [this.templatePath("**"), "!bundle.json", "!src/index.ts"], // TODO Fix, because it copies all the files (also bundle.json and src/index.ts)
      this.destinationRoot()
    );

    // Process bundle.json file
    this.fs.copyTpl(
      [this.templatePath("bundle.json"), this.templatePath("src/index.ts")],
      this.destinationRoot(),
      this.answers
    );
  }

  /**
   * Build Maven or Gradle project
   */
  install() {}

  end() {
    this.log(`Your ExtApp project has been successfully generated !`.cyan.bold);
  }
};
