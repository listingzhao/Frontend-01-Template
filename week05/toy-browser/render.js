const images = require('images');

function render(viewport, ele) {
    if (ele.style) {
        let img = images(ele.style.width, ele.style.height);
        if (ele.style['background-color']) {
            let color = ele.style['background-color'] || 'rgb(0,0,0)';
            color.match(/rgb\((\d+),(\d+),(\d+)\)/);
            img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3), 1);
            viewport.draw(img, ele.style.left || 0, ele.style.top || 0);
        }
    }

    if (ele.children) {
        for (let child of ele.children) {
            render(viewport, child);
        }
    }
}

module.exports = render;
