const {test,expect}=require('@playwright/test');

test('homepage renders compact technical library',async({page})=>{
  await page.goto('/index.html');
  await expect(page.locator('h1')).toHaveText('ToneForge Workshop');
  await expect(page.locator('.project-card')).toHaveCount(56);
  await expect(page.locator('.project-grid').first()).toHaveCSS('grid-template-columns',/px .*px/);
  await expect(page.locator('.hero-dashboard')).toHaveCount(0);
  await expect(page.locator('.project-thumb.has-photo')).toHaveCount(10);
  await expect(page.getByText('Der Schaltplan hat Priorität.')).toHaveCount(0);
});

test('all visible button-like controls have an implemented purpose',async({page})=>{
  await page.goto('/index.html');
  await expect(page.locator('[data-filter]')).toHaveCount(8);
  await page.locator('[data-filter="pedals"]').click();
  await expect(page.locator('.library-category:not([hidden])')).toHaveCount(1);
  await page.locator('[data-library-search]').fill('Micro Amp');
  await expect(page.locator('.project-card:not([hidden])')).toHaveCount(1);
  await page.locator('[data-clear-search]').click();
  await expect(page.locator('.project-card:not([hidden])')).toHaveCount(25);
});

test('favorite state is functional and persistent',async({page})=>{
  await page.goto('/index.html');
  await page.evaluate(()=>localStorage.clear());
  await page.reload();
  const card=page.locator('[data-key="pedal:fuzz-face"]');
  await card.locator('[data-favorite]').click();
  await expect(card.locator('[data-favorite]')).toHaveClass(/active/);
  await page.reload();
  await expect(page.locator('[data-key="pedal:fuzz-face"] [data-favorite]')).toHaveClass(/active/);
});

test('Fuzz Face detail prioritizes real source schematic',async({page})=>{
  await page.goto('/detail2.html?type=pedal&id=fuzz-face');
  await expect(page.locator('h1')).toHaveText('Fuzz Face');
  await expect(page.locator('.source-plan-card')).toHaveCount(1);
  await expect(page.locator('.source-plan-card')).toHaveAttribute('data-standard','ANSI');
  await expect(page.locator('.plan-stage img')).toHaveCount(1);
  await expect(page.locator('.schem')).toHaveCount(0);
  await expect(page.locator('[data-wake-lock]')).toHaveCount(0);
  await expect(page.locator('[data-detail-share]')).toHaveCount(0);
  await expect(page.locator('.bom tbody tr').count()).resolves.toBeGreaterThan(0);
});

test('Micro Amp uses product photo but does not fake a schematic',async({page})=>{
  await page.goto('/detail2.html?type=pedal&id=micro-amp');
  await expect(page.locator('h1')).toContainText('Micro Amp');
  await expect(page.locator('.detail-product img')).toHaveCount(1);
  await expect(page.locator('.source-plan-card')).toHaveCount(0);
  await expect(page.getByText('FEHLT',{exact:true})).toHaveCount(1);
  await expect(page.getByText('Kein Blockschaltbild und keine Eigenzeichnung wird als Ersatz ausgegeben.')).toHaveCount(1);
});

test('coil split no longer embeds weak Pinterest provenance',async({page})=>{
  await page.goto('/detail2.html?type=wiring&id=coil-split');
  await expect(page.locator('.source-plan-card')).toHaveCount(1);
  await expect(page.locator('.plan-stage img')).toHaveCount(0);
  await expect(page.getByText('Der Plan liegt bei der Quelle.')).toHaveCount(1);
  const links=await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.href));
  expect(links.some(h=>h.includes('pinterest')||h.includes('pinimg'))).toBeFalsy();
});

test('schematic standard switch only appears when multiple real standards exist',async({page})=>{
  await page.goto('/detail2.html?type=pedal&id=fuzz-face');
  await expect(page.locator('[data-plan-standard]')).toHaveCount(0);
});

test('desktop pages avoid accidental horizontal overflow',async({page})=>{
  for(const url of ['/index.html','/detail2.html?type=pedal&id=fuzz-face','/detail2.html?type=pedal&id=micro-amp']){
    await page.goto(url);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(2);
  }
});

test('unknown project fails safely',async({page})=>{
  await page.goto('/detail2.html?type=pedal&id=does-not-exist');
  await expect(page.locator('h1')).toHaveText('Nicht gefunden');
  await expect(page.getByText('FEHLT',{exact:true})).toHaveCount(1);
  await expect(page.locator('a.backlink')).toHaveAttribute('href','index.html#library');
});
