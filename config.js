// config.js
// config.js
window.GEMINI_API_KEY = "YOUR_API_KEY_HERE";
window.SCHOOL_INFO = "Мектеп";
window.USER_NAME = "Пайдаланушы";

window.schoolMockData = {
  "attendance": {
    "description": "Оқушылардың күнделікті сабаққа қатысуы (жылдық, ауысым бойынша)",
    "monitoring_note": "Оқушылардың күнделікті сабаққа қатысуы үнемі бақылауда болды.",

    "shift_1": {
      "description": "1, 4, 7, 8, 9-сынып оқушылары",
      "grades": ["1", "4", "7", "8", "9"],
      "overall_attendance_percent": 97.0,
      "absence_percent": 2.2,
      "by_grade": {
        "1": 99.2,
        "4": 98.8,
        "7": 97.4,
        "8": 78.8,
        "9": 74.0
      }
    },

    "shift_2": {
      "description": "2, 3, 5, 6-сынып оқушылары",
      "grades": ["2", "3", "5", "6"],
      "by_grade": {
        "2_3": 98.6,
        "5": 98.0,
        "6": 97.8
      }
    },

    "note": "Кейбір оқушылардың сабаққа келмей қалу себептері дер кезінде анықталып, олардың ата-аналарына түсіндірме жұмыстары жүргізілді."
  },
  "education_quality": {
    "description": "Тоқсандар бойынша білім сапасы мен үлгерім көрсеткіштері (2025-2026 оқу жылы)",
    "legal_basis": "ҚР Оқу-ағарту министрінің 16.09.2022 №399, 21.11.2022 №467, 05.07.2023 №199 бұйрықтарына сәйкес",
    "quarters": [
      {
        "quarter": 1,
        "students_grade1": 207,
        "students_grade2_9": 1691,
        "quality_percent": 59.1,
        "performance_percent": 99.8,
        "excellent_students": 246,
        "good_students": 753,
        "satisfactory_students": 688,
        "failing_students_count": 3,
        "not_certified": [{ "name": "Серік Нұрсаян", "class": "5Г", "reason": "денсаулығына байланысты" }],
        "low_quality_classes": ["6Е", "7А", "7В", "8В", "8Д", "8Ж", "8З", "9А", "9Ә", "9Б", "9В", "9Г", "9Д"],
        "failing_students": [
          { "name": "Шаянбай Сырым", "class": "8Б", "subject": "география" },
          { "name": "Тастандиев Әділет", "class": "8Ж", "subject": "география" },
          { "name": "Ерсеит Ерсұлтан", "class": "8Ж", "subject": "география" }
        ],
        "class_breakdown": {
          "class_2": { "students": 181, "grade5": 34, "grade4": 83, "grade3": 64, "grade2": 0, "performance_pct": 100.0, "quality_pct": 64.4 },
          "class_3": { "students": 188, "grade5": 33, "grade4": 100, "grade3": 55, "grade2": 0, "performance_pct": 100.0, "quality_pct": 70.7 },
          "class_4": { "students": 238, "grade5": 48, "grade4": 120, "grade3": 70, "grade2": 0, "performance_pct": 100.0, "quality_pct": 70.5 },
          "class_5": { "students": 232, "grade5": 38, "grade4": 109, "grade3": 84, "grade2": 0, "not_certified": 1, "performance_pct": 100.0, "quality_pct": 63.3 },
          "class_6": { "students": 248, "grade5": 44, "grade4": 110, "grade3": 94, "grade2": 0, "performance_pct": 100.0, "quality_pct": 61.5 },
          "class_7": { "students": 186, "grade5": 13, "grade4": 76, "grade3": 97, "grade2": 0, "performance_pct": 100.0, "quality_pct": 48.1 },
          "class_8": { "students": 243, "grade5": 17, "grade4": 102, "grade3": 121, "grade2": 3, "performance_pct": 98.7, "quality_pct": 48.7 },
          "class_9": { "students": 175, "grade5": 19, "grade4": 53, "grade3": 103, "grade2": 0, "performance_pct": 100.0, "quality_pct": 41.0 },
          "total": { "students": 1691, "grade5": 246, "grade4": 753, "grade3": 688, "grade2": 3, "performance_pct": 99.8, "quality_pct": 59.1 }
        }
      },
      {
        "quarter": 2,
        "students_grade1": 208,
        "students_grade2_9": 1681,
        "quality_percent": 64.5,
        "performance_percent": 99.9,
        "excellent_students": 280,
        "good_students": 804,
        "satisfactory_students": 595,
        "not_certified": [],
        "low_quality_classes": ["8Б", "8Е", "8Ж", "8З", "9Д"],
        "failing_students": [
          { "name": "Давлетбаев Алдияр", "class": "8Г", "subject": "география" },
          { "name": "Серікбай Нұрислам", "class": "9В", "subject": "география" }
        ],
        "class_breakdown": {
          "class_2": { "students": 182, "grade5": 53, "grade4": 78, "grade3": 51, "grade2": 0, "performance_pct": 100.0, "quality_pct": 72.0 },
          "class_3": { "students": 188, "grade5": 38, "grade4": 105, "grade3": 45, "grade2": 0, "performance_pct": 100.0, "quality_pct": 76.1 },
          "class_4": { "students": 239, "grade5": 58, "grade4": 118, "grade3": 63, "grade2": 0, "performance_pct": 100.0, "quality_pct": 73.6 },
          "class_5": { "students": 229, "grade5": 40, "grade4": 111, "grade3": 78, "grade2": 0, "performance_pct": 100.0, "quality_pct": 65.9 },
          "class_6": { "students": 244, "grade5": 45, "grade4": 116, "grade3": 83, "grade2": 0, "performance_pct": 100.0, "quality_pct": 66.0 },
          "class_7": { "students": 185, "grade5": 14, "grade4": 85, "grade3": 86, "grade2": 0, "performance_pct": 100.0, "quality_pct": 53.5 },
          "class_8": { "students": 241, "grade5": 15, "grade4": 112, "grade3": 113, "grade2": 1, "performance_pct": 99.6, "quality_pct": 52.7 },
          "class_9": { "students": 173, "grade5": 17, "grade4": 79, "grade3": 76, "grade2": 1, "performance_pct": 99.4, "quality_pct": 55.5 },
          "total": { "students": 1681, "grade5": 280, "grade4": 804, "grade3": 595, "grade2": 2, "performance_pct": 99.9, "quality_pct": 64.5 }
        }
      },
      {
        "quarter": 3,
        "students_grade1": 193,
        "students_grade2_9": 1666,
        "quality_percent": 65.2,
        "quality_change_vs_prev_quarter": 0.7,
        "performance_percent": 99.5,
        "excellent_students": 338,
        "good_students": 748,
        "satisfactory_students": 572,
        "low_quality_classes": ["7Б", "7В", "7Г"],
        "not_certified_students": [
          { "class": "9А", "name": "Асил Руслан", "reason": "Футболдан ҚР чемпионаты, Шымкент қ. (6-17.03.2026), №98 бұйрық" },
          { "class": "9А", "name": "Бауыржанұлы Алишер", "reason": "Футболдан ҚР чемпионаты, Шымкент қ. (6-17.03.2026), №98 бұйрық" },
          { "class": "8Б", "name": "Мұратова Нұрдана", "reason": "Дзюдо ҚР чемпионаты, Қарағанды қ. (13-30.03.2026), №100 бұйрық" },
          { "class": "9Г", "name": "Балықбай Нұрасқан", "reason": "Ауру есебімен, анықтама бар (аяғы сынған)" },
          { "class": "9В", "name": "Есенгелді Еркежан", "reason": "ҚР чемпионаты, жоғарғы лига, Хромтау қ. (10-19.03.2026), №101 бұйрық" },
          { "class": "7Б", "name": "Сәбит Назерке", "reason": "Ауру есебімен, анықтама бар (12.03.2026-19.03.2026)" },
          { "class": "9Ә", "name": "Қыдыржан Арнат", "reason": "Халықаралық кикбоксинг, Қырғызстан, Қарақол қ. (9-20.03.2026), №99 бұйрық" }
        ],
        "class_breakdown": {
          "class_2": { "students": 185, "grade5": 61, "grade4": 75, "grade3": 49, "grade2": 0, "performance_pct": 100.0, "quality_pct": 73.5 },
          "class_3": { "students": 189, "grade5": 52, "grade4": 95, "grade3": 42, "grade2": 0, "performance_pct": 100.0, "quality_pct": 77.8 },
          "class_4": { "students": 236, "grade5": 60, "grade4": 115, "grade3": 61, "grade2": 0, "performance_pct": 100.0, "quality_pct": 74.2 },
          "class_5": { "students": 227, "grade5": 49, "grade4": 98, "grade3": 80, "grade2": 0, "performance_pct": 100.0, "quality_pct": 64.8 },
          "class_6": { "students": 242, "grade5": 54, "grade4": 109, "grade3": 79, "grade2": 0, "performance_pct": 100.0, "quality_pct": 67.4 },
          "class_7": { "students": 183, "grade5": 17, "grade4": 80, "grade3": 85, "grade2": 0, "not_certified": 1, "performance_pct": 99.5, "quality_pct": 53.0 },
          "class_8": { "students": 233, "grade5": 23, "grade4": 100, "grade3": 108, "grade2": 0, "not_certified": 2, "performance_pct": 99.1, "quality_pct": 52.8 },
          "class_9": { "students": 171, "grade5": 22, "grade4": 76, "grade3": 68, "grade2": 0, "not_certified": 5, "performance_pct": 97.1, "quality_pct": 57.3 },
          "total": { "students": 1666, "grade5": 338, "grade4": 748, "grade3": 572, "grade2": 0, "not_certified": 8, "performance_pct": 99.5, "quality_pct": 65.2 }
        }
      },
      {
        "quarter": 4,
        "students_grade1": 207,
        "students_grade2_9": 1663,
        "pre_school_students": 98,
        "quality_percent": 65.8,
        "quality_change_vs_prev_quarter": 0.6,
        "performance_percent": 100,
        "excellent_students": 337,
        "good_students": 754,
        "satisfactory_students": 572,
        "low_quality_classes": ["7В", "7Г", "8Ж", "8Е"],
        "class_breakdown": {
          "class_2": { "students": 185, "grade5": 63, "grade4": 78, "grade3": 44, "grade2": 0, "performance_pct": 100.0, "quality_pct": 76.2 },
          "class_3": { "students": 187, "grade5": 50, "grade4": 93, "grade3": 44, "grade2": 0, "performance_pct": 100.0, "quality_pct": 76.5 },
          "class_4": { "students": 235, "grade5": 60, "grade4": 116, "grade3": 59, "grade2": 0, "performance_pct": 100.0, "quality_pct": 74.9 },
          "class_5": { "students": 226, "grade5": 52, "grade4": 94, "grade3": 80, "grade2": 0, "performance_pct": 100.0, "quality_pct": 64.6 },
          "class_6": { "students": 242, "grade5": 56, "grade4": 108, "grade3": 78, "grade2": 0, "performance_pct": 100.0, "quality_pct": 67.8 },
          "class_7": { "students": 184, "grade5": 18, "grade4": 83, "grade3": 83, "grade2": 0, "performance_pct": 100.0, "quality_pct": 54.9 },
          "class_8": { "students": 233, "grade5": 20, "grade4": 104, "grade3": 109, "grade2": 0, "performance_pct": 100.0, "quality_pct": 53.2 },
          "class_9": { "students": 171, "grade5": 18, "grade4": 78, "grade3": 75, "grade2": 0, "performance_pct": 100.0, "quality_pct": 56.1 },
          "total": { "students": 1663, "grade5": 337, "grade4": 754, "grade3": 572, "grade2": 0, "performance_pct": 100.0, "quality_pct": 65.8 }
        }
      }
    ],
    "annual": {
      "quality_percent": 68.2,
      "performance_percent": 100,
      "excellent_students": 334,
      "good_students": 773,
      "satisfactory_students": 526,
      "quality_change_vs_q4": 2.4,
      "quality_change_vs_last_year": -1.9,
      "note": "Жылдық білім сапасы соңғы тоқсанмен салыстырғанда өсті, бірақ өткен оқу жылымен салыстырғанда 1,9%-ға төмендеді.",
      "class_breakdown": {
        "class_2": { "students": 185, "grade5": 64, "grade4": 72, "grade3": 49, "grade2": 0, "performance_pct": 100.0, "quality_pct": 73.5 },
        "class_3": { "students": 187, "grade5": 55, "grade4": 96, "grade3": 36, "grade2": 0, "performance_pct": 100.0, "quality_pct": 80.7 },
        "class_4": { "students": 235, "grade5": 67, "grade4": 114, "grade3": 54, "grade2": 0, "performance_pct": 100.0, "quality_pct": 77.0 },
        "class_5": { "students": 226, "grade5": 53, "grade4": 104, "grade3": 69, "grade2": 0, "performance_pct": 100.0, "quality_pct": 69.5 },
        "class_6": { "students": 242, "grade5": 60, "grade4": 112, "grade3": 70, "grade2": 0, "performance_pct": 100.0, "quality_pct": 71.1 },
        "class_7": { "students": 184, "grade5": 19, "grade4": 87, "grade3": 78, "grade2": 0, "performance_pct": 100.0, "quality_pct": 57.6 },
        "class_8": { "students": 233, "grade5": 24, "grade4": 107, "grade3": 102, "grade2": 0, "performance_pct": 100.0, "quality_pct": 56.2 },
        "class_9": { "students": 171, "grade5": 22, "grade4": 81, "grade3": 68, "grade2": 0, "performance_pct": 100.0, "quality_pct": 60.2 },
        "total": { "students": 1663, "grade5": 364, "grade4": 773, "grade3": 526, "grade2": 0, "performance_pct": 100.0, "quality_pct": 68.2 }
      }
    },
    "year_over_year_quality_dynamics": {
      "description": "2024-2025 және 2025-2026 оқу жылдарының тоқсандық білім сапасын салыстыру",
      "2024_2025": { "q1": null, "q2": 67.2, "q3": 67.4, "q4": 69.3, "annual": 70.1 },
      "2025_2026": { "q1": 59.1, "q2": 64.5, "q3": 65.2, "q4": 65.8, "annual": 68.2 },
      "dynamics": { "q2": -2.7, "q3": -2.2, "q4": -3.5, "annual": -2.9 }
    },
    "subjects_quality_comparison": {
      "description": "Пәндер бойынша білім сапасының 2024-2025 және 2025-2026 оқу жылдарымен салыстырмалы көрсеткіштері.",
      "subjects": [
        { "subject": "Қазақ тілі", "quality_2024_2025_pct": 72.7, "quality_2025_2026_pct": 74.6, "dynamics": 1.9 },
        { "subject": "Қазақ әдебиеті", "quality_2024_2025_pct": 75.5, "quality_2025_2026_pct": 76.0, "dynamics": 0.5 },
        { "subject": "Орыс тілі мен әдебиеті", "quality_2024_2025_pct": 75.2, "quality_2025_2026_pct": 79.1, "dynamics": 3.9 },
        { "subject": "Алгебра", "quality_2024_2025_pct": 68.0, "quality_2025_2026_pct": 65.6, "dynamics": -2.4 },
        { "subject": "Геометрия", "quality_2024_2025_pct": 69.1, "quality_2025_2026_pct": 65.0, "dynamics": -4.1 },
        { "subject": "Физика", "quality_2024_2025_pct": 73.4, "quality_2025_2026_pct": 69.9, "dynamics": -3.5 },
        { "subject": "Биология", "quality_2024_2025_pct": 77.1, "quality_2025_2026_pct": 70.6, "dynamics": -6.5 },
        { "subject": "География", "quality_2024_2025_pct": 82.5, "quality_2025_2026_pct": 71.8, "dynamics": -10.7 },
        { "subject": "Химия", "quality_2024_2025_pct": 78.1, "quality_2025_2026_pct": 70.4, "dynamics": -7.7 },
        { "subject": "Қазақстан тарихы", "quality_2024_2025_pct": 77.4, "quality_2025_2026_pct": 78.5, "dynamics": 1.1 },
        { "subject": "Дүниежүзі тарихы", "quality_2024_2025_pct": 78.3, "quality_2025_2026_pct": 82.8, "dynamics": 4.5 },
        { "subject": "Ағылшын тілі", "quality_2024_2025_pct": 74.3, "quality_2025_2026_pct": 85.9, "dynamics": 11.6 },
        { "subject": "Информатика", "quality_2024_2025_pct": 96.4, "quality_2025_2026_pct": 91.4, "dynamics": -5.0 },
        { "subject": "Құқық негіздері", "quality_2024_2025_pct": null, "quality_2025_2026_pct": 76.6, "dynamics": null }
      ],
      "note": "Кейбір пәндердің былтырғы жылмен салыстырғанда төмен көрсеткіш көрсетуі (әсіресе география -10.7, химия -7.7, биология -6.5) жылдық білім сапасының жалпы төмендеуіне сәйкес келеді."
    }
  }
};
