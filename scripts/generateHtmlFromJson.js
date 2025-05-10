import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to JSON directory
const jsonDir = path.join(__dirname, "../public/assets/data");
const outputDir = path.join(__dirname, "../public/generated");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Function to generate an HTML page from JSON
const generateHtmlPage = (jsonFilename) => {
    const jsonPath = path.join(jsonDir, jsonFilename);
    if (!fs.existsSync(jsonPath)) return;

    const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    const title = jsonData.title || jsonFilename.replace(".json", "").toUpperCase();
    const description = jsonData.description || "No description provided.";
    const jsonContent = JSON.stringify(jsonData, null, 2);

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${description}">
    <title>${title}</title>
</head>
<body>
    <h1>${title}</h1>
    <pre>${jsonContent}</pre>
</body>
</html>
    `;

    const outputPath = path.join(outputDir, jsonFilename.replace(".json", ".html"));
    fs.writeFileSync(outputPath, htmlContent);
    console.log(`Generated: ${outputPath}`);
};

// Process all JSON files
fs.readdirSync(jsonDir)
    .filter(file => file.endsWith(".json"))
    .forEach(generateHtmlPage);

console.log("All JSON files converted to HTML!");