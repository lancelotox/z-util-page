"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.project = project;
const markdown_1 = require("../../../libs/markdown");
const typedoc_1 = require("typedoc");
/**
 * Template that maps to the root project reflection. This will be the index page / documentation root page.
 */
function project(page) {
    const md = [];
    const isPackages = this.page.project.url === this.page.url &&
        this.options.getValue('entryPointStrategy') === typedoc_1.EntryPointStrategy.Packages;
    md.push(this.hook('index.page.begin', this).join('\n'));
    if (!this.options.getValue('hidePageHeader')) {
        md.push(this.partials.header());
    }
    if (!this.options.getValue('hideBreadcrumbs')) {
        md.push(this.partials.breadcrumbs());
    }
    const includeReadme = this.options.getValue('mergeReadme') && Boolean(page.model.readme);
    if (includeReadme && page.model.readme) {
        md.push(this.helpers.getCommentParts(page.model.readme));
    }
    if (!this.options.getValue('hidePageTitle') && !includeReadme) {
        md.push((0, markdown_1.heading)(1, this.partials.pageTitle()));
    }
    md.push(this.hook('content.begin', this).join('\n'));
    if (page.model.comment) {
        md.push(this.partials.comment(page.model.comment, { headingLevel: 3 }));
    }
    if (page.model?.groups?.some((group) => group.allChildrenHaveOwnDocument())) {
        if (page.model.documents?.length) {
            const group = {
                children: page.model.documents,
            };
            md.push((0, markdown_1.heading)(2, typedoc_1.ReflectionKind.pluralString(typedoc_1.ReflectionKind.Document)));
            md.push(this.helpers.getGroupIndex(group));
        }
        if (page.model.children?.some((child) => child.kind !== typedoc_1.ReflectionKind.Module)) {
            md.push(this.partials.body(page.model, { headingLevel: 3 }));
        }
        md.push(this.partials.reflectionIndex(page.model, {
            headingLevel: 3,
        }));
    }
    else {
        if (isPackages) {
            md.push(this.partials.packagesIndex(page.model));
        }
        else {
            md.push(this.partials.body(page.model, { headingLevel: 3 }));
        }
    }
    md.push(this.partials.footer());
    md.push(this.hook('index.page.end', this).join('\n'));
    return md.join('\n\n');
}
