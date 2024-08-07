"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signature = signature;
const markdown_1 = require("../../../libs/markdown");
const typedoc_1 = require("typedoc");
function signature(model, options) {
    const md = [];
    if (!options.nested) {
        md.push(this.partials.signatureTitle(model, {
            accessor: options.accessor,
        }));
    }
    const modelComments = model.comment || model.parent?.comment;
    if (modelComments) {
        md.push(this.partials.comment(modelComments, {
            headingLevel: options.headingLevel,
            showTags: false,
            showSummary: true,
        }));
    }
    if (!options.multipleSignatures && model.parent?.documents) {
        md.push(this.partials.documents(model?.parent, {
            headingLevel: options.headingLevel,
        }));
    }
    if (model.typeParameters?.length &&
        model.kind !== typedoc_1.ReflectionKind.ConstructorSignature) {
        md.push(`__${this.internationalization.kindPluralString(typedoc_1.ReflectionKind.TypeParameter)}__`);
        if (this.helpers.useTableFormat('parameters')) {
            md.push(this.partials.typeParametersTable(model.typeParameters));
        }
        else {
            md.push(this.partials.typeParametersList(model.typeParameters));
        }
    }
    if (model.parameters?.length) {
        md.push(`__${this.internationalization.kindPluralString(typedoc_1.ReflectionKind.Parameter)}__`);
        if (this.helpers.useTableFormat('parameters')) {
            md.push(this.partials.parametersTable(model.parameters));
        }
        else {
            md.push(this.partials.parametersList(model.parameters));
        }
    }
    if (model.type) {
        md.push(this.partials.signatureReturns(model, {
            headingLevel: options.headingLevel,
        }));
    }
    if (modelComments) {
        md.push(this.partials.comment(modelComments, {
            headingLevel: options.headingLevel,
            showTags: true,
            showSummary: false,
        }));
    }
    md.push(this.partials.inheritance(model, { headingLevel: options.headingLevel }));
    if (!options.nested &&
        model.sources &&
        !this.options.getValue('disableSources')) {
        md.push(this.partials.sources(model, { headingLevel: options.headingLevel }));
    }
    return md.join('\n\n');
}
