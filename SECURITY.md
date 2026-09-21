# Security Policy

Focus Desk is intentionally local-first: task and session data are stored in browser `localStorage`; the application makes no network requests and has no backend, telemetry, accounts, or API keys.

## Reporting

Please report suspected vulnerabilities privately through GitHub's security reporting features when available. Do not publish sensitive exploit details before a fix is available.

## Data considerations

Browser local storage is **not encrypted**. Do not put passwords, secrets, medical records, or other highly sensitive information in task titles. Clearing site data removes Focus Desk data. Anyone with access to the same browser profile may be able to inspect it.

## Supported version

Security fixes target the current `main` branch and latest tagged release.

---

## الأمان

يعمل Focus Desk محليًا ويخزن المهام والجلسات في `localStorage` ولا يرسلها إلى خادم. التخزين المحلي **غير مشفر**؛ لذلك لا تستخدم عناوين المهام لحفظ كلمات المرور أو الأسرار أو المعلومات شديدة الحساسية.
