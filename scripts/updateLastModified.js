const fs = require("fs");
const path = require("path");

// Path to the package.json file
const packageJsonPath = path.resolve(__dirname, "package.json");

// Read the package.json file
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Format the current date in a human-readable format
const currentDateTime = new Date();
const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
}).format(currentDateTime);

// Update the `last_update` field without the ordinal suffix
packageJson.last_update = `${formattedDate}`;

// Write the updated package.json file back
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Package.json updated with last_update: ${packageJson.last_update}`);