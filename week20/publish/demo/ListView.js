import { Timeline, Animation } from './animation/animation'
import { cubicBezier, ease } from './animation/cubicBezier'
import { createElement } from './createElement'

import { enableGesture } from './gesture'

export class ListView {
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

  mountTo(parent) {
    this.render().mountTo(parent)
  }

  render() {
    let data = this.getAttribute('data')
    return (
      <div class="list" style=" width: 300px">
        {data.map(this.children[0])}
      </div>
    )
  }
}
