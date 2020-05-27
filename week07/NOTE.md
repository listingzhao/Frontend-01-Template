# 每周总结可以写在这里

### CSS 语法的研究

需要查看相关标准 2.1 的语法 [语法](https://www.w3.org/TR/CSS21/grammar.html#q25.0)

css 的总体结构@规则和 rule

### CSS @规则的研究

-   @charset https://www.w3.org/TR/css-syntax-3/
-   @import https://www.w3.org/TR/css-cascade-4/
-   @media https://www.w3.org/TR/css3-conditional/
-   @keyframes https://www.w3.org/TR/css-animations-1/
-   @page https://www.w3.org/TR/css-page-3/
-   @fontface https://www.w3.org/TR/css-fonts-3/
-   @supports https://www.w3.org/TR/css3-conditional/
-   @namespace https://www.w3.org/TR/css-namespaces-3/
-   @counter-style https://www.w3.org/TR/css-counter-styles-3/

### CSS 规则的结构

-   Selector
-   Key
    -   Properties
    -   Variables
-   Value

### 建立自己的 CSS 体系

### 收集标准

```javascript
var lis = document.getElementById('container').children;

var result = [];

for (let li of lis) {
    if (li.getAttribute('data-tag').match(/css/))
        result.push({
            name: li.children[1].innerText,
            url: li.children[1].children[0].href,
        });
}
console.log(result);
```
