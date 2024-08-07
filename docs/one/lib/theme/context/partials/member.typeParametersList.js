"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeParametersList = typeParametersList;
const markdown_1 = require("../../../libs/markdown");
function typeParametersList(model) {
    const rows = [];
    model?.forEach((typeParameter) => {
        const row = [];
        const nameCol = [(0, markdown_1.bold)(typeParameter.name)];
        if (typeParameter.type) {
            nameCol.push(`${(0, markdown_1.italic)('extends')} ${this.partials.someType(typeParameter.type)}`);
        }
        if (typeParameter.default) {
            nameCol.push(`= ${this.partials.someType(typeParameter.default)}`);
        }
        row.push('• ' + nameCol.join(' '));
        if (typeParameter.comment) {
            row.push(this.partials.comment(typeParameter.comment));
        }
        rows.push(row.join('\n\n'));
    });
    return rows.join('\n\n');
}
