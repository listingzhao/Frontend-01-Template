# 每周总结可以写在这里

### Animation

-   @keyframes 定义
-   animation 使用

属性

-   animation-name 时间曲线
-   animation-duration 动画的时长
-   animation-timing-function 动画的时间曲线
-   animation-delay 动画开始前的延迟
-   animation-iteration-count 动画的播放次数
-   animation-direction 动画的方向

### Transition

-   transition-property 要变化的属性
-   transition-delay 延迟
-   transition-duration 变化的时长
-   transition-timing-function 变化的时间曲线

### 渲染和颜色

形状
border
box-shadow
box-radius

-   data uri + svg

### HTML 语言和扩展

### HTML 语法

合法元素

-   Element: <tagname> ... </tagname>
-   Text: text
-   Comment: <!-- comments -->
-   DocumentType: <!Doctype html>
-   ProcessingInstruction: <?a 1?>
-   CDATA: <![CDATA[]]>

字符引用

-   &#161;
-   &amp;
-   &lt;
-   &quot;

### DOM 操作

导航类操作

-   parentNode
-   childNodes
-   firstChild
-   lastChild
-   nextSibling
-   previousSibling

修改操作

-   appendChild
-   insertBefore
-   removeChild
-   replaceChild

高级操作

-   compareDocumentPosition 是一个用于比较两个节点中关系的函数
-   contains 检查一个节点是否包含另一个节点的函数
-   isEqualNode 检查两个节点是否完全相同
-   isSameNode 检查两个节点是否是同一个节点 js 中可以用 ===
-   cloneNode 复制一个节点 传入参数 true ，则返回元素做深拷贝
