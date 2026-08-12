// teacher.js

// Вставьте свой ключ Gemini API сюда (Енді config.js файлында сақталған)
// const GEMINI_API_KEY is loaded from config.js

// Fallback Lesson Plan Example
const fallbackLessonPlan = {
    aim: "Оқушыларға тақырып бойынша негізгі ұғымдарды түсіндіру, теориялық білімдерін практикамен ұштастыру.",
    results: [
        "Негізгі терминдерді біледі және түсінеді",
        "Алған білімдерін есеп шығаруда немесе талдауда қолдана алады",
        "Топпен жұмыс істеу дағдыларын қалыптастырады"
    ],
    course: {
        intro: "Ұйымдастыру кезеңі. Үй тапсырмасын сұрау (Kahoot немесе ауызша сұрақ-жауап). Жаңа сабақтың мақсатымен таныстыру (10 мин).",
        main: "Жаңа тақырыпты түсіндіру. Презентация және нақты мысалдар арқылы көрсету. Топтық немесе жұптық тапсырмалар орындау (25 мин).",
        conclusion: "Сабақты бекіту. Рефлексия (Не білдім? Не үйрендім?). Үйге тапсырма беру және бағалау (10 мин)."
    },
    tasks: [
        "Оқулықтағы №1, 2 жаттығуларды орындау",
        "Қосымша: Тақырып бойынша эссе немесе шағын презентация дайындау"
    ]
};

// Fallback Test Example
const fallbackTest = [
    { question: "Абай Құнанбаев кім?", options: ["Ақын, ағартушы", "Батыр", "Хан", "Күйші"], answer: "Ақын, ағартушы" },
    { question: "Ньютонның бірінші заңы қалай аталады?", options: ["Инерция заңы", "Күш заңы", "Бүкіләлемдік тартылыс заңы", "Энергияның сақталу заңы"], answer: "Инерция заңы" },
    { question: "Қазақ хандығы қашан құрылды?", options: ["1465 жылы", "1500 жылы", "1450 жылы", "1730 жылы"], answer: "1465 жылы" },
    { question: "Информатикадағы ең кіші ақпарат өлшем бірлігі?", options: ["Байт", "Бит", "Кбайт", "Мегабайт"], answer: "Бит" },
    { question: "Судың химиялық формуласы қандай?", options: ["CO2", "H2O", "NaCl", "O2"], answer: "H2O" },
    { question: "Қазақстанның тәуелсіздік алған жылы?", options: ["1989", "1990", "1991", "1992"], answer: "1991" },
    { question: "Жердің табиғи серігі?", options: ["Күн", "Марс", "Ай", "Шолпан"], answer: "Ай" },
    { question: "Сөз таптары нешеге бөлінеді?", options: ["5", "7", "9", "10"], answer: "9" },
    { question: "Әлемдегі ең биік шың?", options: ["Хан Тәңірі", "Эверест", "Монблан", "Килиманджаро"], answer: "Эверест" },
    { question: "Алғашқы қазақ ғарышкері?", options: ["Талғат Мұсабаев", "Тоқтар Әубәкіров", "Айдын Айымбетов", "Юрий Гагарин"], answer: "Тоқтар Әубәкіров" }
];

