const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

const uploadLogic = `
    // --- MODULE 9: AI DASHBOARD REPORT UPLOAD ---
    const reportUploadInput = document.getElementById('reportUploadInput');
    if(reportUploadInput) {
        reportUploadInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if(!file) return;
            
            const btn = document.getElementById('btnUploadReport');
            const originalBtnHtml = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="loader" class="spin"></i> AI Талдауда...';
            btn.disabled = true;
            
            try {
                const text = await file.text();
                
                const prompt = \`Сен мектеп директорының бас аналитигісің. Пайдаланушы мектептің есебін жүктеді.
Есеп мәтіні:
\"\"\"\${text}\"\"\"

Осы мәтіннен мына деректерді шығарып ал да, ТЕК ҚАНА JSON форматында қайтар (Markdown \`\`\`сыз):
{
  "progress": "Жалпы үлгерім пайызы (тек сан, мысалы 85%)",
  "attendance": "Қатысу пайызы (мысалы 90%)",
  "tasks": "Тапсырмалар пайызы (мысалы 88%)",
  "active": "Белсенді оқушылар немесе мұғалімдер саны (тек сан)",
  "lineChart": [1-тоқсан, 2-тоқсан, 3-тоқсан, 4-тоқсан үлгерім сандары],
  "barChart": [5, 6, 7, 8, 9 сыныптар үлгерімі сандары],
  "doughnutChart": [орындалған, орындалуда, күтуде тапсырмалар саны]
}\`;

                const apiKey = window.GEMINI_API_KEY;
                const res = await fetchWithTimeout(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${apiKey}\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                }, 25000);
                
                if(!res.ok) throw new Error("API Error");
                
                const data = await res.json();
                let jsonText = data.candidates[0].content.parts[0].text;
                jsonText = jsonText.replace(/\`\`\`json/gi, '').replace(/\`\`\`/g, '').trim();
                const parsed = JSON.parse(jsonText);
                
                // Update Metrics
                document.getElementById('metric-progress').innerText = parsed.progress;
                document.getElementById('metric-attendance').innerText = parsed.attendance;
                document.getElementById('metric-tasks').innerText = parsed.tasks;
                document.getElementById('metric-active').innerText = parsed.active;
                
                // Update Charts
                if(lineChart) {
                    lineChart.data.datasets[0].data = parsed.lineChart;
                    lineChart.update();
                }
                if(barChart) {
                    barChart.data.datasets[0].data = parsed.barChart;
                    barChart.update();
                }
                if(doughnutChart) {
                    doughnutChart.data.datasets[0].data = parsed.doughnutChart;
                    doughnutChart.update();
                }
                
                if(window.Swal) Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Есеп сәтті талданды!', showConfirmButton: false, timer: 3000 });
                
            } catch(err) {
                console.error("Upload AI Error:", err);
                if(window.Swal) Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: 'Қате кетті', text: 'Есепті талдау мүмкін болмады.', showConfirmButton: false, timer: 3000 });
            } finally {
                btn.innerHTML = originalBtnHtml;
                btn.disabled = false;
                if(window.lucide) window.lucide.createIcons();
                e.target.value = ''; // reset input
            }
        });
    }
`;

// Insert just before "initKanban();" at the end of the file
appJs = appJs.replace('    initKanban();', uploadLogic + '\n    initKanban();');

fs.writeFileSync('app.js', appJs);
console.log("Upload logic added to app.js");
