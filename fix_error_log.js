const fs = require('fs');
const files = ['app.js', 'teacher.js', 'director.js'];

files.forEach(file => {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the simple throw with detailed error logging
    const regex = /if\s*\(!res\.ok\)\s*throw\s*new\s*Error\([^)]*\);/g;
    const replacement = `if (!res.ok) {\n            const errText = await res.text();\n            console.error("Gemini API қатесі (" + res.status + "):", errText);\n            throw new Error("API Error: " + res.status);\n        }`;
    
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
});

console.log("Error logging added.");
