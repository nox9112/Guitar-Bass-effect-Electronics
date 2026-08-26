const {test,expect}=require('@playwright/test');

test('homepage renders compact technical library with source coverage',async({page})=>{
  await page.goto('/index.html');
  await expect(page.locator('h1')).toHaveText('ToneForge Workshop');
  await expect(page.locator('.project-card')).toHaveCount(56);
  await expect(page.locator('.project-grid').first()).toHaveCSS('grid-template-columns',/px .*px/);
  await expect(page.locator('.hero-dashboard')).toHaveCount(0);
  await expect(page.locator('[data-stat-plans]')).toHaveText('56/56');
  await expect(page.locator('[data-stat-plans-label]')).toHaveText('0 offen');
  await expect(page.locator('.plan-state.open')).toHaveCount(0);
});

test('pedal media uses stable current sources',async({page})=>{
  await page.goto('/index.html');
  const media=await page.evaluate(()=>window.ToneForgeMedia);
  expect(Object.keys(media).length).toBeGreaterThanOrEqual(12);
  expect(media['pedal:phase90'].photo).toContain('cdn11.bigcommerce.com');
  expect(media['pedal:phase90'].source).toContain('jimdunlop.com');
  expect(media['pedal:phase90'].photo).not.toContain('chicagomusicexchange');
  expect(media['pedal:boss-ds1'].photo).toContain('static.roland.com');
  expect(media['pedal:sd1'].photo).toContain('static.roland.com');
});

test('every library key has at least one real technical source',async({page})=>{
  await page.goto('/index.html');
  const result=await page.evaluate(()=>({
    library:window.ToneForgeLibrary.all.map(x=>x.key),
    sourced:Object.keys(window.GBE_SCHEMATIC_SOURCES).filter(k=>(window.GBE_SCHEMATIC_SOURCES[k]||[]).length),
    empty:Object.entries(window.GBE_SCHEMATIC_SOURCES).filter(([,v])=>!Array.isArray(v)||!v.length).map(([k])=>k)
  }));
  expect(result.library).toHaveLength(56);
  expect(result.empty).toEqual([]);
  expect(result.library.filter(k=>!result.sourced.includes(k))).toEqual([]);
});

test('filters and search are functional',async({page})=>{
  await page.goto('/index.html');
  await expect(page.locator('[data-filter]')).toHaveCount(9);
  await page.locator('[data-filter="pedals"]').click();
  await expect(page.locator('.library-category:not([hidden])')).toHaveCount(1);
  await page.locator('[data-library-search]').fill('Micro Amp');
  await expect(page.locator('.project-card:not([hidden])')).toHaveCount(1);
  await page.locator('[data-clear-search]').click();
  await expect(page.locator('.project-card:not([hidden])')).toHaveCount(25);
  await page.locator('[data-filter="missing"]').click();
  await expect(page.locator('.project-card:not([hidden])')).toHaveCount(0);
});

test('favorite state is functional and persistent',async({page})=>{
  await page.goto('/index.html');await page.evaluate(()=>localStorage.clear());await page.reload();
  const card=page.locator('[data-key="pedal:fuzz-face"]');await card.locator('[data-favorite]').click();await expect(card.locator('[data-favorite]')).toHaveClass(/active/);await page.reload();await expect(page.locator('[data-key="pedal:fuzz-face"] [data-favorite]')).toHaveClass(/active/);
});

test('Fuzz Face detail prioritizes real source schematic',async({page})=>{
  await page.goto('/detail2.html?type=pedal&id=fuzz-face');await expect(page.locator('h1')).toHaveText('Fuzz Face');await expect(page.locator('.source-plan-card')).toHaveCount(1);await expect(page.locator('.source-plan-card')).toHaveAttribute('data-standard','ANSI');await expect(page.locator('.plan-stage img')).toHaveCount(1);await expect(page.locator('.schem')).toHaveCount(0);expect(await page.locator('.bom tbody tr').count()).toBeGreaterThan(0);
});

