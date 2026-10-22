// Agregações do /dashboard (api/_lib/report.js): funil, contatos, jornadas e KPIs.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { funnels, kpis, contactReport, journeys, SECTIONS } from '../report.js';

const ev = (session_id, ts, name, props = {}, page_type = 'home') => ({ session_id, ts, name, props, page_type });

test('funnel counts unique sessions per section over sessions that opened the page', () => {
  const events = [
    ev('a', 't', 'page_view'), ev('b', 't', 'page_view'),
    ev('a', 't', 'section_view', { section: 'modelo' }), ev('a', 't', 'section_view', { section: 'modelo' }),
    ev('b', 't', 'section_view', { section: 'topo' }),
  ];
  const f = funnels(events).home;
  assert.equal(f.sessions, 2);
  assert.equal(f.steps.find((s) => s.key === 'modelo').value, 1);
  assert.equal(f.steps.find((s) => s.key === 'modelo').pct, 50);
  assert.equal(f.steps.find((s) => s.key === 'topo').label, 'Topo (hero)');
});

test('funnel follows the section order of each page', () => {
  assert.deepEqual(SECTIONS.home.slice(0, 3), ['topo', 'numeros', 'para-quem']);
  assert.equal(SECTIONS.home.at(-1), 'cta-final');
  assert.deepEqual(Object.keys(SECTIONS), ['home']);
  assert.equal(SECTIONS.home.includes('diagnostico'), true);
});

test('funnel ignores pages without a funnel (politica) and keeps the LP apart', () => {
  const events = [
    ev('a', 't', 'page_view'), ev('a', 't', 'section_view', { section: 'topo' }),
    ev('a', 't', 'page_view', {}, 'politica'), ev('a', 't', 'section_view', { section: 'topo' }, 'politica'),
  ];
  const f = funnels(events);
  assert.equal(f.home.sessions, 1);
  assert.equal(f.home.steps[0].value, 1);
  assert.equal(f.politica, undefined);
});

test('conversion counts WhatsApp OR phone, once per session', () => {
  const k = kpis([{ id: 1, wa_clicks: 2 }, { id: 2, phone_clicks: 1 }, { id: 3 }, { id: 4, wa_clicks: 1, phone_clicks: 1 }]);
  assert.equal(k.converting_sessions, 3);
  assert.equal(k.conversion_rate, 75);
  assert.equal(k.contacts, 5);
});

test('contacts are grouped by cta_location and pivoted by channel', () => {
  const events = [
    ev('a', 't', 'whatsapp_click', { cta_location: 'cta_whatsapp_hero' }),
    ev('b', 't', 'whatsapp_click', { cta_location: 'cta_whatsapp_hero' }),
    ev('b', 't', 'phone_click', { cta_location: 'telefone · contato' }),
    ev('a', 't', 'cta_click', { cta_location: 'maps · contato' }),
  ];
  const channel = { a: 'google_ads', b: 'direct' };
  const c = contactReport(events, (id) => channel[id]);
  assert.deepEqual(c.wa_by_location, [{ key: 'cta_whatsapp_hero', value: 2 }]);
  assert.deepEqual(c.phone_by_location, [{ key: 'telefone · contato', value: 1 }]);
  assert.deepEqual(c.cta_by_location, [{ key: 'maps · contato', value: 1 }]);
  const hero = c.contact_location_x_channel.find((r) => r.row === 'wa|cta_whatsapp_hero');
  assert.deepEqual(hero.cols, { google_ads: 1, direct: 1 });
});

test('journeys default to sessions that contacted; "todas" keeps every session', () => {
  const sessions = [{ id: 'a', wa_clicks: 1 }, { id: 'b' }];
  const evs = { a: [ev('a', 't', 'page_view'), ev('a', 't', 'whatsapp_click', { cta_location: 'fab_whatsapp' })] };
  const conv = journeys(sessions, evs, 'conv');
  assert.equal(conv.length, 1);
  assert.deepEqual(conv[0].trail.map((s) => s.text), ['Abriu a LP', 'WhatsApp (fab_whatsapp)']);
  assert.equal(journeys(sessions, evs, 'todas').length, 2);
});

test('click texts containing | keep text, section and page apart', async () => {
  const { clicks } = await import('../report.js');
  const [row] = clicks([{ session_id: 'a', name: 'click', page_type: 'home', props: { text: 'Seguro Auto', section: 'header' } }]);
  assert.deepEqual(row, { text: 'Seguro Auto', section: 'header', page: 'home', value: 1 });
});
