# 每周总结可以写在这里

### 四则运算词法分析

四则运算

-   TokenNumber: 1 2 3 4 5 6 7 8 9 0 组合
-   Operator: +, -, \* , / 之一
-   WhiteSpace <SP>
-   LineTerminator <LF><CR>

四则运算产生式

<Expression> ::= <AdditiveExpression> <EOF>

<AdditiveExpression> ::=
<MultiplicativeExpression>
| <AdditiveExpression><+><MultiplicativeExpression>
| <AdditiveExpression><-><MultiplicativeExpression>

<MultiplicativeExpression> ::=
<Number>
| <MultiplicativeExpression><\*><Number>
| <MultiplicativeExpression></><Number>

LL 语法分析

<AdditiveExpression> ::=
<MultiplicativeExpression>
| <AdditiveExpression><+><MultiplicativeExpression>
| <AdditiveExpression><-><MultiplicativeExpression>

<AdditiveExpression> ::=
<Number>
| <MultiplicativeExpression><\*><Number>
| <MultiplicativeExpression></><Number>
| <AdditiveExpression><+><MultiplicativeExpression>
| <AdditiveExpression><-><MultiplicativeExpression>

### 字符串算法

主要掌握

-   字典树
-   KMP
-   WildCard 通配符算法
