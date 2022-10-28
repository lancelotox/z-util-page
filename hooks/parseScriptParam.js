module.exports = function GetNpmLifecycleScriptParams(script) {
    const params = {};
    const input = script || (process?.env?.npm_lifecycle_script || '');
    const Regexp = new RegExp(/--([\w]*)(?:[\s]*=[\s]*|\s)([\w]*)(?:\b|-*|\s*)/, 'g');

    let result;

    while ((result = Regexp.exec(input)) !== null) {
        params[result[1]] = result[2];
    }

    return params;
}