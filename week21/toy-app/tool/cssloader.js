let css = require('css')
module.exports = function(source, map) {
  let styleSheet = css.parse(source)

  let name = this.resourcePath.match(/([^/]+).css$/)[1]

  console.log(name)

  for (let rule of styleSheet.stylesheet.rules) {
    console.log(rule)
    rule.selectors = rule.selectors.map(selector =>
      selector.match(new RegExp(`^.${name}`))
        ? selector
        : `.${name} ${selector}`
    )
  }
  // css.stringify(obj, options)
  console.log(css.stringify(styleSheet))

  return `let style = document.createElement('style')
  style.innerHTML = ${JSON.stringify(css.stringify(styleSheet))}
  document.documentElement.appendChild(style)`
}
