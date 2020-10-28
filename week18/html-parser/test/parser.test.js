import { parseHTML } from '../src/parser.js'
let assert = require('assert')

it('parse a single element', function() {
  let doc = parseHTML('<div></div>')
  let div = doc.children[0]
  assert.equal(div.tagName, 'div')
  assert.equal(div.children.length, 0)
  assert.equal(div.type, 'element')
  assert.equal(div.attributes.length, 2)
})

it('parse a single element with text content', function() {
  let doc = parseHTML('<div>hello</div>')
  // console.log(doc)
  let text = doc.children[0].children[0]

  assert.equal(text.content, 'hello')
  assert.equal(text.type, 'text')

  // console.log(text)
})

it('tag mismatch', () => {
  try {
    let doc = parseHTML('<div></vdi>')
  } catch (e) {
    assert.equal(e.message, "Tag start end doesn't match!")
  }
})

it('tag with <', () => {
  let doc = parseHTML('<div>a < b</div>')
  let text = doc.children[0].children[0]
  assert.equal(text.content, 'a < b')
  assert.equal(text.type, 'text')
})

it('with property', () => {
  let doc = parseHTML('<div id=a class=\'cls\' data="abc" ></div>')
  let div = doc.children[0]
  let count = 0
  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }
    if (attr.name === 'class') {
      count++
      assert.equal(attr.value, 'cls')
    }
    if (attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }

  assert.ok(count === 3)
})

it('with property 2', () => {
  let doc = parseHTML('<div id=a class=\'cls\' data="abc"></div>')
  let div = doc.children[0]
  let count = 0
  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }
    if (attr.name === 'class') {
      count++
      assert.equal(attr.value, 'cls')
    }
    if (attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }

  assert.ok(count === 3)
})

it('with property 3', () => {
  let doc = parseHTML('<div id=a class=\'cls\' data="abc"/>')
  let div = doc.children[0]
  let count = 0
  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }
    if (attr.name === 'class') {
      count++
      assert.equal(attr.value, 'cls')
    }
    if (attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }

  assert.ok(count === 3)
})

it('script', () => {
  let content = `
  <div>abcd</div>
  <span>x</span>
  /script>
  <script
  <
  </
  </s
  </sc
  </scr
  </scri
  </scrip
  </script `
  let doc = parseHTML(`<script>${content}</script>`)
  let text = doc.children[0].children[0]

  console.log(text.content)

  // assert.equal(text.content, content)
  assert.equal(text.type, 'text')
})

it('attribute with no value', () => {
  let doc = parseHTML('<div class />')
})

it('attribute with no value', () => {
  let doc = parseHTML('<div class id/>')
})

it('attribute with no value', () => {
  let doc = parseHTML('<div/>')
})
