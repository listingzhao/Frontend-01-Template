function match(string) {
  let state = start
  for (let c of string) {
    console.log(c)
    state = state(c)
  }
  return state === end
}

function start(c) {
  if (c === 'a') {
    return foundA
  } else {
    return start
  }
}

function end(c) {
  return end
}

function foundA(c) {
  if (c === 'b') {
    return foundB
  } else {
    return start(c)
  }
}

function foundB(c) {
  if (c === 'c') {
    return end
  } else {
    return start(c)
  }
}

function foundC(c) {
  if (c === 'd') {
    return foundD
  } else {
    return start(c)
  }
}

function foundD(c) {
  if (c === 'e') {
    return foundE
  } else {
    return start(c)
  }
}

function foundE(c) {
  if (c === 'f') {
    return end
  } else {
    return start(c)
  }
}

console.log(match('aabc'))

// abcabx

function match(string) {
  let state = start
  for (let c of string) {
    console.log(c)
    state = state(c)
  }
  return state === end
}

function start(c) {
  if (c === 'a') {
    return foundA
  } else {
    return start
  }
}

function end(c) {
  return end
}

function foundA(c) {
  if (c === 'b') {
    return foundB
  } else {
    return start(c)
  }
}

function foundB(c) {
  if (c === 'c') {
    return end
  } else {
    return start(c)
  }
}

function foundC(c) {
  if (c === 'd') {
    return foundA2
  } else {
    return start(c)
  }
}

function foundA2(c) {
  if (c === 'b') {
    return foundB2
  } else {
    return start(c)
  }
}

function foundB2(c) {
  if (c === 'x') {
    return end
  } else {
    return foundB(c)
  }
}

console.log(match('abcabcabx'))

// abababx

function match(string) {
  let state = start
  for (let c of string) {
    console.log(c)
    state = state(c)
  }
  return state === end
}

function start(c) {
  if (c === 'a') {
    return foundA
  } else {
    return start
  }
}

function end(c) {
  return end
}

function foundA(c) {
  if (c === 'b') {
    return foundB
  } else {
    return start
  }
}

function foundB(c) {
  if (c === 'a') {
    return foundA2
  } else {
    return start
  }
}

function foundA2(c) {
  if (c === 'b') {
    return foundB2
  } else {
    return start
  }
}

function foundB2(c) {
  if (c === 'a') {
    return foundA3
  } else {
    return start
  }
}

function foundA3(c) {
  if (c === 'b') {
    return foundB3
  } else {
    return start
  }
}

function foundB3(c) {
  if (c === 'x') {
    return end
  } else {
    return start
  }
}

console.log(match('abababx'))
