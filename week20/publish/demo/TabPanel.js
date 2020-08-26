import { Timeline, Animation } from './animation/animation'
import { cubicBezier, ease } from './animation/cubicBezier'
import { createElement } from './createElement'

import { enableGesture } from './gesture'

export class TabPanel {
  constructor() {
    this.children = []
    this.state = 0
  }

  setAttribute(name, value) {
    this[name] = value
  }

  getAttribute(name) {
    return this[name]
  }

  appendChild(child) {
    // children
    this.children.push(child)
  }

  select(i) {
    for (let view of this.childViews) {
      view.style.display = 'none'
    }
    for (let view of this.titleViews) {
      view.classList.remove('selected')
    }
    this.childViews[i].style.display = ''
    this.titleViews[i].classList.add('selected')
    // this.titleView.innerText = this.children[i].title
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }

  render() {
    this.childViews = this.children.map(child => (
      <div style=" width: 300px;min-height: 300px">{child}</div>
    ))
    this.titleViews = this.children.map((child, i) => (
      <div
        onClick={() => this.select(i)}
        style="background-color: lightgreen; margin: 0; flex: 1;"
      >
        <span>{child.getAttribute('title') || ''}</span>
      </div>
    ))
    setTimeout(this.select(0), 16)
    return (
      <div class="panel" style="border: 1px solid lightgreen; width: 300px">
        <h2 class="titleView" style="background-color: lightgreen; width: 300px; margin: 0; display: flex;">
          {this.titleViews}
        </h2>
        <div style="width: 300px;min-height: 300px">{this.childViews}</div>
      </div>
    )
  }
}
