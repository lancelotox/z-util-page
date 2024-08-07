"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeAndParent = typeAndParent;
const markdown_1 = require("../../../libs/markdown");
const typedoc_1 = require("typedoc");
function typeAndParent(model) {
    if (!model) {
        return (0, markdown_1.backTicks)('void');
    }
    if (model instanceof typedoc_1.ArrayType) {
        return `${this.partials.typeAndParent(model.elementType)}[]`;
    }
    if (model instanceof typedoc_1.ReferenceType && model.reflection) {
        const refl = model.reflection instanceof typedoc_1.SignatureReflection
            ? model.reflection.parent
            : model.reflection;
        const parent = refl?.parent;
        if (parent) {
            const resultWithParent = [];
            if (parent?.url) {
                resultWithParent.push((0, markdown_1.link)((0, markdown_1.backTicks)(parent.name), this.getRelativeUrl(parent.url)));
            }
            else {
                resultWithParent.push((0, markdown_1.backTicks)(parent?.name));
            }
            if (refl?.url) {
                resultWithParent.push((0, markdown_1.link)((0, markdown_1.backTicks)(refl.name), this.getRelativeUrl(refl.url)));
            }
            else {
                resultWithParent.push((0, markdown_1.backTicks)(refl?.name));
            }
            return resultWithParent.join('.');
        }
    }
    return (0, markdown_1.backTicks)(model.toString());
}
