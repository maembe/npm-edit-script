const stuff = require("../index.js");
const fs = require("fs");
const jsonfile = require("jsonfile");

fs.readFileSync("./package.json");

beforeAll(() => {
    fs.copyFileSync("./package.json","./package.json.backup");
});

afterAll(() => {
    fs.unlinkSync("./package.json.backup");
});
  
afterEach(() => {
    fs.copyFileSync("./package.json.backup", "./package.json");
});


test('can add a script', async () => {
    const options = {key:"yoyo", value:"hi"};
    await stuff.addScript(options);
    const pkg = await jsonfile.readFile("package.json");
    expect(pkg.scripts[options.key]).toBe(options.value);
});

test("cannot add if exists", async () => {
    await expect(stuff.addScript({key:"existing", value:"hi"}))
    .rejects
    .toThrow();
});

test("can edit if forced", async () => {
    const options = {key:"existing", value:"new", force:true}
    await stuff.addScript(options);
    const pkg = await jsonfile.readFile("package.json");
    expect(pkg.scripts[options.key]).toBe(options.value);
});