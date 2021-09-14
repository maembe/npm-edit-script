const jsonfile = require('jsonfile');

 const addScript = async (options) => {
    const file = (options.path ?? "./") + "package.json"

    const json = await jsonfile.readFile(file);

    if (!json.scripts) json.scripts = {};

    if(json.scripts[options.key] && !options.force)
        throw new Error(`script '${options.key}' already exists`);

    json.scripts[options.key] = options.value;
    await jsonfile.writeFile(file, json, {spaces:2});
}


module.exports = {
    addScript
}