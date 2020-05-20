const css = require('css')
let rules = []

function addCSSRules(text) {
  var ast = css.parse(text)
  console.log(JSON.stringify(ast, null, '    '))
  rules.push(...ast.stylesheet.rules)
}

function computeCSS(stack, ele) {
  var elements = stack.slice().reverse()
}

module.exports = {
  addCSSRules,
  computeCSS,
  rules
}
