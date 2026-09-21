# Focus Desk

A privacy-first, local browser focus timer and lightweight task desk. Focus Desk combines a Pomodoro-style timer, active-task selection, daily focus statistics, and persistent local tasks without accounts, analytics, cloud services, or runtime dependencies.

**Author:** Radwan Abdulhadi Ahmed · رضوان عبدالهادي أحمد · GitHub: @rad03i2

## English

### Why it exists
Many focus tools require an account or send productivity data to a service. Focus Desk is deliberately small: open it in a browser, work, and keep the data on your device.

### Features
- Focus (25 min), short break (5 min), and long break (15 min) modes.
- Start, pause, reset, and deadline-based timing that resists browser interval drift.
- Local task list with active-task selection, completion, undo, deletion, and clear-completed actions.
- Daily completed focus-session count and focused-minute total.
- Optional browser notification when a session completes.
- Persistent browser storage with defensive recovery from malformed stored JSON.
- Responsive keyboard-friendly interface and system dark presentation.
- No backend, telemetry, cookies, trackers, API keys, or runtime package dependencies.
- Tested domain logic and cross-platform CI.

### Requirements
A modern browser supporting ES modules and `crypto.randomUUID()` (current Chrome, Edge, Firefox, or Safari). Node.js 20+ is required only for tests.

### Installation and running
Clone the repository, then serve it over HTTP:

```bash
git clone https://github.com/rad03i2/focus-desk.git
cd focus-desk
python -m http.server 8080
```

Open `http://localhost:8080`. You may use any static HTTP server. `npm install` is not required because there are no package dependencies.

### Usage
1. Add the task you want to work on and optionally select its radio button.
2. Choose **Focus**, **Short break**, or **Long break**.
3. Press **Start**. Pause/resume as needed.
4. A completed focus interval is added to today's statistics.
5. Enable notifications if you want an OS/browser alert when an interval ends.

Tasks and session history persist in the current browser profile. Clearing site data clears them.

### Configuration
The current release intentionally uses fixed Pomodoro defaults: 25/5/15 minutes. There is no environment file or remote configuration. The domain model supports validated durations internally, but the UI does not yet expose custom duration settings.

### Project structure
```text
focus-desk/
├── index.html             # Application shell
├── styles.css             # Responsive UI
├── src/
│   ├── app.js             # Browser state, timer, storage and rendering
│   └── core.js            # Pure/testable domain functions
├── tests/core.test.js     # Node built-in test suite
├── .github/workflows/ci.yml
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE
└── package.json
```

### Testing
```bash
npm test
```
The suite uses Node's built-in test runner and covers timer formatting, task normalization/creation/toggling, daily statistics, and corrupt-storage recovery. CI runs the suite with Node 20 and 22 on Ubuntu, Windows, and macOS.

### Preview / screenshots
Run the app at `http://localhost:8080` and capture the full responsive desk after adding a few non-sensitive sample tasks. No generated screenshot is committed, so the repository does not present a mock UI as the real product.

### Security and privacy
All application data remains in browser `localStorage`. Focus Desk makes no application network requests. Local storage is not encrypted, so do not store secrets or highly sensitive information in task titles. See [SECURITY.md](SECURITY.md).

### Limitations
- Data stays in one browser profile; there is no synchronization or backup/export yet.
- Local storage is not encrypted.
- Timer accuracy follows the device clock and browser lifecycle; closing the page ends the running timer.
- Notifications depend on browser permission and platform support.
- Custom timer durations, recurring tasks, reports, and installable PWA behavior are not implemented.

### Optional roadmap
Possible future work includes local JSON export/import, configurable durations, an installable offline PWA, and richer weekly statistics. These are optional future ideas, not current features.

### Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md). Please preserve the local-first privacy model and add tests for domain behavior.

### License
MIT — see [LICENSE](LICENSE).

### Author
**Radwan Abdulhadi Ahmed**  
**رضوان عبدالهادي أحمد**  
GitHub: **@rad03i2**

---

## العربية

### نظرة عامة
**Focus Desk** أداة تركيز وإدارة مهام خفيفة تعمل محليًا داخل المتصفح. تجمع مؤقتًا بأسلوب بومودورو مع اختيار المهمة الحالية وإحصاءات يومية وقائمة مهام محفوظة، من دون حساب أو خادم أو تحليلات أو خدمات سحابية.

### لماذا أُنشئ المشروع؟
تتطلب كثير من أدوات الإنتاجية حسابًا أو ترسل بيانات الاستخدام إلى خدمة خارجية. صُمم Focus Desk ليكون صغيرًا وواضحًا: تشغله في المتصفح، تعمل، وتبقى بياناتك على جهازك.

