const {test,expect}=require('@playwright/test');

test('homepage renders compact technical library',async({page})=>{
  await page.goto('/index.html');
  await expect(page.locator('h1')).toHaveText('ToneForge Workshop');
  await expect(page.locator('.project-card')).toHaveCount(56);
  await expect(page.locator('.project-grid').first()).toHaveCSS('grid-template-columns',/px .*px/);
  await expect(page.locator('.hero-dashboard')).toHaveCount(0);
  await expect(page.locator('.project-thumb.has-photo')).toHaveCount(10);
  await expect(page.locator('[data-stat-plans]')).toHaveText('26/56');
  await expect(page.locator('[data-stat-plans-label]')).toHaveText('30 offen');
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
  await expect(page.locator('.project-card:not([hidden])')).toHaveCount(30);
});

test('favorite state is functional and persistent',async({page})=>{
  await page.goto('/index.html');await page.evaluate(()=>localStorage.clear());await page.reload();
  const card=page.locator('[data-key="pedal:fuzz-face"]');await card.locator('[data-favorite]').click();await expect(card.locator('[data-favorite]')).toHaveClass(/active/);await page.reload();await expect(page.locator('[data-key="pedal:fuzz-face"] [data-favorite]')).toHaveClass(/active/);
});

test('Fuzz Face detail prioritizes real source schematic',async({page})=>{
  await page.goto('/detail2.html?type=pedal&id=fuzz-face');await expect(page.locator('h1')).toHaveText('Fuzz Face');await expect(page.locator('.source-plan-card')).toHaveCount(1);await expect(page.locator('.source-plan-card')).toHaveAttribute('data-standard','ANSI');await expect(page.locator('.plan-stage img')).toHaveCount(1);await expect(page.locator('.schem')).toHaveCount(0);await expect(page.locator('[data-wake-lock]')).toHaveCount(0);await expect(page.locator('[data-detail-share]')).toHaveCount(0);expect(await page.locator('.bom tbody tr').count()).toBeGreaterThan(0);
});

test('schematic preview opens and closes inside the project page',async({page})=>{
  await page.goto('/detail2.html?type=pedal&id=fuzz-face');
  await expect(page.getByText('Originalgröße ↗')).toHaveCount(0);
  await page.locator('.plan-stage').click();
  await expect(page.locator('.schematic-modal')).toBeVisible();
  await page.locator('.schematic-modal [data-schematic-close]').click();
  await expect(page.locator('.schematic-modal')).toBeHidden();
});

test('Micro Amp shows small product photo and real reference schematic',async({page})=>{
  await page.goto('/detail2.html?type=pedal&id=micro-amp');await expect(page.locator('h1')).toContainText('Micro Amp');await expect(page.locator('.detail-product img')).toHaveCount(1);await expect(page.locator('.source-plan-card')).toHaveCount(1);await expect(page.locator('.plan-stage img')).toHaveCount(1);await expect(page.getByText('FEHLT',{exact:true})).toHaveCount(0);
});

test('newly sourced projects no longer pretend to be complete or missing',async({page})=>{
  const projects=['boss-ds1','sd1','orange-squeezer','noise-gate','envelope-filter','belton-reverb','aby-buffered'];
  for(const id of projects){
    await page.goto(`/detail2.html?type=pedal&id=${id}`);
    await expect(page.locator('.source-plan-card').first()).toBeVisible();
    await expect(page.getByText('FEHLT',{exact:true})).toHaveCount(0);
    await expect(page.locator('.source-plan-card[data-review="verified"]')).toHaveCount(0);
  }
});

test('coil split no longer embeds weak Pinterest provenance',async({page})=>{
  await page.goto('/detail2.html?type=wiring&id=coil-split');await expect(page.locator('.source-plan-card')).toHaveCount(1);await expect(page.locator('.plan-stage img')).toHaveCount(0);await expect(page.getByText('Der Plan liegt bei der Quelle.')).toHaveCount(1);const links=await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.href));expect(links.some(h=>h.includes('pinterest')||h.includes('pinimg'))).toBeFalsy();
});

test('no active page references a hand-coded ToneForge redraw',async({page})=>{
  for(const url of ['/index.html','/detail2.html?type=pedal&id=phase90','/detail2.html?type=pedal&id=rangemaster']){
    await page.goto(url);
    const refs=await page.locator('[src],[href]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('src')||n.getAttribute('href')||''));
    expect(refs.some(v=>/redraw\.svg|ToneForge-Neuzeichnung/i.test(v))).toBeFalsy();
  }
});

test('schematic standard switch only appears for multiple real standards',async({page})=>{await page.goto('/detail2.html?type=pedal&id=fuzz-face');await expect(page.locator('[data-plan-standard]')).toHaveCount(0)});

test('desktop pages avoid accidental horizontal overflow',async({page})=>{for(const url of ['/index.html','/detail2.html?type=pedal&id=fuzz-face','/detail2.html?type=pedal&id=micro-amp','/detail2.html?type=pedal&id=boss-ds1']){await page.goto(url);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);expect(overflow).toBeLessThanOrEqual(2)}});

test('unknown project fails safely',async({page})=>{await page.goto('/detail2.html?type=pedal&id=does-not-exist');await expect(page.locator('h1')).toHaveText('Nicht gefunden');await expect(page.getByText('FEHLT',{exact:true})).toHaveCount(1);await expect(page.locator('a.backlink')).toHaveAttribute('href','index.html#library')});
