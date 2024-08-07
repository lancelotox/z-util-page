"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hierarchy = hierarchy;
const markdown_1 = require("../../../libs/markdown");
function hierarchy(model, options) {
    const md = [];
    const getHierarchy = (hModel) => {
        const parent = !hModel.isTarget
            ? hModel.types
                .map((hierarchyType) => {
                return this.helpers.getHierarchyType(hierarchyType, {
                    isTarget: hModel.isTarget || false,
                });
            })
                .join('.')
            : null;
        if (hModel.next) {
            if (parent) {
                md.push((0, markdown_1.heading)(options.headingLevel, this.i18n.theme_extends()));
                md.push(`- ${parent}`);
            }
            else {
                md.push((0, markdown_1.heading)(options.headingLevel, this.i18n.theme_extended_by()));
                const lines = [];
                hModel.next.types.forEach((hierarchyType) => {
                    lines.push(this.helpers.getHierarchyType(hierarchyType, {
                        isTarget: hModel.next?.isTarget || false,
                    }));
                });
                md.push((0, markdown_1.unorderedList)(lines));
            }
            if (hModel.next?.next) {
                getHierarchy(hModel.next);
            }
        }
    };
    getHierarchy(model);
    return md.join('\n\n');
}
