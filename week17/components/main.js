import { createElement } from './createElement'

import { Carousel } from './Carousel'
import { Panel } from './Panel'
import { TabPanel } from './TabPanel'
import { ListView } from './ListView'

// class MyComponent {
//   constructor() {
//     this.children = []
//     this.attributes = new Map()
//     this.properties = new Map()
//   }

//   setAttribute(name, value) {
//     // attribute
//     this.attributes.set(name, value)
//   }

//   set title(value) {
//     this.properties.set('title', value)
//   }

//   mountTo(parent) {
//     this.slot = <div></div>
//     for (let child of this.children) {
//       this.slot.appendChild(child)
//     }
//     this.render().mountTo(parent)
//   }

//   appendChild(child) {
//     // children
//     this.children.push(child)
//   }

//   render() {
//     return (
//       <article>
//         <h2>{this.properties.get('title')}</h2>
//         <header>I'm a header</header>
//         {this.slot}
//         <footer>I'm a header</footer>
//       </article>
//     )
//   }
// }

// let component = (
//   <div id="id" class="b" style="width:100px;height: 100px ; background: red;">
//     <div></div>
//     <p></p>
//     <div></div>
//     <div></div>
//   </div>
// )
let component = (
  <Carousel
    data={[
      'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg ',
      'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg ',
      'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
      'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg '
    ]}
  ></Carousel>
)

// let panel = (
//   <TabPanel title="this my panel">
//     <span title="title1">This is content1</span>
//     <span title="title2">This is content2</span>
//     <span title="title3">This is content3</span>
//     <span title="title4">This is content4</span>
//   </TabPanel>
// )

// let data = [
//   {
//     title: '蓝猫',
//     url:
//       'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg'
//   },
//   {
//     title: '橘猫',
//     url:
//       'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg'
//   },
//   {
//     title: '蓝猫加白',
//     url:
//       'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg'
//   },
//   {
//     title: '橘猫加白',
//     url:
//       'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg '
//   }
// ]

// let list = (
//   <ListView data={data}>
//     {record => (
//       <figure>
//         <img src={record.url}></img>
//         <figcaption>{record.title}</figcaption>
//       </figure>
//     )}
//   </ListView>
// )

component.mountTo(document.body)

// component.title = "I'm a title 2"

// component.mountTo(document.body)

// var component = createElement(
//   Parent,
//   {
//     id: 'id',
//     class: 'b'
//   },
//   createElement(Child, null),
//   createElement(Child, null),
//   createElement(Child, null)
// )

// console.log(component)
// component.setAttribute('id', 'a')
