export const MODES = Object.freeze({ focus: 25 * 60, short: 5 * 60, long: 15 * 60 });
export const MAX_TASK_LENGTH = 160;

export function clampSeconds(value, fallback = MODES.focus) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 1 && n <= 24 * 60 * 60 ? Math.floor(n) : fallback;
}

export function formatTime(totalSeconds) {
  const s = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export function normalizeTaskTitle(value) {
  return String(value ?? '').trim().replace(/\s+/g, ' ').slice(0, MAX_TASK_LENGTH);
}

export function createTask(title, id = crypto.randomUUID(), now = new Date().toISOString()) {
  const clean = normalizeTaskTitle(title);
  if (!clean) throw new Error('Task title is required.');
  return { id, title: clean, done: false, createdAt: now };
}

export function toggleTask(tasks, id) {
  return tasks.map(task => task.id === id ? { ...task, done: !task.done } : task);
}

export function sessionRecord(mode, durationSeconds, taskId = null, at = new Date().toISOString()) {
  if (!Object.hasOwn(MODES, mode)) throw new Error('Unknown focus mode.');
  return { mode, durationSeconds: clampSeconds(durationSeconds), taskId, at };
}

export function statsForDay(records, day = new Date()) {
  const key = day.toISOString().slice(0, 10);
  const today = records.filter(r => String(r.at).slice(0, 10) === key && r.mode === 'focus');
  return {
    sessions: today.length,
    focusSeconds: today.reduce((sum, r) => sum + clampSeconds(r.durationSeconds, 0), 0)
  };
}

export function safeParseState(raw) {
  const empty = { tasks: [], records: [], settings: {} };
  if (!raw) return empty;
  try {
    const parsed = JSON.parse(raw);
    return {
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks.filter(t => t && typeof t.id === 'string' && typeof t.title === 'string').slice(0, 500) : [],
      records: Array.isArray(parsed.records) ? parsed.records.filter(r => r && Object.hasOwn(MODES, r.mode)).slice(-5000) : [],
      settings: parsed.settings && typeof parsed.settings === 'object' && !Array.isArray(parsed.settings) ? parsed.settings : {}
    };
  } catch { return empty; }
}
