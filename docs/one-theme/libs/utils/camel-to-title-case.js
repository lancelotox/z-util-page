"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelToTitleCase = camelToTitleCase;
function camelToTitleCase(text) {
    return (text.substring(0, 1).toUpperCase() +
        text.substring(1).replace(/[a-z][A-Z]/g, (x) => `${x[0]} ${x[1]}`));
}
