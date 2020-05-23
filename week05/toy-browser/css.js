const css = require('css');
const EOF = Symbol('EOF');

let rules = [];

let currentToken = {
    id: '',
    classArray: [],
};
let currentAttribute = null;

let cName = '';

function isCompositeSelect(selector) {
    if ((selector.indexOf('#') > -1 && selector.indexOf('.') > -1) || selector.indexOf('[') > -1) {
        parserSelect(selector);
        return true;
    }
    return false;
}

function emit(token) {
    // console.log(token);
}

function parserSelect(string) {
    currentToken.id = '';
    currentToken.classArray = [];
    let state = data;
    for (let c of string) {
        state = state(c);
    }
    state = state(EOF);
}

function data(c) {
    if (c == '#' || c == '.') {
        return selectorName(c);
    } else if (c == EOF) {
        emit(EOF);
        return;
    } else {
        return selectorName(c);
    }
}

function selectorName(c) {
    if (c == '#') {
        return idName(c);
    } else if (c == '.') {
        return selectorName;
    } else if (c.match(/^[a-zA-Z]$/)) {
    } else {
        return data;
    }
}

function idName(c) {
    if (c == EOF) {
        emit(currentToken);
    } else if (c == '#') {
        return beforeIdName(c);
    } else if (c == '.') {
        return beforeClsName(c);
    } else {
        currentToken.id += c;
        return idName;
    }
}

function beforeIdName(c) {
    if (c == '#') {
        currentToken.id = '#';
        return idName;
    } else {
        return idName;
    }
}

function beforeClsName(c) {
    if (c == '.') {
        if (cName && cName != '.') {
            currentToken.classArray.push(cName);
        }
        cName = '.';
        return className;
    } else {
        return className;
    }
}

function className(c) {
    if (c == EOF) {
        if (cName && cName != '.') {
            currentToken.classArray.push(cName);
        }
        cName = '';
        emit(currentToken);
        return data;
    } else if (c == '.') {
        if (cName && cName != '.') {
            currentToken.classArray.push(cName);
        }
        cName = '.';
        return className;
    } else if (c == '[') {
        return beforeAttrName;
    } else {
        cName += c;
        return className;
    }
}

function beforeAttrName(c) {
    if (c == ']' || c == EOF) {
        return afterAttrName(c);
    } else if (c == '=') {
    } else {
        currentAttribute = {
            name: '',
            value: '',
        };
        return attrName(c);
    }
}

function afterAttrName(c) {
    if (c == '=') {
        return beforeAttributeValue;
    } else if (c == ']') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == 'EOF') {
    } else {
        currentAttribute.name += c;
        return attrName(c);
    }
}

function attrName(c) {
    if (c == ']' || c == EOF) {
        return afterAttrName(c);
    } else if (c == '=') {
        return beforeAttrValue;
    } else {
        currentAttribute.name += c;
        return attrName;
    }
}

function beforeAttrValue(c) {
    if (c == ']' || c == EOF) {
        return beforeAttrValue;
    } else if (c == ']') {
    } else {
        return attrValue(c);
    }
}

function attrValue(c) {
    if (c == ']') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == '[') {
        return beforeAttrName;
    } else if (c == EOF) {
    } else {
        currentAttribute.value += c;
        return attrValue;
    }
}

/**
 * 元素匹配规则
 * @param {*} ele
 * @param {*} selector
 */
function match(ele, selector) {
    if (!selector || !ele.attributes) {
        return false;
    }
    if (isCompositeSelect(selector)) {
        let attrId = ele.attributes.filter((attr) => attr.name == 'id')[0];
        let attr = ele.attributes.filter((attr) => attr.name == 'class')[0];
        let clasArr = attr && attr.value.split(' ');
        let selecs = [currentToken.id, ...currentToken.classArray];
        let { id, classArray, ...attrRule } = currentToken;
        let attrArray = Object.keys(attrRule);
        let mtch = true;
        for (let stor of selecs) {
            if (stor.charAt() == '#') {
                if (attrId && attrId.value == stor.replace('#', '')) {
                } else {
                    mtch = false;
                    break;
                }
            } else if (stor.charAt() == '.') {
                let clas = clasArr && clasArr.filter((cs) => cs == stor.replace('.', ''))[0];
                if (clas) {
                } else {
                    mtch = false;
                    break;
                }
            }
        }
        for (let attr of attrArray) {
            let eleAttr = ele.attributes.filter((item) => item.name == `${attr}`)[0];
            if (!eleAttr || eleAttr.value != attrRule[attr]) {
                mtch = false;
                break;
            }
        }
        return mtch;
    } else if (selector.charAt() == '#') {
        let attr = ele.attributes.filter((attr) => attr.name == 'id')[0];
        if (attr && attr.value == selector.replace('#', '')) {
            return true;
        }
    } else if (selector.charAt() == '.') {
        let attr = ele.attributes.filter((attr) => attr.name == 'class')[0];
        let clasArr = attr && attr.value.split(' ');
        let clas = clasArr && clasArr.filter((cs) => cs == selector.replace('.', ''))[0];
        if (clas) {
            return true;
        }
    } else {
        if (ele.tagName == selector) {
            return true;
        }
    }

    return false;
}

function addCSSRules(text) {
    let ast = css.parse(text);
    // console.log(JSON.stringify(ast, null, '    '));
    rules.push(...ast.stylesheet.rules);
}

function computeCSS(stack, ele) {
    let elements = stack.slice().reverse();
    if (!ele.computedStyle) {
        ele.computedStyle = {};
    }
    for (let rule of rules) {
        let selectorParts = rule.selectors[0].split(' ').reverse();
        if (!match(ele, selectorParts[0])) {
            continue;
        }
        let matched = false;
        let j = 1;
        for (let i = 0; i < elements.length; i++) {
            if (match(elements[i], selectorParts[j])) {
                j++;
            } else {
                break;
            }
        }
        if (j >= selectorParts.length) {
            matched = true;
        }
        if (matched) {
            // 规则匹配，加入
            // console.log('Element', ele, 'matched rule', rule);
            let sp = specificity(rule.selectors[0]);
            let computedStyle = ele.computedStyle;
            for (let dec of rule.declarations) {
                if (!computedStyle[dec.property]) {
                    computedStyle[dec.property] = {};
                }
                if (!computedStyle[dec.property].specificity) {
                    computedStyle[dec.property].value = dec.value;
                    computedStyle[dec.property].specificity = sp;
                } else if (compare(computedStyle[dec.property].specificity, sp) < 0) {
                    computedStyle[dec.property].value = dec.value;
                    computedStyle[dec.property].specificity = sp;
                }
            }
        }
    }
}

// 优先级
function specificity(selector) {
    let p = [0, 0, 0, 0];
    let selectorParts = selector.split(' ');
    for (let part of selectorParts) {
        if (part.charAt() == '#') {
            p[1] += 1;
        } else if (part.charAt() == '.') {
            p[2] += 1;
        } else {
            p[3] += 1;
        }
    }
    return p;
}

// 比较优先级
function compare(sp1, sp2) {
    if (sp1[0] - sp2[0]) {
        return sp1[0] - sp2[0];
    }
    if (sp1[1] - sp2[1]) {
        return sp1[1] - sp2[1];
    }
    if (sp1[2] - sp2[2]) {
        return sp1[2] - sp2[2];
    }
    return sp1[3] - sp2[3];
}

module.exports = {
    addCSSRules,
    computeCSS,
    rules,
};