### المميزات
- أوضاع تركيز 25 دقيقة، استراحة قصيرة 5 دقائق، واستراحة طويلة 15 دقيقة.
- بدء وإيقاف مؤقت واستئناف وإعادة ضبط المؤقت.
- حساب الوقت اعتمادًا على موعد الانتهاء لتقليل انحراف مؤقتات المتصفح.
- قائمة مهام محلية مع تحديد المهمة النشطة، الإنجاز، التراجع، الحذف ومسح المهام المنجزة.
- إحصاءات يومية لعدد جلسات التركيز المكتملة ومجموع دقائق التركيز.
- إشعار متصفح اختياري عند انتهاء الجلسة.
- حفظ تلقائي محلي مع تعافٍ آمن إذا أصبحت بيانات التخزين غير صالحة.
- واجهة متجاوبة ومناسبة للوحة المفاتيح.
- لا خادم ولا تتبع ولا مفاتيح API ولا اعتماديات تشغيل خارجية.

### المتطلبات
متصفح حديث يدعم ES Modules و`crypto.randomUUID()`. تحتاج Node.js 20 أو أحدث فقط لتشغيل الاختبارات.

### التثبيت والتشغيل
```bash
git clone https://github.com/rad03i2/focus-desk.git
cd focus-desk
python -m http.server 8080
```
ثم افتح `http://localhost:8080`. يمكن استخدام أي خادم ملفات ثابت، ولا تحتاج إلى `npm install` لعدم وجود حزم تشغيل خارجية.

### الاستخدام
أضف مهمة وحددها إن رغبت، اختر نوع الجلسة، ثم اضغط **Start**. عند اكتمال جلسة تركيز تُضاف إلى إحصاءات اليوم. يمكنك تفعيل الإشعارات للحصول على تنبيه عند نهاية الجلسة.

### الإعداد
الإصدار الحالي يستخدم مدد بومودورو ثابتة 25/5/15 دقيقة عمدًا. لا يوجد ملف `.env` أو إعداد بعيد، والواجهة لا تعرض بعد تخصيص المدد.

### بنية المشروع
`index.html` للواجهة، و`styles.css` للتصميم، و`src/app.js` لمنطق المتصفح والتخزين، و`src/core.js` للمنطق القابل للاختبار، و`tests/core.test.js` للاختبارات، و`.github/workflows/ci.yml` للتكامل المستمر.

### الاختبارات
```bash
npm test
```
تغطي الاختبارات تنسيق الوقت، وإنشاء المهام وتنظيفها وتبديل حالتها، والإحصاءات اليومية، والتعامل مع بيانات التخزين التالفة. يشغّل CI الاختبارات على Ubuntu وWindows وmacOS باستخدام Node 20 و22.

### المعاينة والصور
شغّل المشروع محليًا ثم التقط صورة للواجهة الفعلية بعد إضافة مهام تجريبية غير حساسة. لا توجد صورة مولدة وهمية داخل المستودع تُعرض على أنها المنتج الحقيقي.

### الخصوصية والأمان
تبقى البيانات في `localStorage` داخل المتصفح، ولا يجري التطبيق طلبات شبكة. التخزين المحلي غير مشفر، لذلك لا تحفظ كلمات مرور أو أسرارًا أو معلومات شديدة الحساسية في عناوين المهام. راجع [SECURITY.md](SECURITY.md).

### القيود
- لا توجد مزامنة بين الأجهزة أو تصدير/استيراد حاليًا.
- التخزين المحلي غير مشفر.
- إغلاق الصفحة ينهي المؤقت الجاري.
- الإشعارات تعتمد على إذن ودعم المتصفح.
- تخصيص المدد والمهام المتكررة والتقارير وPWA غير منفذة حاليًا.

### تطوير اختياري مستقبلي
يمكن مستقبلًا إضافة تصدير واستيراد JSON محلي، ومدد قابلة للتخصيص، وPWA للعمل دون اتصال، وإحصاءات أسبوعية أوسع. هذه أفكار اختيارية وليست ميزات حالية.

### المساهمة
راجع [CONTRIBUTING.md](CONTRIBUTING.md)، وحافظ على مبدأ الخصوصية والتشغيل المحلي وأضف اختبارات لأي منطق جديد.

### الترخيص
MIT — راجع [LICENSE](LICENSE).

### المؤلف
**Radwan Abdulhadi Ahmed**  
**رضوان عبدالهادي أحمد**  
GitHub: **@rad03i2**
