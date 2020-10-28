var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)
  }

  method1() {
    this.log('method 1 just ran')
  }

  creating() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { title: 'temp-name' }
    )
    this.fs.copyTpl(
      this.templatePath('createElement.js'),
      this.destinationPath('lib/createElement.js')
    )
    this.fs.copyTpl(
      this.templatePath('gesture'),
      this.destinationPath('lib/gesture')
    )
    this.fs.copyTpl(
      this.templatePath('main.test.js'),
      this.destinationPath('test/main.test.js')
    )
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js')
    )
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html')
    )
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    )
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    )
    this.fs.copyTpl(this.templatePath('.nycrc'), this.destinationPath('.nycrc'))
    this.npmInstall(
      [
        'webpack',
        'webpack-cli',
        'webpack-dev-server',
        'html-webpack-plugin',
        '@babel/core',
        '@babel/preset-env',
        '@babel/plugin-transform-react-jsx',
        'babel-loader',
        'mocha',
        'nyc',
        '@istanbuljs/nyc-config-babel',
        'babel-plugin-istanbul',
        '@babel/register'
      ],
      {
        'save-dev': true
      }
    )
    // this.fs.copyTpl(
    //   this.templatePath('index.html'),
    //   this.destinationPath('public/index.html'),
    //   { title: 'Templating with Yeoman' }
    // )
  }
}
