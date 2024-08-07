"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sources = sources;
const markdown_1 = require("../../../libs/markdown");
const utils_1 = require("../../../libs/utils");
function sources(model, options) {
    const md = [];
    if (options.headingLevel !== -1) {
        md.push((0, markdown_1.heading)(options.headingLevel, this.i18n.theme_defined_in()));
    }
    model.sources?.forEach((source, index) => {
        if (index === 0) {
            if (source.url) {
                md.push((0, markdown_1.link)(`${(0, utils_1.escapeChars)(source.fileName)}:${source.line}`, source.url));
            }
            else {
                md.push(`${(0, utils_1.escapeChars)(source.fileName)}:${source.line}`);
            }
        }
    });
    return md.join('\n\n');
}
