class OutputTsFile {
    constructor(options) {
        this.options = { ...options };
    }
    apply(compiler) {
        const options = this.options;
        const fs = require('fs');
        compiler.hooks.emit.tapAsync("OutputTsFile", (compilation, callback) => {
            compilation._modules.forEach(asset => {
                if(asset.resource && asset.resource.match(/.ts/ig) && !asset.resource.match(/.d.ts/ig) && asset._source !== null){
                    fs.writeFileSync(asset.resource.substring(0, asset.resource.length - 2) + 'js', asset._source._valueAsString);
                }
            });
            callback();
        })
    }
}

module.exports = OutputTsFile;