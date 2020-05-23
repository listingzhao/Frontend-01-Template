function layout(ele) {
  if (!ele.computedStyle) {
    return
  }
  let eleStyle = getStyle(ele)
  if (eleStyle.display != 'flex') {
    return
  }
  let items = ele.children.filter(item => item.type == 'element')
  item.sort((a, b) => {
    return (a.order || 0) - (b.order || 0)
  })

  let style = eleStyle
  ;[('width', 'height')].forEach(k => {
    if (style[k] == 'auto' || style[k] == '') {
      style[k] = null
    }
  })

  // flex default value
  if (!style.flexDirection || style.flexDirection == 'auto') {
    style.flexDirection = 'row'
  }
  if (!style.alignItems || style.alignItems == 'auto') {
    style.alignItems = 'stretch'
  }
  if (!style.justifyContent || style.justifyContent == 'auto') {
    style.justifyContent = 'flex-start'
  }
  if (!style.alignContent || style.alignContent == 'auto') {
    style.alignContent = 'stretch'
  }
  if (!style.flexWrap || style.flexWrap == 'auto') {
    style.flexWrap = 'nowrap'
  }

  let mainSize,
    mainStart,
    mainEnd,
    mainSign,
    mainBase,
    crossSize,
    crossStart,
    crossEnd,
    crossSign,
    crossBase

  if (style.flexDirection == 'row') {
    mainSize = 'width'
    mainStart = 'left'
    mainEnd = 'right'
    mainBase = 0
    mainSign = +1

    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }

  if (style.flexDirection == 'row-reverse') {
    mainSize = 'width'
    mainStart = 'right'
    mainEnd = 'left'
    mainBase = style.width
    mainSign = -1

    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }

  if (style.flexDirection == 'column') {
    mainSize = 'height'
    mainStart = 'top'
    mainEnd = 'bottom'
    mainBase = 0
    mainSign = +1

    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }

  if (style.flexDirection == 'column-reverse') {
    mainSize = 'height'
    mainStart = 'bottom'
    mainEnd = 'top'
    mainBase = style.height
    mainSign = -1

    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }

  if (style.flexWrap == 'wrap-reverse') {
    let tmp = crossStart
    crossStart = crossEnd
    crossEnd = tmp
    crossSign = -1
  } else {
    crossSign = 1
    crossBase = 0
  }
}

function getStyle(ele) {
  if (!ele.style) {
    ele.style = {}
  }
  for (let property of ele.computedStyle) {
    ele.style[property] = ele.computedStyle[property].value

    if (ele.style[property].toString().match(/px$/)) {
      ele.style[property] = parseInt(ele.computedStyle[property])
    }
    if (ele.style[property].toString().match(/^0-9\.+$/)) {
      ele.style[property] = parseInt(ele.computedStyle[property])
    }
  }

  return ele.style
}

module.exports = {
  layout
}
