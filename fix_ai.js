const fs = require('fs');

const files = ['app.js', 'teacher.js', 'director.js'];

files.forEach(file => {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Update timeout
    content = content.replace(/timeout = 5000/g, 'timeout = 15000');
    
    // 2. Clean JSON parsing globally
    content = content.replace(/const data = await res\.json\(\);\s*return JSON\.parse\(data\.candidates\[0\]\.content\.parts\[0\]\.text\);/g, 
        `const data = await res.json();\n        let text = data.candidates[0].content.parts[0].text;\n        text = text.replace(/\`\`\`json/gi, '').replace(/\`\`\`/g, '').trim();\n        return JSON.parse(text);`);

    // 3. Add console errors to catch blocks
    content = content.replace(/catch\s*\(error\)\s*\{\s*renderLessonPlan/g, 'catch (error) {\n                console.warn("Fallback қолданылды (Сабақ жоспары), себебі:", error);\n                renderLessonPlan');
    content = content.replace(/catch\s*\(error\)\s*\{\s*renderTest/g, 'catch (error) {\n                console.warn("Fallback қолданылды (Тест), себебі:", error);\n                renderTest');
    content = content.replace(/catch\s*\(error\)\s*\{\s*renderEval/g, 'catch (error) {\n                console.warn("Fallback қолданылды (Бағалау), себебі:", error);\n                renderEval');
    content = content.replace(/catch\s*\(error\)\s*\{\s*renderAgenda/g, 'catch (error) {\n                console.warn("Fallback қолданылды (Кеңес), себебі:", error);\n                renderAgenda');
    content = content.replace(/catch\s*\(error\)\s*\{\s*renderAnalytics/g, 'catch (error) {\n                console.warn("Fallback қолданылды (Аналитика), себебі:", error);\n                renderAnalytics');

    fs.writeFileSync(file, content);
});

// Fix widget.js
if(fs.existsSync('widget.js')) {
    let widget = fs.readFileSync('widget.js', 'utf8');
    
    // Add console.warn in catch
    widget = widget.replace(/catch\s*\(error\)\s*\{\s*removeTyping/g, 'catch (error) {\n            console.warn("Fallback қолданылды (Виджет), себебі:", error);\n            removeTyping');
    
    fs.writeFileSync('widget.js', widget);
}

console.log("Fixes applied successfully.");