test('schematic preview opens and closes inside the project page',async({page})=>{
  await page.goto('/detail2.html?type=pedal&id=fuzz-face');
  await expect(page.getByText('Originalgröße ↗')).toHaveCount(0);
  await page.locator('.plan-stage').click();
  await expect(page.locator('.schematic-modal')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.schematic-modal')).toBeHidden();
});

test('source-found projects are not falsely labelled verified',async({page})=>{
  const pages=[
    '/detail2.html?type=pedal&id=boss-ds1',
    '/detail2.html?type=pedal&id=pt2399',
    '/detail2.html?type=amp&id=5f1',
    '/detail2.html?type=instrument&id=keyboard',
    '/detail2.html?type=body&id=e-guitar'
  ];
  for(const url of pages){
    await page.goto(url);
    await expect(page.locator('.source-plan-card').first()).toBeVisible();
    await expect(page.getByText('FEHLT',{exact:true})).toHaveCount(0);
    await expect(page.locator('.source-plan-card[data-review="verified"]')).toHaveCount(0);
  }
});

test('phase90 is sourced but still explicitly not build-ready',async({page})=>{
  await page.goto('/detail2.html?type=pedal&id=phase90');
  await expect(page.locator('.source-plan-card')).toHaveCount(2);
  await expect(page.locator('.source-plan-card[data-review="verified"]')).toHaveCount(0);
  await expect(page.getByText(/BOM NOCH NICHT EINGEFROREN/)).toBeVisible();
  await expect(page.locator('a').filter({hasText:'CAD öffnen'})).toHaveCount(1);
});

test('pickup projects include winding and construction sources',async({page})=>{
  for(const id of ['strat-pickup','tele-bridge-pickup','p90','paf','p-bass','j-bass']){
    await page.goto(`/detail2.html?type=pickup&id=${id}`);
    await expect(page.locator('.source-plan-card')).toHaveCount(2);
    const standards=await page.locator('.source-plan-card').evaluateAll(cs=>cs.map(c=>c.dataset.standard));
    expect(standards).toContain('WINDING');expect(standards).toContain('CONSTRUCTION');
  }
});

test('tube amplifier projects carry high-voltage cautions',async({page})=>{
  for(const id of ['5f1','5e3','jcm800-2204','ac15','b15n']){
    await page.goto(`/detail2.html?type=amp&id=${id}`);
    await expect(page.locator('.source-plan-card').first()).toContainText(/HIGH VOLTAGE/);
  }
});

test('coil split uses manufacturer-specific provenance',async({page})=>{
  await page.goto('/detail2.html?type=wiring&id=coil-split');
  await expect(page.locator('.source-plan-card')).toHaveCount(1);
  await expect(page.locator('.source-plan-card')).toContainText('Seymour Duncan');
  const links=await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.href));
  expect(links.some(h=>h.includes('pinterest')||h.includes('pinimg'))).toBeFalsy();
});

test('no active page references a hand-coded ToneForge redraw',async({page})=>{
  for(const url of ['/index.html','/detail2.html?type=pedal&id=phase90','/detail2.html?type=pedal&id=rangemaster']){
    await page.goto(url);
    const refs=await page.locator('[src],[href]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('src')||n.getAttribute('href')||''));
    expect(refs.some(v=>/redraw\.svg|ToneForge-Neuzeichnung/i.test(v))).toBeFalsy();
  }
});

test('desktop pages avoid accidental horizontal overflow',async({page})=>{
  for(const url of ['/index.html','/detail2.html?type=pedal&id=fuzz-face','/detail2.html?type=pedal&id=boss-ds1','/detail2.html?type=pickup&id=paf','/detail2.html?type=body&id=e-guitar']){
    await page.goto(url);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);expect(overflow).toBeLessThanOrEqual(2);
  }
});

test('unknown project fails safely',async({page})=>{await page.goto('/detail2.html?type=pedal&id=does-not-exist');await expect(page.locator('h1')).toHaveText('Nicht gefunden');await expect(page.getByText('FEHLT',{exact:true})).toHaveCount(1);await expect(page.locator('a.backlink')).toHaveAttribute('href','index.html#library')});
