import fs from 'fs';
import * as googleTTS from 'google-tts-api';

const tabAudioPhrases = {
    'sec-dashboard': 'Мұнда мектеп көрсеткіштерін бақылай аласыз.',
    'sec-agenda': 'Мұнда кеңес беру жоспарын құра аласыз.',
    'sec-analytics': 'Мұнда деректерге жасанды интеллект көмегімен талдау жасай аласыз.',
    'sec-tasks': 'Мұнда тапсырмаларды қарап, орындай аласыз.',
    'sec-lesson': 'Мұнда күнтізбелік-тақырыптық жоспар шаблонын дайындай аласыз.',
    'sec-test': 'Мұнда жасанды интеллект көмегімен тест құра аласыз.',
    'sec-eval': 'Мұнда оқушы жұмысын жасанды интеллект арқылы тексере аласыз.',
    'sec-games': 'Мұнда білім беру ойындарын таба аласыз.'
};

if (!fs.existsSync('audio')) {
    fs.mkdirSync('audio');
}

async function generate() {
    for (const [key, text] of Object.entries(tabAudioPhrases)) {
        try {
            const results = await googleTTS.getAllAudioBase64(text, {
                lang: 'kk',
                slow: false,
                host: 'https://translate.google.com',
                timeout: 10000,
            });
            
            let finalBuffer = Buffer.alloc(0);
            for (const res of results) {
                finalBuffer = Buffer.concat([finalBuffer, Buffer.from(res.base64, 'base64')]);
            }
            
            fs.writeFileSync(`audio/${key}.mp3`, finalBuffer);
            console.log(`Generated audio/${key}.mp3`);
        } catch (e) {
            console.error(`Error generating ${key}:`, e);
        }
    }
}

generate().catch(console.error);
