"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberWithGroups = memberWithGroups;
const markdown_1 = require("../../../libs/markdown");
const typedoc_1 = require("typedoc");
/**
 * Renders a top-level member that contains group and child members such as Classes, Interfaces and Enums.
 */
function memberWithGroups(model, options) {
    const md = [];
    if (model.comment) {
        md.push(this.partials.comment(model.comment, {
            headingLevel: options.headingLevel,
        }));
    }
    if (model.typeHierarchy?.next) {
        md.push(this.partials.hierarchy(model.typeHierarchy, {
            headingLevel: options.headingLevel,
        }));
    }
    if (model.typeParameters?.length) {
        md.push(`__${this.internationalization.kindPluralString(typedoc_1.ReflectionKind.TypeParameter)}__`);
        if (this.helpers.useTableFormat('parameters')) {
            md.push(this.partials.typeParametersTable(model.typeParameters));
        }
        else {
            md.push(this.partials.typeParametersList(model.typeParameters));
        }
    }
    if (model.implementedTypes?.length) {
        md.push(`__${this.i18n.theme_implements()}__`);
        md.push((0, markdown_1.unorderedList)(model.implementedTypes.map((implementedType) => this.partials.someType(implementedType))));
    }
    if ('signatures' in model && model.signatures?.length) {
        model.signatures.forEach((signature) => {
            md.push(this.partials.signature(signature, {
                headingLevel: options.headingLevel,
            }));
        });
    }
    if (model.indexSignatures?.length) {
        md.push(`__${this.i18n.theme_indexable()}__`);
        model.indexSignatures.forEach((indexSignature) => {
            md.push(this.partials.indexSignature(indexSignature));
        });
    }
    if (model.documents ||
        model?.groups?.some((group) => group.allChildrenHaveOwnDocument())) {
        const isAbsoluteIndex = model?.groups?.every((group) => group.owningReflection.kind !== typedoc_1.ReflectionKind.Document);
        if (isAbsoluteIndex) {
            md.push(`__${this.i18n.theme_index()}__`);
        }
        if (model.documents) {
            md.push(this.partials.documents(model, {
                headingLevel: options.headingLevel,
            }));
        }
        md.push(this.partials.reflectionIndex(model, {
            headingLevel: isAbsoluteIndex
                ? options.headingLevel + 1
                : options.headingLevel,
        }));
    }
    md.push(this.partials.body(model, { headingLevel: options.headingLevel }));
    return md.join('\n\n');
}
