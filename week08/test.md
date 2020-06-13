请写出下列选择器的优先级

-   div#a.b .c[id=x]

    [0, 1, 3, 1]

-   #a:not(#b)

    [0, 2, 1, 0] 正确为 [0, 2, 0, 0] ：not 不参与

-   \*.a

    [0, 0, 1, 0]

-   div.a

    [0, 0, 1, 1]

问题：
为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢?
因为 first-line 如果可以设置 float 之类的块状属性，就不是 line 了
