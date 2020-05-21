const css = require('css');
let rules = [];

function isFuSelect(selector) {
    let reg = /^([a-z]+)\s*(>*)\s*([a-z]+)|(#+[a-z]+)(.+[a-z]+)$/g;
    reg.exec('#aid.a');
    return reg.exec(selector);
}

/**
 * 复合选择器
 * @param {*} ele
 * @param {*} selector
 */
function match(ele, selector) {
    if (!selector || !ele.attributes) {
        return false;
    }

    if (isFuSelect(selector)) {
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
    console.log(JSON.stringify(ast, null, '    '));
    rules.push(...ast.stylesheet.rules);
}

function computeCSS(stack, ele) {
    let elements = stack.slice().reverse();
    if (!ele.computedStyle) {
        ele.computedStyle = {};
    }
    for (let rule of rules) {
        let selectorParts = rule.selectors[0].split(' ').reverse();
        console.log(selectorParts);
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
            console.log('Element', ele, 'matched rule', rule);
        }
    }
}

module.exports = {
    addCSSRules,
    computeCSS,
    rules,
};
