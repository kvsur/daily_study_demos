const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');
const { create } = require('domain');


let mouduleId = 0;

function createAssets(filename) {
    const content = fs.readFileSync(filename, 'utf-8');
    
    const ast = parser.parse(content, {
        sourceType: 'module'
    });

    const dependencies = [];

    traverse(ast, {
        ImportDeclaration: ({ node }) => {
            dependencies.push(node.source.value);
        }
    });

    const { code } = babel.transformFromAstSync(ast, null, {
        presets: ['@babel/preset-env']
    });

    let id = mouduleId++;

    return {
        id,
        filename,
        code,
        dependencies
    };

}

function createGraph(entry) {
    const mainAsset = createAssets(entry);
    const queue = [mainAsset];

    for (const asset of queue) {
        const dirname = path.dirname(asset.filename);
        asset.mapping =  {};

        asset.dependencies.forEach(relativePath => {
            const absolutePath = path.join(dirname, relativePath);
            const child = createAssets(absolutePath);
            asset.mapping[relativePath] = child.id;
            queue.push(child); // 这里会产生递归，但是没有考虑模块重复依赖的问题
        });
    }

    return queue;
}

function bundle(graph = []) {
    let modules = '';
    graph.forEach(item => {
        modules += `
            ${item.id}: [
                function(require, module, exports) {
                    ${item.code}
                },
                ${JSON.stringify(item.mapping)}
            ],
        `;
    });

    return `
        (function(modules) {
            function require(id) {
                const [fn, mapping] = modules[id];
                function localRequires(relativePath) {
                    return require(mapping[relativePath]);
                }

                const module = {
                    exports: {}
                };

                fn(localRequires, module, module.exports);

                return module.exports;
            }

            require(0);
        })({${modules}});
    `;
}

function createDist(result) {
    fs.rmdirSync('./dist', {
        recursive: true,
    });
    fs.mkdirSync('./dist');

    fs.writeFileSync('./dist/index.js', result, {
        encoding: 'utf-8',
    })
}

const graph = createGraph("./src/index.js");
const result = bundle(graph);
createDist(result);

eval(result);
