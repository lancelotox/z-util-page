"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.members = members;
const markdown_1 = require("../../../libs/markdown");
function members(model, options) {
    const md = [];
    const displayHr = (reflection) => {
        if (this.options.getValue('outputFileStrategy') === 'modules') {
            return this.helpers.isGroupKind(reflection);
        }
        return true;
    };
    const items = model?.filter((item) => !item.hasOwnDocument);
    items?.forEach((item, index) => {
        md.push(this.partials.memberContainer(item, {
            headingLevel: options.headingLevel,
        }));
        if (index < items.length - 1 && displayHr(item)) {
            md.push((0, markdown_1.horizontalRule)());
        }
    });
    return md.join('\n\n');
}
