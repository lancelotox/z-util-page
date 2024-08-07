"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditionalType = conditionalType;
const markdown_1 = require("../../../libs/markdown");
function conditionalType(model) {
    const md = [];
    if (model.checkType) {
        md.push(this.partials.someType(model.checkType));
    }
    md.push((0, markdown_1.italic)('extends'));
    if (model.extendsType) {
        md.push(this.partials.someType(model.extendsType));
    }
    md.push('?');
    if (model.trueType) {
        md.push(this.partials.someType(model.trueType));
    }
    md.push(':');
    if (model.falseType) {
        md.push(this.partials.someType(model.falseType));
    }
    return md.join(' ');
}
