"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupIndexTable = getGroupIndexTable;
const markdown_1 = require("../../../libs/markdown");
const utils_1 = require("../../../libs/utils");
const typedoc_1 = require("typedoc");
function getGroupIndexTable(children) {
    const leftAlignHeadings = this.options.getValue('tableColumnSettings').leftAlignHeaders;
    const childKindStrings = children.map((child) => typedoc_1.ReflectionKind.singularString(child.kind));
    const headers = [[...new Set(childKindStrings)].join(', ')];
    headers.push(this.i18n.theme_description());
    const rows = [];
    children.forEach((child) => {
        const row = [];
        if (child.url) {
            row.push((0, markdown_1.link)((0, utils_1.escapeChars)(child.name), this.getRelativeUrl(child.url)));
        }
        const description = child instanceof typedoc_1.DeclarationReflection
            ? this.helpers.getDescriptionForReflection(child)
            : child.frontmatter.description;
        row.push(description || '-');
        rows.push(row);
    });
    return this.options.getValue('indexFormat') === 'htmlTable'
        ? (0, markdown_1.htmlTable)(headers, rows, leftAlignHeadings)
        : (0, markdown_1.table)(headers, rows, leftAlignHeadings);
}
