"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructor = constructor;
const markdown_1 = require("../../../libs/markdown");
const utils_1 = require("../../../libs/utils");
function constructor(model, options) {
    const md = [];
    model.signatures?.forEach((signature) => {
        md.push(`__${(0, utils_1.escapeChars)(signature.name)}()__`);
        md.push(this.partials.signature(signature, {
            headingLevel: options.headingLevel + 1,
        }));
    });
    return md.join('\n\n');
}
