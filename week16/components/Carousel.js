import { Timeline, Animation } from './animation/animation'
import { cubicBezier, ease } from './animation/cubicBezier'
import { createElement } from './createElement'

import { enableGesture } from './gesture'

export class Carousel {
  constructor() {
    this.data = []
  }

  setAttribute(name, value) {
    this[name] = value
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }

  render() {
    let tl = new Timeline()

    tl.start()

    let position = 0

    let nextPicStopHandler = null

    let children = this.data.map((url, currentPosition) => {
      let nextPosition = (currentPosition + 1) % this.data.length
      let lastPosition =
        (currentPosition - 1 + this.data.length) % this.data.length

      let offset = 0

      // 开始位置
      let onStart = () => {
        tl.pause()
        clearTimeout(nextPicStopHandler)

        let currentElement = children[currentPosition]

        let currentTransformValue = Number(
          currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]
        )
        // 当前偏移值
        offset = currentTransformValue + 500 * currentPosition
      }

      // pan
      let onPan = event => {
        const { clientX, startX } = event.detail
        // 手势偏移值
        let dx = clientX - startX
        let lastElement = children[lastPosition]
        let currentElement = children[currentPosition]
        let nextElement = children[nextPosition]
        // console.log(offset)
        // dom 实际值
        let currentTransformValue = -500 * currentPosition + offset + dx
        let lastTransformValue = -500 - 500 * lastPosition + offset + dx
        let nextTransformValue = 500 - 500 * nextPosition + offset + dx

        lastElement.style.transform = `translateX(${lastTransformValue}px)`
        currentElement.style.transform = `translateX(${currentTransformValue}px)`
        nextElement.style.transform = `translateX(${nextTransformValue}px)`
      }

      let onPanend = event => {
        let direction = 0
        const { clientX, startX } = event.detail
        // 手势偏移值
        let dx = clientX - startX

        if (dx + offset > 250) {
          direction = 1
        } else if (dx < -250) {
          direction = -1
        }

        tl.reset()
        tl.start()

        let lastElement = children[lastPosition]
        let currentElement = children[currentPosition]
        let nextElement = children[nextPosition]

        let lastAnimation = new Animation(
          lastElement.style,
          'transform',
          -500 - 500 * lastPosition + offset + dx,
          -500 - 500 * lastPosition + direction * 500,
          500,
          0,
          ease,
          v => `translateX(${v}px)`
        )
        let currentAnimation = new Animation(
          currentElement.style,
          'transform',
          -500 * currentPosition + offset + dx,
          -500 * currentPosition + direction * 500,
          500,
          0,
          ease,
          v => `translateX(${v}px)`
        )

        let nextAnimation = new Animation(
          nextElement.style,
          'transform',
          500 - 500 * nextPosition + offset + dx,
          500 - 500 * nextPosition + direction * 500,
          500,
          0,
          ease,
          v => `translateX(${v}px)`
        )
        tl.add(lastAnimation)
        tl.add(currentAnimation)
        tl.add(nextAnimation)

        position = (position - direction + this.data.length) % this.data.length

        nextPicStopHandler = setTimeout(nextPic, 3000)
      }
      let element = (
        <img
          src={url}
          onStart={onStart}
          onPan={onPan}
          onPanend={onPanend}
          enableGesture={true}
        />
      )
      element.style.transform = 'translateX(0px)'
      element.addEventListener('dragstart', e => e.preventDefault())

      return element
    })
    let root = <div class="carousel">{children}</div>

    let nextPic = () => {
      let width = 500

      let nextPosition = (position + 1) % this.data.length

      let current = children[position]

      let next = children[nextPosition]

      let currentAnimation = new Animation(
        current.style,
        'transform',
        -100 * position,
        -100 - 100 * position,
        500,
        0,
        ease,
        v => `translateX(${5 * v}px)`
      )

      let nextAnimation = new Animation(
        next.style,
        'transform',
        100 - 100 * nextPosition,
        -100 * nextPosition,
        500,
        0,
        ease,
        v => `translateX(${5 * v}px)`
      )

      tl.add(currentAnimation)
      tl.add(nextAnimation)

      position = nextPosition

      nextPicStopHandler = setTimeout(nextPic, 3000)
    }

    nextPicStopHandler = setTimeout(nextPic, 3000)

    // 鼠标操作
    // root.addEventListener('mousedown', event => {
    //   let startX = event.clientX,
    //     startY = event.clientY

    //   let nextPosition = (position + 1) % this.data.length
    //   let lastPosition = (position - 1 + this.data.length) % this.data.length

    //   let current = children[position]
    //   let last = children[lastPosition]
    //   let next = children[nextPosition]

    //   current.style.transition = 'ease 0s'
    //   last.style.transition = 'ease 0s'
    //   next.style.transition = 'ease 0s'

    //   current.style.transform = `translateX(${-500 * position}px)`

    //   last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`

    //   next.style.transform = `translateX(${500 - 500 * nextPosition}px)`

    //   let move = event => {
    //     current.style.transform = `translateX(${event.clientX -
    //       startX -
    //       500 * position}px)`
    //     last.style.transform = `translateX(${event.clientX -
    //       startX -
    //       500 -
    //       500 * lastPosition}px)`
    //     next.style.transform = `translateX(${event.clientX -
    //       startX +
    //       500 -
    //       500 * nextPosition}px)`
    //   }

    //   let up = event => {
    //     let offset = 0

    //     if (event.clientX - startX > 250) {
    //       offset = 1
    //     } else if (event.clientX - startX < -250) {
    //       offset = -1
    //     }

    //     current.style.transition = ''
    //     last.style.transition = ''
    //     next.style.transition = ''

    //     current.style.transform = `translateX(${offset * 500 -
    //       500 * position}px)`
    //     last.style.transform = `translateX(${offset * 500 -
    //       500 -
    //       500 * lastPosition}px)`
    //     next.style.transform = `translateX(${offset * 500 +
    //       500 -
    //       500 * nextPosition}px)`

    //     position = (position - offset + this.data.length) % this.data.length

    //     document.removeEventListener('mousemove', move)
    //     document.removeEventListener('mouseup', up)
    //   }
    //   document.addEventListener('mousemove', move)
    //   document.addEventListener('mouseup', up)
    // })
    return root
  }
}
