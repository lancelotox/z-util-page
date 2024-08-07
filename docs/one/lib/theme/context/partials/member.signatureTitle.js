"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatureTitle = signatureTitle;
const markdown_1 = require("../../../libs/markdown");
const utils_1 = require("../../../libs/utils");
function signatureTitle(model, options) {
    const md = [];
    const useCodeBlocks = this.options.getValue('useCodeBlocks');
    const keyword = this.helpers.getKeyword(model.parent.kind);
    if (useCodeBlocks && this.helpers.isGroupKind(model.parent) && keyword) {
        md.push(keyword + ' ');
    }
    if (options?.accessor) {
        md.push((0, markdown_1.backTicks)(options?.accessor) + ' ');
    }
    if (model.parent) {
        const flagsString = this.helpers.getReflectionFlags(model.parent?.flags);
        if (flagsString.length) {
            md.push(this.helpers.getReflectionFlags(model.parent.flags) + ' ');
        }
    }
    if (!['__call', '__type'].includes(model.name)) {
        md.push((0, markdown_1.bold)((0, utils_1.escapeChars)(model.name)));
    }
    if (model.typeParameters) {
        md.push(`${this.helpers.getAngleBracket('<')}${model.typeParameters
            .map((typeParameter) => (0, markdown_1.backTicks)(typeParameter.name))
            .join(', ')}${this.helpers.getAngleBracket('>')}`);
    }
    md.push(this.partials.signatureParameters(model.parameters || []));
    if (model.type) {
        md.push(`: ${this.partials.someType(model.type)}`);
    }
    const result = md.join('');
    return useCodeBlocks ? (0, markdown_1.codeBlock)(result) : `> ${result}`;
}
