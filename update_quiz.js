const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

// 1. Change quizData to let
appJs = appJs.replace(
    /const quizData = \[\s*\{\s*q:\s*"Қазақстанның астанасы\?",[\s\S]*?a:\s*"Су"\s*\}\s*\];/,
    "let quizData = [];"
);

// 2. Replace startQuizBtn listener
const oldListener = `    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', () => {
            document.getElementById('quizSetup').style.display = 'none';
            document.getElementById('quizPlay').style.display = 'block';
            currentQ = 0; quizScore = 0;
            loadQuestion();
        });
    }`;

const newListener = `    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', async () => {
            const topicInput = document.getElementById('quizTopicInput');
            const topic = topicInput ? topicInput.value.trim() : "";
            if (!topic) {
                if(window.Swal) Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: 'Тақырыпты жазыңыз!', showConfirmButton: false, timer: 3000 });
                return;
            }

            const prevBtnText = startQuizBtn.innerHTML;
            startQuizBtn.innerHTML = 'Жасалуда...';
            startQuizBtn.disabled = true;

            try {
                if(window.Swal) Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'Сұрақтар жасалуда...', showConfirmButton: false, timer: 3000 });
                
                const generatedQuiz = await fetchQuizFromGemini(topic);
                quizData = generatedQuiz;
                
                document.getElementById('quizSetup').style.display = 'none';
                document.getElementById('quizPlay').style.display = 'block';
                currentQ = 0; quizScore = 0;
                loadQuestion();
            } catch (error) {
                console.error("Quiz AI error:", error);
                if(window.Swal) Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: 'Қате кетті!', showConfirmButton: false, timer: 3000 });
            } finally {
                startQuizBtn.innerHTML = prevBtnText;
                startQuizBtn.disabled = false;
            }
        });
    }

    async function fetchQuizFromGemini(topic) {
        const apiKey = window.GEMINI_API_KEY;
        if (!apiKey) throw new Error("No API Key");
        
        const prompt = \`Сен тәжірибелі мектеп мұғалімісің. "\${topic}" тақырыбына оқушыларға арналған 5 сұрақтан тұратын квиз (тест) құрастыр. 
Жауапты міндетті түрде тек қана JSON форматында қайтар. Құрылымы мынадай болсын:
[
  { "q": "Сұрақ мәтіні?", "options": ["Жауап 1", "Жауап 2", "Жауап 3", "Жауап 4"], "a": "Дұрыс жауап" }
]\`;

        const res = await fetchWithTimeout(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${apiKey}\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }, 15000);
        
        if (!res.ok) {
            const errText = await res.text();
            throw new Error(\`API Error: \${res.status} - \${errText}\`);
        }
        
        const data = await res.json();
        let text = data.candidates[0].content.parts[0].text;
        text = text.replace(/\`\`\`json/gi, '').replace(/\`\`\`/g, '').trim();
        return JSON.parse(text);
    }`;

appJs = appJs.replace(oldListener, newListener);

fs.writeFileSync('app.js', appJs);
console.log("Updated app.js for dynamic quiz");
