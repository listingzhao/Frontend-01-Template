# 每周总结可以写在这里

浏览器解析 HTML 的步骤

1. 使用 FMS 来实现 HTML 文本的分析
2. 将 HTML 文本解析为标签，主要的标签有：开始标签，结束标签和自封闭标签
3. 在状态机中，会加入业务逻辑场景元素，在标签结束状态提交标签 token
4. 处理标签属性，属性值有单引号，双引号，无引号，实际情况需要较多的状态处理，处理属性的方式和处理标签类似，属性结束时候，把属性加到标签 token 上
5. 构建 DOM 树，包括标签和文本

### 使用栈将标签构建成 DOM 树

-   遇到开始标签创建元素并入栈，遇到结束标签时出栈
-   自封闭标签节点可以看做是入栈后立即出栈
-   任何元素的父元素是它入栈前的栈顶

### Css 计算

1. css 规则收集
2. 添加调用 (创建元素后立即计算 css)
3. 查找父元素标识
4. 拆分选择器
5. 计算选择器与元素的匹配
6. 生成 computed 属性
7. 确定规则覆盖关系

### flex 排版

1. 初始化主轴交叉轴
2. 手机元素进行
3. 计算主轴
4. 计算交叉轴

### 绘制

1. 绘制单个元素
2. 绘制 dom
