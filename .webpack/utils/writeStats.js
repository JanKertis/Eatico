const fs = require('fs');
const path = require('path');
const filepath = path.resolve(__dirname, '../../webpack-stats.json');

module.exports = function writeStats(stats) {
    const publicPath = this.options.output.publicPath;

    const json = stats.toJson();

    // get chunks by name and extensions
    function getChunks(ext) {
        const assets = json.assetsByChunkName;

        return Object
                .keys(assets)
                .map(asset => {
                const chunk = assets[asset];

        return (Array.isArray(chunk) ? chunk : [chunk])
                .filter((chunkName) => {
                return path.extname(chunkName) === '.' + ext;
    })
    .map((chunkName) => {
            return publicPath + chunkName;
    });
    })
    .reduce((acc, map) => {
            return acc.concat(map);
    }, []);
    }

    const content = {
        script: getChunks('js'),
        css: getChunks('css')
    };

    fs.writeFileSync(filepath, JSON.stringify(content));
};
