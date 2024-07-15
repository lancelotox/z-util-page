"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescriptionForReflection = getDescriptionForReflection;
function getDescriptionForReflection(model) {
    const comment = model.signatures?.length
        ? model.signatures[0].comment
        : model.comment;
    if (comment?.summary?.length) {
        return this.helpers
            .getCommentParts(comment.summary)
            ?.split('\n\n')[0]
            .replace(/\r?\n/g, ' ');
    }
    return null;
}
