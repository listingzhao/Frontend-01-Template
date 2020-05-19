const EOF = Symbol('EOF'); // EOF: END of File

function data(c) {}

module.exports.parseHTML = function parseHTML(html) {
    console.log(html);
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
};
