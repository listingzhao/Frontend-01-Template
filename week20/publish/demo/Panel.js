import { Timeline, Animation } from './animation/animation'
import { cubicBezier, ease } from './animation/cubicBezier'
import { createElement } from './createElement'

import { enableGesture } from './gesture'

export class Panel {
  constructor() {
    this.children = []
  }

  setAttribute(name, value) {
    this[name] = value
  }

  appendChild(child) {
    // children
    this.children.push(child)
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }

  render() {
    return (
      <div class="panel" style="border: 1px solid lightgreen; width: 300px">
        <h1 style="background-color: lightgreen; width: 300px; margin: 0">
          {this.title}
        </h1>
        <div style="width: 300px;min-height: 300px">{this.children}</div>
      </div>
    )
  }
}