// Fallback Evaluation Example
const fallbackEval = {
    score: 4,
    comment: "Жауабыңыз өте жақсы құрастырылған, негізгі ой анық берілген. Алайда, қосымша нақты мысалдармен толықтыра түссеңіз, жауабыңыз бұдан да мінсіз болар еді."
};

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. SKELETON UI ---
    const getSkeletonHTML = () => `
        <div class="lesson-plan-card">
            <div class="skeleton" style="height: 32px; width: 60%; margin-bottom: 24px;"></div>
            <div class="skeleton" style="height: 20px; width: 100%;"></div>
            <div class="skeleton" style="height: 20px; width: 100%;"></div>
            <div class="skeleton" style="height: 20px; width: 80%; margin-bottom: 32px;"></div>
            <div class="skeleton" style="height: 24px; width: 40%; margin-bottom: 16px;"></div>
            <div class="skeleton" style="height: 20px; width: 90%;"></div>
        </div>
    `;

    const fetchWithTimeout = (url, options, timeout = 60000) => {
        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
        ]);
    };

    // --- 1. LESSON PLAN LOGIC ---
    const lessonPlanForm = document.getElementById('lessonPlanForm');
    if (lessonPlanForm) {
        lessonPlanForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const subject = document.getElementById('lessonSubject').value;
            const grade = document.getElementById('lessonGrade').value;
            const topic = document.getElementById('lessonTopic').value;

            const lessonPlanResult = document.getElementById('lessonPlanResult');
            lessonPlanResult.style.display = 'block';
            lessonPlanResult.innerHTML = getSkeletonHTML();
            gsap.fromTo(lessonPlanResult, {opacity: 0}, {opacity: 1, duration: 0.3});

            Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'AI сіздің сабақ жоспарыңызды құрастыруда...', showConfirmButton: false, timer: 3000 });

            try {
                const [data] = await Promise.all([
                    fetchLessonPlanFromGemini(subject, grade, topic),
                    new Promise(r => setTimeout(r, 2500))
                ]);
                renderLessonPlan(data);
                Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Сабақ жоспары сәтті жасалды!', showConfirmButton: false, timer: 3000 });
            } catch (error) {
                console.warn("Fallback қолданылды (Сабақ жоспары), себебі:", error);
                renderLessonPlan(fallbackLessonPlan);
                Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Сабақ жоспары дайын!', showConfirmButton: false, timer: 3000 });
            }
        });
    }

    async function fetchLessonPlanFromGemini(subject, grade, topic) {
        if(GEMINI_API_KEY === "YOUR_API_KEY_HERE") throw new Error("No API Key");
        const prompt = `Сен тәжірибелі мектеп мұғалімісің. Маған мына тақырып бойынша қазақ тілінде сабақ жоспарын жазып бер. 
Пән: ${subject}. Сынып: ${grade}. Тақырып: ${topic}.
Жауапты міндетті түрде JSON форматында қайтар. Құрылымы мынадай болсын:
{
  "aim": "Сабақтың мақсаты",
  "results": ["Күтілетін нәтиже 1", "Күтілетін нәтиже 2"],
  "course": { "intro": "Кіріспе", "main": "Негізгі", "conclusion": "Қорытынды" },
  "tasks": ["Тапсырма 1", "Тапсырма 2"]
}
JSON-нан басқа артық мәтін жазба.`;
        const res = await fetchWithTimeout(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { response_mime_type: "application/json" } })
        });
        if (!res.ok) {
            const errText = await res.text();
            console.error("Gemini API қатесі (" + res.status + "):", errText);
            throw new Error("API Error: " + res.status);
        }
        const data = await res.json();
        let text = data.candidates[0].content.parts[0].text;
        text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    }

    function renderLessonPlan(data) {
        const lessonPlanResult = document.getElementById('lessonPlanResult');
        let resultsList = data.results.map(r => `<li><i data-lucide="check" style="color: var(--accent-green); width: 16px; height: 16px;"></i> ${r}</li>`).join('');
        let tasksList = data.tasks.map(t => `<li><i data-lucide="pen-tool" style="color: var(--primary); width: 16px; height: 16px;"></i> ${t}</li>`).join('');

        lessonPlanResult.innerHTML = `
            <div class="lesson-plan-card" style="opacity: 0; transform: translateY(20px);">
                <div class="lesson-section">
                    <h4><i data-lucide="target"></i> Сабақ мақсаты</h4>
                    <p>${data.aim}</p>
                </div>
                <div class="lesson-section">
                    <h4><i data-lucide="award"></i> Күтілетін нәтижелер</h4>
                    <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; color: var(--text-muted);">${resultsList}</ul>
                </div>
                <div class="lesson-section">
                    <h4><i data-lucide="clock"></i> Сабақ барысы</h4>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div><strong style="color: var(--secondary);">Кіріспе:</strong> <span style="color: var(--text-muted);">${data.course.intro}</span></div>
                        <div><strong style="color: var(--secondary);">Негізгі бөлім:</strong> <span style="color: var(--text-muted);">${data.course.main}</span></div>
                        <div><strong style="color: var(--secondary);">Қорытынды:</strong> <span style="color: var(--text-muted);">${data.course.conclusion}</span></div>
                    </div>
                </div>
                <div class="lesson-section" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
                    <h4><i data-lucide="clipboard-list"></i> Тапсырмалар</h4>
                    <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; color: var(--text-muted);">${tasksList}</ul>
                </div>
            </div>
        `;
        lucide.createIcons();
        gsap.to(lessonPlanResult.querySelector('.lesson-plan-card'), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    }

    // --- 2. TEST GENERATION LOGIC ---
    const testGenForm = document.getElementById('testGenForm');
    if (testGenForm) {
        testGenForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const subject = document.getElementById('testSubject').value;
            const grade = document.getElementById('testGrade').value;
            const topic = document.getElementById('testTopic').value;
            const count = parseInt(document.getElementById('testCount').value);

            const testResult = document.getElementById('testResult');
            testResult.style.display = 'block';
            testResult.innerHTML = getSkeletonHTML();
            gsap.fromTo(testResult, {opacity: 0}, {opacity: 1, duration: 0.3});

            Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'AI тест сұрақтарын дайындауда...', showConfirmButton: false, timer: 3000 });

            try {
                const [data] = await Promise.all([
                    fetchTestFromGemini(subject, grade, topic, count),
                    new Promise(r => setTimeout(r, 2500))
                ]);
                renderTest(data, testResult);
                Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Тест сәтті жасалды!', showConfirmButton: false, timer: 3000 });
            } catch (error) {
                console.warn("Fallback қолданылды (Тест), себебі:", error);
                renderTest(fallbackTest.slice(0, count), testResult);
                Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Тест дайын!', showConfirmButton: false, timer: 3000 });
            }
        });
    }

    async function fetchTestFromGemini(subject, grade, topic, count) {
        if(GEMINI_API_KEY === "YOUR_API_KEY_HERE") throw new Error("No API Key");
        const prompt = `Сен тәжірибелі мұғалімсің. Маған мына тақырып бойынша қазақ тілінде тест сұрақтарын құрастырып бер.
Пән: ${subject}. Сынып: ${grade}. Тақырып: ${topic}. Сұрақ саны: ${count}.
Жауапты міндетті түрде JSON форматында қайтар (Array of objects). Құрылымы:
[ { "question": "Сұрақ?", "options": ["А", "В", "С", "Д"], "answer": "Дұрыс жауап" } ]
JSON-нан басқа артық мәтін жазба.`;
        const res = await fetchWithTimeout(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { response_mime_type: "application/json" } })
        });
        if (!res.ok) {
            const errText = await res.text();
            console.error("Gemini API қатесі (" + res.status + "):", errText);
            throw new Error("API Error: " + res.status);
        }
        const data = await res.json();
        let text = data.candidates[0].content.parts[0].text;
        text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    }

    function renderTest(questions, container) {
        let cardsHtml = questions.map((q, index) => {
            let optionsHtml = q.options.map(opt => `<div class="option-item">${opt}</div>`).join('');
            return `
                <div class="test-question-card" style="opacity: 0; transform: translateY(20px);">
                    <h5>${index + 1}. ${q.question}</h5>
                    <div class="options-list">${optionsHtml}</div>
                    <div class="correct-answer-toggle" onclick="
                        const content = this.nextElementSibling;
                        const icon = this.querySelector('i');
                        if(content.style.display === 'block') {
                            content.style.display = 'none';
                            icon.setAttribute('data-lucide', 'eye');
                        } else {
                            content.style.display = 'block';
                            icon.setAttribute('data-lucide', 'eye-off');
                        }
                        lucide.createIcons();
                    ">
                        <i data-lucide="eye"></i> Дұрыс жауапты көру
                    </div>
                    <div class="correct-answer-content"><strong>Дұрыс жауап:</strong> ${q.answer}</div>
                </div>
            `;
        }).join('');
        container.innerHTML = `<div class="test-list-wrapper">${cardsHtml}</div>`;
        lucide.createIcons();
        gsap.to(container.querySelectorAll('.test-question-card'), { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" });
    }

    // --- 3. EVALUATION LOGIC ---
    const evaluationForm = document.getElementById('evaluationForm');
    if (evaluationForm) {
        evaluationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const task = document.getElementById('evalTask').value;
            const answer = document.getElementById('evalAnswer').value;
            
            const evalResult = document.getElementById('evalResult');
            evalResult.style.display = 'block';
            evalResult.innerHTML = getSkeletonHTML();
            gsap.fromTo(evalResult, {opacity: 0}, {opacity: 1, duration: 0.3});
            
            Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'Оқушы жауабы бағалануда...', showConfirmButton: false, timer: 3000 });
            
            try {
                const [data] = await Promise.all([
                    fetchEvalFromGemini(task, answer),
                    new Promise(r => setTimeout(r, 2000))
                ]);
                renderEval(data);
                Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Бағаланды!', showConfirmButton: false, timer: 3000 });
            } catch (error) {
                console.warn("Fallback қолданылды (Бағалау), себебі:", error);
                renderEval(fallbackEval);
                Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Бағаланды!', showConfirmButton: false, timer: 3000 });
            }
        });
    }

    async function fetchEvalFromGemini(task, answer) {
        if(GEMINI_API_KEY === "YOUR_API_KEY_HERE") throw new Error("No API");
        const prompt = `Сен тәжірибелі мұғалімсің. Оқушының мына тапсырмаға берген жауабын бағала.
Тапсырма: "${task}"
Оқушының жауабы: "${answer}"
5 балдық жүйемен бағалап, қысқаша конструктивті пікір жаз (не дұрыс, нені жақсарту керек, 2-3 сөйлем).
Жауапты міндетті түрде JSON форматында қайтар. Құрылымы:
{
  "score": 5,
  "comment": "Сенің пікірің"
}
JSON-нан басқа артық мәтін жазба.`;
        const res = await fetchWithTimeout(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST", headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { response_mime_type: "application/json" } })
        });
        if (!res.ok) {
            const errText = await res.text();
            console.error("Gemini API қатесі (" + res.status + "):", errText);
            throw new Error("API Error: " + res.status);
        }
        const data = await res.json();
        let text = data.candidates[0].content.parts[0].text;
        text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    }

    function renderEval(data) {
        const evalResult = document.getElementById('evalResult');
        let scoreClass = 'score-5';
        if(data.score <= 2) scoreClass = 'score-1-2';
        else if(data.score <= 4) scoreClass = 'score-3-4';
        
        evalResult.innerHTML = `
            <div class="eval-result-card" style="opacity: 0; transform: translateY(20px);">
                <div class="eval-score ${scoreClass}">${data.score}</div>
                <div class="eval-comment">
                    <h3 style="margin-bottom:8px; color:var(--secondary);">AI Бағалау нәтижесі</h3>
                    <p style="color:var(--text-muted); font-size: 1.1rem; line-height: 1.6;">${data.comment}</p>
                </div>
            </div>
        `;
        gsap.to(evalResult.querySelector('.eval-result-card'), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    }

    // --- 4. TABS LOGIC ---
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const target = document.getElementById('tab-' + btn.getAttribute('data-tab'));
            target.classList.add('active');
            gsap.fromTo(target, {opacity: 0, y: 10}, {opacity: 1, y: 0, duration: 0.3});
            
            // Re-init games if needed
            if(btn.getAttribute('data-tab') === 'match') {
                if(!document.getElementById('termsPool').hasChildNodes() && !document.getElementById('definitionsCol').hasChildNodes()) {
                    initMatchGame();
                }
            }
        });
    });

    // --- 5. QUIZ GAME LOGIC ---
    const quizData = [
        { q: "Қазақстанның астанасы?", options: ["Алматы", "Астана", "Шымкент", "Тараз"], a: "Астана" },
        { q: "Күн жүйесіндегі ең үлкен ғаламшар?", options: ["Жер", "Марс", "Юпитер", "Сатурн"], a: "Юпитер" },
        { q: "Қазақ хандығының негізін қалаған кімдер?", options: ["Керей мен Жәнібек", "Абылай хан", "Қасым хан", "Тәуке хан"], a: "Керей мен Жәнібек" },
        { q: "H2O ненің химиялық формуласы?", options: ["Су", "Оттегі", "Көмірқышқыл газы", "Тұз"], a: "Су" },
        { q: "Абайдың неше қарасөзі бар?", options: ["40", "45", "50", "35"], a: "45" }
    ];
    let currentQ = 0;
    let quizScore = 0;

    const startQuizBtn = document.getElementById('startQuizBtn');
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', () => {
            document.getElementById('quizSetup').style.display = 'none';
            document.getElementById('quizPlay').style.display = 'block';
            currentQ = 0;
            quizScore = 0;
            loadQuestion();
        });
    }
    const restartQuizBtn = document.getElementById('restartQuizBtn');
    if(restartQuizBtn) {
        restartQuizBtn.addEventListener('click', () => {
            document.getElementById('quizResultScreen').style.display = 'none';
            document.getElementById('quizSetup').style.display = 'block';
        });
    }

    function loadQuestion() {
        if (currentQ >= quizData.length) {
            showQuizResult();
            return;
        }
        const q = quizData[currentQ];
        document.getElementById('quizProgressText').innerText = `${currentQ + 1} / ${quizData.length}`;
        document.getElementById('quizQuestion').innerText = q.q;
        
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';
        q.options.forEach(opt => {
            const btn = document.createElement('div');
            btn.className = 'quiz-option-btn';
            btn.innerText = opt;
            btn.onclick = () => handleAnswer(opt, btn);
            optionsContainer.appendChild(btn);
        });
        
        gsap.killTweensOf("#quizTimerBar");
        gsap.fromTo("#quizTimerBar", {scaleX: 1}, {scaleX: 0, duration: 10, ease: "none", onComplete: () => {
            handleAnswer(null, null); // timeout
        }});
    }

    function handleAnswer(ans, btn) {
        gsap.killTweensOf("#quizTimerBar"); 
        const q = quizData[currentQ];
        const isCorrect = (ans === q.a);
        
        const btns = document.querySelectorAll('.quiz-option-btn');
        btns.forEach(b => {
            b.onclick = null;
            if(b.innerText === q.a) b.classList.add('correct');
        });
        
        if (btn) {
            if (isCorrect) quizScore++;
            else btn.classList.add('wrong');
        }
        
        setTimeout(() => {
            currentQ++;
            loadQuestion();
        }, 1200);
    }

    function showQuizResult() {
        document.getElementById('quizPlay').style.display = 'none';
        const resScreen = document.getElementById('quizResultScreen');
        resScreen.style.display = 'block';
        document.getElementById('quizFinalScore').innerText = `${quizScore}/${quizData.length}`;
        
        if (quizScore === quizData.length) {
            confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
        }
        gsap.fromTo(resScreen, {opacity:0, scale:0.8}, {opacity:1, scale:1, duration:0.5, ease:"back.out"});
    }

    // --- 6. MATCH GAME LOGIC ---
    const matchData = [
        { id: "1", term: "Алгоритм", def: "Әрекеттердің нақты реті" },
        { id: "2", term: "Процессор", def: "Компьютердің 'миы', ақпарат өңдейді" },
        { id: "3", term: "Монитор", def: "Ақпаратты визуалды шығару құрылғысы" },
        { id: "4", term: "Пернетақта", def: "Мәтіндік мәліметтерді енгізу құрылғысы" },
        { id: "5", term: "Браузер", def: "Ғаламтор беттерін ашуға арналған бағдарлама" }
    ];

    document.getElementById('restartMatchBtn')?.addEventListener('click', initMatchGame);
    
    // Auto init on first load if tab is active (but it isn't by default)
    // We init it when tab is clicked.

    function initMatchGame() {
        const pool = document.getElementById('termsPool');
        const defCol = document.getElementById('definitionsCol');
        if(!pool || !defCol) return;
        
        pool.innerHTML = '';
        defCol.innerHTML = '';
        
        let shuffled = [...matchData].sort(() => Math.random() - 0.5);
        
        shuffled.forEach(item => {
            pool.innerHTML += `<div class="match-item" data-id="${item.id}"><i data-lucide="grip-vertical" style="width:16px;margin-right:8px;color:#cbd5e1;"></i><span>${item.term}</span></div>`;
        });
        
        matchData.forEach(item => {
            defCol.innerHTML += `
                <div class="def-row">
                    <div class="def-text">${item.def}</div>
                    <div class="drop-zone" data-def="${item.id}"></div>
                </div>
            `;
        });
        lucide.createIcons();
        
        new Sortable(pool, {
            group: 'shared',
            animation: 150,
            sort: false
        });
        
        document.querySelectorAll('.drop-zone').forEach(zone => {
            new Sortable(zone, {
                group: {
                    name: 'shared',
                    put: function (to) { return to.el.children.length === 0; }
                },
                animation: 150,
                onAdd: function (evt) {
                    const item = evt.item;
                    const termId = item.getAttribute('data-id');
                    const defId = evt.to.getAttribute('data-def');
                    
                    if (termId === defId) {
                        const text = item.querySelector('span').innerText;
                        item.classList.add('matched');
                        item.innerHTML = `<i data-lucide="check-circle" style="width:16px;margin-right:8px;color:var(--accent-green);"></i> <span>${text}</span>`;
                        lucide.createIcons();
                        item.style.pointerEvents = 'none'; // disable drag back
                        updateMatchScore();
                    } else {
                        item.classList.add('shake');
                        setTimeout(() => item.classList.remove('shake'), 400);
                        setTimeout(() => { pool.appendChild(item); }, 400);
                    }
                }
            });
        });
        
        document.getElementById('matchScore').innerText = '0';
        document.getElementById('matchResultScreen').style.display = 'none';
    }

    function updateMatchScore() {
        const matchedCount = document.querySelectorAll('.drop-zone .matched').length;
        document.getElementById('matchScore').innerText = matchedCount;
        
        if (matchedCount === matchData.length) {
            confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
            document.getElementById('matchResultScreen').style.display = 'block';
            gsap.fromTo(document.getElementById('matchResultScreen'), {opacity:0, scale:0.8}, {opacity:1, scale:1, duration:0.5});
        }
    }
});
