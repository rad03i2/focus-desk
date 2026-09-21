import test from 'node:test';
import assert from 'node:assert/strict';
import { createTask, formatTime, normalizeTaskTitle, safeParseState, sessionRecord, statsForDay, toggleTask } from '../src/core.js';

test('formats timer values safely', () => { assert.equal(formatTime(1500), '25:00'); assert.equal(formatTime(-1), '00:00'); });
test('normalizes and creates tasks', () => { const t=createTask('  Ship   release  ','id','2026-09-21T00:00:00Z'); assert.equal(t.title,'Ship release'); assert.equal(t.id,'id'); assert.throws(()=>createTask('   ')); });
test('toggles only requested task', () => { const a={id:'a',title:'A',done:false},b={id:'b',title:'B',done:false}; const r=toggleTask([a,b],'b'); assert.equal(r[0].done,false); assert.equal(r[1].done,true); });
test('computes daily focus stats and ignores breaks', () => { const records=[sessionRecord('focus',1500,null,'2026-09-21T01:00:00Z'),sessionRecord('short',300,null,'2026-09-21T02:00:00Z'),sessionRecord('focus',600,null,'2026-09-20T02:00:00Z')]; assert.deepEqual(statsForDay(records,new Date('2026-09-21T12:00:00Z')),{sessions:1,focusSeconds:1500}); });
test('recovers safely from corrupt storage', () => { assert.deepEqual(safeParseState('{bad'),{tasks:[],records:[],settings:{}}); });
test('caps task title length', () => assert.equal(normalizeTaskTitle('x'.repeat(300)).length,160));
