"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessor = accessor;
const markdown_1 = require("../../../libs/markdown");
const typedoc_1 = require("typedoc");
function accessor(model, options) {
    const md = [];
    if (model.getSignature) {
        md.push(this.partials.signatureTitle(model.getSignature, {
            accessor: 'get',
        }));
        if (model.getSignature.comment) {
            md.push(this.partials.comment(model.getSignature.comment, {
                headingLevel: options.headingLevel,
            }));
        }
    }
    if (model.setSignature) {
        md.push(this.partials.signatureTitle(model.setSignature, {
            accessor: 'set',
        }));
        if (model.setSignature.comment) {
            md.push(this.partials.comment(model.setSignature.comment, {
                headingLevel: options.headingLevel,
            }));
        }
    }
    if (model.setSignature?.parameters?.length) {
        md.push(`__${this.internationalization.kindPluralString(typedoc_1.ReflectionKind.Parameter)}__`);
        if (this.helpers.useTableFormat('parameters')) {
            md.push(this.partials.parametersTable(model.setSignature.parameters));
        }
        else {
            md.push(this.partials.parametersList(model.setSignature.parameters));
        }
    }
    if (model.getSignature?.type) {
        md.push(this.partials.signatureReturns(model.getSignature, {
            headingLevel: options.headingLevel,
        }));
    }
    md.push(this.partials.inheritance(model, { headingLevel: options.headingLevel }));
    const showSources = model?.parent?.kind !== typedoc_1.ReflectionKind.TypeLiteral;
    if (showSources && !this.options.getValue('disableSources')) {
        if (model.getSignature?.sources) {
            md.push(this.partials.sources(model.getSignature, {
                headingLevel: options.headingLevel,
            }));
        }
        else if (model.setSignature?.sources) {
            md.push(this.partials.sources(model.setSignature, {
                headingLevel: options.headingLevel,
            }));
        }
        else {
            md.push(this.partials.sources(model, { headingLevel: options.headingLevel }));
        }
    }
    return md.join('\n\n');
}
