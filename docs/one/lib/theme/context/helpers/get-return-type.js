"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReturnType = getReturnType;
const markdown_1 = require("../../../libs/markdown");
const typedoc_1 = require("typedoc");
function getReturnType(model) {
    if (model) {
        const returnType = this.partials.someType(model);
        if (this.options.getValue('useCodeBlocks') &&
            model instanceof typedoc_1.ReflectionType &&
            this.options.getValue('expandObjects')) {
            return (0, markdown_1.codeBlock)(returnType);
        }
        return returnType;
    }
    return '';
}
