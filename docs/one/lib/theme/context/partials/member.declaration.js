"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declaration = declaration;
const markdown_1 = require("../../../libs/markdown");
const typedoc_1 = require("typedoc");
function declaration(model, options = {
    headingLevel: 3,
    nested: false,
}) {
    const md = [];
    const opts = {
        nested: false,
        ...options,
    };
    md.push(this.partials.declarationTitle(model));
    if (model?.documents) {
        md.push(this.partials.documents(model, {
            headingLevel: options.headingLevel,
        }));
    }
    const typeDeclaration = model.type
        ?.declaration;
    const showComments = !typeDeclaration?.signatures?.every((signature) => Boolean(signature.comment));
    if (showComments && model.comment) {
        md.push(this.partials.comment(model.comment, {
            headingLevel: opts.headingLevel,
            showSummary: true,
            showTags: false,
        }));
    }
    if (model.type instanceof typedoc_1.IntersectionType) {
        model.type?.types?.forEach((intersectionType) => {
            if (intersectionType instanceof typedoc_1.ReflectionType &&
                !intersectionType.declaration.signatures) {
                if (intersectionType.declaration.children) {
                    md.push((0, markdown_1.heading)(opts.headingLevel, this.i18n.theme_type_declaration()));
                    md.push(this.partials.typeDeclaration(intersectionType.declaration, {
                        headingLevel: opts.headingLevel,
                    }));
                }
            }
        });
    }
    if (model.type instanceof typedoc_1.ReferenceType && model.type.typeArguments?.length) {
        if (model.type.typeArguments[0] instanceof typedoc_1.ReflectionType) {
            if (model.type.typeArguments[0].declaration?.children) {
                md.push((0, markdown_1.heading)(opts.headingLevel, this.i18n.theme_type_declaration()));
                md.push(this.partials.typeDeclaration(model.type.typeArguments[0].declaration, { headingLevel: opts.headingLevel }));
            }
        }
    }
    if (model.typeParameters) {
        md.push((0, markdown_1.heading)(opts.headingLevel, this.internationalization.kindPluralString(typedoc_1.ReflectionKind.TypeParameter)));
        if (this.helpers.useTableFormat('parameters')) {
            md.push(this.partials.typeParametersTable(model.typeParameters));
        }
        else {
            md.push(this.partials.typeParametersList(model.typeParameters));
        }
    }
    if (Boolean(typeDeclaration)) {
        if (typeDeclaration?.indexSignatures?.length) {
            md.push((0, markdown_1.heading)(opts.headingLevel, this.i18n.kind_index_signature()));
            typeDeclaration?.indexSignatures?.forEach((indexSignature) => {
                md.push(this.partials.indexSignature(indexSignature));
            });
        }
        if (typeDeclaration?.signatures?.length) {
            typeDeclaration.signatures.forEach((signature) => {
                md.push(this.partials.signature(signature, {
                    headingLevel: opts.headingLevel,
                    nested: true,
                }));
            });
        }
        if (typeDeclaration?.children?.length) {
            const useHeading = model.kind !== typedoc_1.ReflectionKind.Property ||
                this.helpers.useTableFormat('properties');
            if (!opts.nested && typeDeclaration?.children?.length) {
                if (useHeading) {
                    md.push((0, markdown_1.heading)(opts.headingLevel, this.i18n.theme_type_declaration()));
                }
                if (typeDeclaration.categories) {
                    typeDeclaration.categories.forEach((category) => {
                        md.push((0, markdown_1.heading)(opts.headingLevel, category.title));
                        md.push(this.partials.typeDeclaration(category, {
                            headingLevel: useHeading
                                ? opts.headingLevel + 1
                                : opts.headingLevel,
                        }));
                    });
                }
                else {
                    md.push(this.partials.typeDeclaration(typeDeclaration, {
                        headingLevel: useHeading
                            ? opts.headingLevel
                            : opts.headingLevel - 1,
                    }));
                }
            }
        }
    }
    if (showComments && model.comment) {
        md.push(this.partials.comment(model.comment, {
            headingLevel: opts.headingLevel,
            showSummary: false,
            showTags: true,
        }));
    }
    md.push(this.partials.inheritance(model, { headingLevel: opts.headingLevel }));
    if (!opts.nested &&
        model.sources &&
        !this.options.getValue('disableSources')) {
        md.push(this.partials.sources(model, { headingLevel: opts.headingLevel }));
    }
    return md.join('\n\n');
}
