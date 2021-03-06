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

方便记忆，只有简单选择器有优先级，复杂选择器是简单选择器的特殊性值的累加

-   内联样式优先级最高 1，0，0，0。
-   ID 选择器的特殊性值，加 0,1,0,0。
-   类选择器，属性选择器或伪类，加 0，0，1，0。
-   元素和伪元素， 加 0，0，0，1。
-   通配选择器\* 对特殊性没有贡献，即 0，0，0，0。
-   ：not 不参与特殊性

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

### 排版部分

#### 标签，元素，盒

#### 盒模型

包含四个部分

-   margin
-   padding
-   border
-   content

box-sizing 元素宽高计算
content-box
border-box

### 正常流排版

-   收集盒进行
-   计算盒在行中的位置
-   计算行的排布

正常流的行模型

1. vertical-align baseline 是拿自己的 baseline 去对其行的 baseline。
2. vertical-align top middle bottom 拿自己的 顶部 中线 底部 去对其行的顶部。
3. vertical-align text-top text-bottom 拿自己顶部底部去对其行的 text-top 和 text-bottom。

### float 与 clear

### margin 折叠

    margin 折叠 只发生在BFC容器中，margin在正常流中比较奇怪

    BFC是一个容纳了正常流的容器，正常流中放正常流会发生BFC的合并

Tips:

-   block-level 表示可以被放入 bfc
-   block-container 表示可以容纳 bfc
-   block-box = block-level + block-container
-   block-box 如果 overflow 是 visible， 那么就跟父 bfc 合并
-   大家请记住下面这个表现原则：如果一个元素具有 BFC，内部子元素再怎么翻江倒海、翻云覆雨，都不会影响外部的元素。所以，BFC 元素是不可能发生 margin 重叠的，因为 margin 重叠是会影响外部的元素的；BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会影响外部元素的设定。

### flex 排版

-   分行
-   计算主轴方向
-   计算交叉轴的方向
