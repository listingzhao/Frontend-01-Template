# 每周总结可以写在这里

### 选择器语法

简单选择器

-   `*`
-   div svgla
-   .cls
-   [attr=value]
-   :hober
-   ::before

复合选择器

-   <简单选择器> <简单选择器> <简单选择器>
-   `*` 或者 div 必须写在最前面

复杂选择器

-   <复合选择器> <sp> <复合选择器>
-   <复合选择器> ">" <复合选择器>
-   <复合选择器> "~" <复合选择器>
-   <复合选择器> "+" <复合选择器>
-   <复合选择器> "||" <复合选择器>

### 选择器的优先级

### 伪类

链接/行为

-   :any-link
-   :link :visited
-   :hover
-   :active
-   :focus
-   :target

树结构

-   :empty
-   :nth-child()
-   :nth-last-child()
-   :first-child :last-child :only-child

逻辑型

-   :not 伪类
-   :where :has

### 伪元素

-   ::before
-   ::after
-   ::firstLine
-   ::first-letter

可用属性
first-line

-   font 系列
-   color 系列
-   background 系列
-   word-spacing
-   letter-spacing
-   text-decoration
-   text-transform
-   line-height

first-letter

-   font 系列
-   color 系列
-   background 系列
-   word-spacing
-   letter-spacing
-   text-decoration
-   text-transform
-   line-height
-   float
-   vertical-align
-   盒模型系列： margin，padding，border
