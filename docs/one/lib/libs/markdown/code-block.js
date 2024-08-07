"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeBlock = codeBlock;
const un_escape_chars_1 = require("../utils/un-escape-chars");
function codeBlock(content) {
    const trimLastLine = (content) => {
        const lines = content.split('\n');
        return lines
            .map((line, index) => (index === lines.length - 1 ? line.trim() : line))
            .join('\n');
    };
    const trimmedContent = content.endsWith('}') ||
        content.endsWith('};') ||
        content.endsWith('>') ||
        content.endsWith('>;')
        ? trimLastLine(content)
        : content;
    return '```ts\n' + (0, un_escape_chars_1.unEscapeChars)(trimmedContent) + '\n```';
}
