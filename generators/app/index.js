'use strict';

var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');
var fs = require('fs');
var engine = require('ejs');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.username = '';
    this.includeJquery = true;
    this.includeBootstrap = false;
    this.includeHandlebars = false;
    this.includeUnderscore = false;
  }

  _updateValues(answers) {
    this.username = answers.username;

    answers.features.forEach(feature => {
      this[feature] = true
    })
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'Who are you?'
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Which features would you like?',
        choices: [
          {
            name: 'Bootstrap',
            value: 'includeBootstrap',
            checked: true
          }, {
            name: 'Handlebars',
            value: 'includeHandlebars',
            checked: true
          }, {
            name: 'Underscore',
            value: 'includeUnderscore',
            checked: true
          }
        ]
      }
    ]).then(answers => this._updateValues(answers));
  }

  writing() {
    // index.html
    this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath('app/index.html'), this);
    this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath('dist/index.html'), this);

    // README.md
    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('app/README.md'), this);

    // package.json
    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this);

    // favicon.ico
    this.fs.copy(this.templatePath('favicon.ico'), this.destinationPath('favicon.ico'));

    // .gitignore
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));

    // .eslintrc
    this.fs.copy(this.templatePath('.eslintrc'), this.destinationPath('.eslintrc'));

    // styles.scss
    this.fs.copy(this.templatePath('styles/styles.scss'), this.destinationPath('app/styles/styles.scss'));

    // main.js
    this.fs.copy(this.templatePath('scripts/index.js'), this.destinationPath('app/scripts/index.js'));
  }

  building() {
    mkdirp('app/images');

    mkdirp('dist/js');
    mkdirp('dist/css');
    mkdirp('dist/images');
  }

  installing() {
    this.npmInstall([], {'loglevel': 'error'})
  }
};
