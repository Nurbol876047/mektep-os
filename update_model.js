const fs = require('fs');
const files = ['app.js', 'teacher.js', 'director.js', 'widget.js'];

files.forEach(file => {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/gemini-2\.0-flash/g, 'gemini-3.6-flash');
    fs.writeFileSync(file, content);
});
console.log("Models updated to gemini-3.6-flash.");
