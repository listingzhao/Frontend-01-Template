function layout(ele) {
    if (!ele.computedStyle) {
        return;
    }
    let eleStyle = getStyle(ele);
    if (eleStyle.display != 'flex') {
        return;
    }
    let items = ele.children.filter((item) => item.type == 'element');
    items.sort((a, b) => {
        return (a.order || 0) - (b.order || 0);
    });

    let style = eleStyle;
    [('width', 'height')].forEach((k) => {
        if (style[k] == 'auto' || style[k] == '') {
            style[k] = null;
        }
    });

    // flex default value
    if (!style.flexDirection || style.flexDirection == 'auto') {
        style.flexDirection = 'row';
    }
    if (!style.alignItems || style.alignItems == 'auto') {
        style.alignItems = 'stretch';
    }
    if (!style.justifyContent || style.justifyContent == 'auto') {
        style.justifyContent = 'flex-start';
    }
    if (!style.alignContent || style.alignContent == 'auto') {
        style.alignContent = 'stretch';
    }
    if (!style.flexWrap || style.flexWrap == 'auto') {
        style.flexWrap = 'nowrap';
    }

    let mainSize, mainStart, mainEnd, mainSign, mainBase, crossSize, crossStart, crossEnd, crossSign, crossBase;

    if (style.flexDirection == 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainBase = 0;
        mainSign = +1;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }

    if (style.flexDirection == 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainBase = style.width;
        mainSign = -1;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }

    if (style.flexDirection == 'column') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainBase = 0;
        mainSign = +1;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }

    if (style.flexDirection == 'column-reverse') {
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainBase = style.height;
        mainSign = -1;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }

    if (style.flexWrap == 'wrap-reverse') {
        let tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    } else {
        crossSign = 1;
        crossBase = 0;
    }

    let isAutoMainSize = false;
    if (!style[mainSize]) {
        // auto size
        eleStyle[mainSize] = 0;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let itemStyle = getStyle(item);
            if (itemStyle[mainSize] != null || itemStyle[mainSize] != void 0) {
                eleStyle[mainSize] = eleStyle[mainSize] + itemStyle[mainSize];
            }
        }
        isAutoMainSize = true;
    }

    // 收集元素进行
    let flexLine = [];
    let flexLines = [flexLine];

    let mainSpace = eleStyle[mainSize];
    let crossSpace = 0;

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemStyle = getStyle(item);

        if (itemStyle[mainSize] == null) {
            itemStyle[mainSize] = 0;
        }

        if (itemStyle.flex) {
            flexLine.push(item);
        } else if (style.flexWrap == 'nowrap' && isAutoMainSize) {
            mainSpace -= itemStyle[mainSize];
            if (itemStyle[crossSize] != null && itemStyle[crossSize] != void 0) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            flexLine.push(item);
        } else {
            if (itemStyle[mainSize] > style[mainSize]) {
                itemStyle[mainSize] = style[mainSize];
            }
            // 换行
            if (mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;
                flexLine = [item];
                flexLines.push(flexLine);
                mainSpace = style[mainSize];
                crossSpace = 0;
            } else {
                flexLine.push(item);
            }

            if (itemStyle[crossSize] != null && itemStyle[crossSize] != void 0) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }

            mainSpace -= itemStyle[mainSize];
        }
    }
    flexLine.mainSpace = mainSpace;

    // 2. 计算主轴
    if (style.flexWrap == 'nowrap' || isAutoMainSize) {
        flexLine.crossSpace = style[crossSize] != void 0 ? style[crossSize] : crossSpace;
    } else {
        flexLine.crossSpace = crossSpace;
    }

    if (mainSpace < 0) {
        let scale = style[mainSize] / (style[mainSize] - mainSpace);
        let currentMain = mainBase;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let itemStyle = getStyle(item);

            if (itemStyle.flex) {
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale;

            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
        }
    } else {
        flexLines.forEach((items) => {
            let mainSpace = items.mainSpace;
            let flexTotal = 0;
            for (var i = 0; i < items.length; i++) {
                let item = items[i];
                let itemStyle = getStyle(item);

                if (itemStyle.flex != null && itemStyle.flex != void 0) {
                    flexTotal += itemStyle.flex;
                    continue;
                }
            }

            if (flexTotal > 0) {
                // 行中有flex items 元素
                let currentMain = mainBase;
                for (let i = 0; i < items.length; i++) {
                    let item = items[i];
                    let itemStyle = getStyle(item);
                    if (itemStyle.flex) {
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                    }

                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd];
                }
            } else {
                // 没有 flex items 元素 justifyContent 生效
                let currentMain = mainBase;
                let step = 0;
                if (style.justifyContent == 'flex-start') {
                    currentMain = mainBase;
                    step = 0;
                }
                if (style.justifyContent == 'flex-end') {
                    currentMain = mainSpace * mainSign + mainBase;
                    step = 0;
                }
                if (style.justifyContent == 'center') {
                    currentMain = (mainSpace / 2) * mainSign + mainBase;
                    step = 0;
                }
                if (style.justifyContent == 'space-between') {
                    currentMain = (mainSpace / (items.length - 1)) * mainSign;
                    step = 0;
                }
                if (style.justifyContent == 'space-around') {
                    step = (mainSpace / items.length) * mainSign;
                    currentMain = (step / 2) * mainBase;
                }
                for (let i = 0; i < items.length; i++) {
                    let item = items[i];
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd] + step;
                }
            }
        });
    }

    // 3. 计算交叉轴  align-items align-self
    if (!style[crossSize]) {
        // auto sizing
        crossSpace = 0;
        eleStyle[crossSize] = 0;
        for (let i = 0; i < flexLines.length; i++) {
            eleStyle[crossSize] = eleStyle[crossSize] + flexLine[i].crossSpace;
        }
    } else {
        crossSpace = style[crossSize];
        for (let i = 0; i < flexLines.length; i++) {
            crossSpace -= flexLines[i].crossSpace;
        }
    }

    if (style.flexWrap == 'wrap-reverse') {
        crossBase = style[crossSize];
    } else {
        crossBase = 0;
    }

    let lineSize = style[crossSize] / flexLines.length;

    let step;

    if (style.alignContent == 'flex-start') {
        crossBase += 0;
        step = 0;
    }
    if (style.alignContent == 'flex-end') {
        crossBase += crossSign * crossSpace;
        step = 0;
    }
    if (style.alignContent == 'center') {
        crossBase += (crossSign * crossSpace) / 2;
        step = 0;
    }
    if (style.alignContent == 'space-between') {
        crossBase += 0;
        step = crossSpace / (flexLines.length - 1);
    }
    if (style.alignContent == 'space-around') {
        step = crossSpace / flexLines.length;
        crossBase += (crossSign * step) / 2;
    }
    if (style.alignContent == 'stretch') {
        crossBase += 0;
        step = 0;
    }

    flexLines.forEach((items) => {
        let lineCrossSize =
            style.alignContent == 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let itemStyle = getStyle(item);

            let align = itemStyle.alignSelf || style.alignItems;

            if (itemStyle[crossSize] == null) {
                itemStyle[crossSize] = align == 'stretch' ? lineCrossSize : 0;
            }
            if (align == 'flex-start') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if (align == 'flex-end') {
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
            }
            if (align == 'center') {
                itemStyle[crossStart] = crossBase + (crossSign * (lineCrossSize - itemStyle[crossSize])) / 2;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if (align == 'stretch') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] =
                    itemStyle[crossStart] +
                    crossSign *
                        ((itemStyle[crossSize] != null && itemStyle[crossSize]) != void 0
                            ? itemStyle[crossSize]
                            : lineCrossSize);
                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
            }
        }

        crossBase += crossSign * (lineCrossSize + step);
    });

    console.log(items);
}

function getStyle(ele) {
    if (!ele.style) {
        ele.style = {};
    }
    for (let property in ele.computedStyle) {
        ele.style[property] = ele.computedStyle[property].value;

        if (ele.style[property].toString().match(/px$/)) {
            ele.style[property] = parseInt(ele.computedStyle[property].value);
        }
        if (ele.style[property].toString().match(/^0-9\.+$/)) {
            ele.style[property] = parseInt(ele.computedStyle[property].value);
        }
    }

    return ele.style;
}

module.exports = {
    layout,
};
