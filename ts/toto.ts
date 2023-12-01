const plist = require ("plist");
const fs = require ("fs");

const plistFile = fs.readFileSync("./config.plist", { encoding: "utf8" });
const parsed = plist.parse(plistFile);

fs.writeFile("./config.plist.json", JSON.stringify(parsed, null, "\t"), (err) => {
	if (err) throw err;
});