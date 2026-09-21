import { MODES, createTask, formatTime, sessionRecord, safeParseState, statsForDay, toggleTask } from './core.js';

const STORAGE_KEY = 'focus-desk:v1';
const state = safeParseState(localStorage.getItem(STORAGE_KEY));
let mode = 'focus';
let remaining = MODES.focus;
let running = false;
let deadline = null;
let interval = null;

const $ = s => document.querySelector(s);
const timer = $('#timer');
const start = $('#start');
const reset = $('#reset');
const taskList = $('#tasks');
const taskForm = $('#task-form');
const taskInput = $('#task-input');

function persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function selectedTaskId() { return document.querySelector('input[name="active-task"]:checked')?.value ?? null; }
function duration() { return Number(state.settings[mode]) || MODES[mode]; }

function renderTimer() {
  timer.textContent = formatTime(remaining);
  document.title = `${formatTime(remaining)} · Focus Desk`;
  start.textContent = running ? 'Pause' : 'Start';
  document.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
}

function renderTasks() {
  taskList.replaceChildren();
  for (const task of state.tasks) {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';
    const radio = document.createElement('input'); radio.type = 'radio'; radio.name = 'active-task'; radio.value = task.id; radio.disabled = task.done;
    const label = document.createElement('span'); label.textContent = task.title;
    const done = document.createElement('button'); done.textContent = task.done ? 'Undo' : 'Done'; done.className = 'ghost';
    done.addEventListener('click', () => { state.tasks = toggleTask(state.tasks, task.id); persist(); renderTasks(); });
    const del = document.createElement('button'); del.textContent = 'Delete'; del.className = 'ghost danger';
    del.addEventListener('click', () => { state.tasks = state.tasks.filter(t => t.id !== task.id); persist(); renderTasks(); });
    li.append(radio, label, done, del); taskList.append(li);
  }
  $('#empty').hidden = state.tasks.length > 0;
}

function renderStats() {
  const s = statsForDay(state.records);
  $('#sessions').textContent = s.sessions;
  $('#minutes').textContent = Math.round(s.focusSeconds / 60);
}

function stop() { running = false; deadline = null; clearInterval(interval); interval = null; renderTimer(); }
function complete() {
  stop();
  state.records.push(sessionRecord(mode, duration() - remaining || duration(), selectedTaskId()));
  state.records = state.records.slice(-5000); persist(); renderStats();
  remaining = duration(); renderTimer();
  if ('Notification' in window && Notification.permission === 'granted') new Notification('Focus Desk', { body: `${mode === 'focus' ? 'Focus' : 'Break'} session complete.` });
}
function tick() {
  remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000)); renderTimer();
  if (remaining <= 0) complete();
}

start.addEventListener('click', () => {
  if (running) return stop();
  running = true; deadline = Date.now() + remaining * 1000; interval = setInterval(tick, 250); renderTimer();
});
reset.addEventListener('click', () => { stop(); remaining = duration(); renderTimer(); });
document.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => { stop(); mode = b.dataset.mode; remaining = duration(); renderTimer(); }));
taskForm.addEventListener('submit', e => { e.preventDefault(); try { state.tasks.unshift(createTask(taskInput.value)); taskInput.value = ''; persist(); renderTasks(); } catch {} });
$('#clear-done').addEventListener('click', () => { state.tasks = state.tasks.filter(t => !t.done); persist(); renderTasks(); });
$('#notify').addEventListener('click', async () => { if ('Notification' in window) await Notification.requestPermission(); });

renderTimer(); renderTasks(); renderStats();
