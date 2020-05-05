# 每周总结可以写在这里

# JavaScript
- Atom
- Expression
- Statement
- Structure
- Program/Module

# Atom 

# Grammar 
- 简单语句
- 组合语句
- 声明

# Expressions
Member
- a.b
- a[b]
- foo`string`
- super.b
- super['b']
- new.target
- new Foo()

New
- new Foo

Call
- foo()
- super()
- foo()['b']
- foo().b

Left Handside & Right Handside

Unary
- delete a.b
- void foo()
- typeof a
- + a
- - a
- ~ a
- ! a
- await a

```javascript
for(var i = 0; i < 10; i++) {
  console.log(i);
    var button = document.createElement("button");
    button.innerHTML = i
    document.body.appendChild(button);
    (function(i) {
        button.onclick = function() {
            console.log(i);
        }
    })(i)
}
```

# Runtime
- Completion Record
- Lexical Environment


## Completion Record
- [[type]] normal, break, continue, return, or throw
- [[value]] Types
- [[target]] label

### block 
- BlockStatement

### Iteration 
- while()
- do while()
- for (声明;;)
- for( 声明 in )
- for ( 声明 of )

### 标签、循环、break、 continue

### try catch finally

### 声明

### 预处理

### 作用域

# Object

### Object - Class

### Object - Prototype
原型式一种更接近人类原始认知的描述对象的方法。我们并不视图做严谨的分类，而是采用相似这样的方式去描述对象。任何对象仅仅需要描述它自己与原型的区别即可。

### Object Exercise

### Object API / Grammar 
- {} . [] Object.defineProperty
- Object.create / Object.setProtptypeOf / Object.getPrototypeOf
- new / class /extends
- new /function / prototype

### function Object 
