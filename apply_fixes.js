const fs = require('fs');

// 1. Update style.css
let style = fs.readFileSync('style.css', 'utf8');
style = style.replace(/--primary: #2563EB;/g, '--primary: #000000;');
style = style.replace(/--primary-hover: #1D4ED8;/g, '--primary-hover: #111827;');
style = style.replace(/--primary-light: #EFF6FF;/g, '--primary-light: #F3F4F6;');
// Replace blue shadows with black/gray shadows
style = style.replace(/rgba\(37,\s*99,\s*235,/g, 'rgba(0, 0, 0,');
fs.writeFileSync('style.css', style);

// 2. Update widget.js timeout and error logging
let widget = fs.readFileSync('widget.js', 'utf8');
widget = widget.replace(/setTimeout\(\(\) => reject\(new Error\('timeout'\)\), 5000\)/g, "setTimeout(() => reject(new Error('timeout')), 15000)");

const regex = /if\(\!res\.ok\) throw new Error\("API Error"\);/g;
const replacement = `if (!res.ok) {\n            const errText = await res.text();\n            console.error("Widget API Error:", errText);\n            throw new Error("API Error: " + res.status);\n        }`;
widget = widget.replace(regex, replacement);

fs.writeFileSync('widget.js', widget);

console.log("Updated style.css to black and widget.js fixed.");
