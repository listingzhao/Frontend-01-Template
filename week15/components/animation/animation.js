export class Timeline {
  constructor() {
    this.animations = []
    this.requestID = ''
    this.state = 'inited'
  }

  tick() {
    let t = Date.now() - this.startTime
    console.log(t)
    let animations = this.animations.filter(animation => !animation.finished)
    for (let animation of this.animations) {
      let {
        object,
        property,
        start,
        end,
        timingFunction,
        delay,
        template,
        duration,
        addTime
      } = animation

      let progression = timingFunction((t - delay - addTime) / duration) // 0-1 之间的数
      if (t > duration + delay) {
        progression = 1
        animation.finished = true
      }
      let value = animation.valueFromProgression(progression) // value 就是根据progression算出的当前值
      object[property] = template(value)
    }
    if (animations.length) {
      this.requestID = requestAnimationFrame(() => this.tick())
    }
  }
  pause() {
    if (this.state !== 'inited') return
    this.state = 'pause'
    this.pauseTime = Date.now()
    if (this.requestID) {
      cancelAnimationFrame(this.requestID)
    }
  }

  resume() {
    if (this.state !== 'pause') return
    this.state = 'resume'
    // 继续开始时间= 当前时间 - 暂停时间 + 最初开始时间
    this.startTime += Date.now() - this.pauseTime
    this.tick()
  }

  start() {
    if (this.state !== 'inited') return
    this.state = 'playing'
    this.startTime = Date.now()
    this.tick()
  }

  restart() {
    if (this.state === 'playing') this.pause()
    this.animations = []
    this.requestID = ''
    this.state = 'inited'
    this.pauseTime = null
    this.start()
  }

  add(animation, addTime) {
    animation.finished = false
    if (this.state === 'playing') {
      animation.addTime =
        addTime !== void 0 ? addTime : Date.now() - this.startTime
    } else {
      animation.addTime = addTime !== void 0 ? addTime : 0
    }

    this.animations.push(animation)
  }
}

export class Animation {
  constructor(
    object,
    property,
    start,
    end,
    duration,
    delay,
    timingFunction,
    template
  ) {
    this.object = object
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay || 0
    this.timingFunction = timingFunction
  }

  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start)
  }
}

export class ColorAnimation {
  constructor(
    object,
    property,
    start,
    end,
    duration,
    delay,
    timingFunction,
    template
  ) {
    this.object = object
    this.property = property
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay || 0
    this.timingFunction = timingFunction
    this.template = template || (v => `rgba(${v.r}, ${v.g},${v.b},${v.a})`)
  }

  valueFromProgression(progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a)
    }
  }
}

/*
* 
let animation = new Animation(object, property, start, end, duration, delay, timingFunction)
let animation2 = new Animation(object, property, start, end, duration, delay, timingFunction)

let timeline  = new TimeLine()

timeline.add(animation)
timeline.add(animation2)

timeline.start()
timeline.pause()
timeline.resume()
timeline.stop()

setTimout
setInterval
requestAnimationFrame

*/
