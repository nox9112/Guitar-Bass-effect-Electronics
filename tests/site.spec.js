const {test,expect}=require('@playwright/test');
const detailIds={
 pedal:['fuzz-face','tube-screamer','rat','big-muff','compressor','phase90','chorus','pt2399'],
 amp:['5f1','5e3','jcm800-2204','ac15','b15n','ruby','tda7294'],
 wiring:['strat-5way','tele-3way','les-paul','coil-split','series-parallel','treble-bleed','blower-switch'],
 pickup:['strat-pickup','tele-bridge-pickup','p90','paf','p-bass','j-bass']
};

test('homepage renders all sections and internal navigation',async({page})=>{
 await page.goto('/index.html');
 await expect(page.locator('h1')).toContainText('Pedale');
 await expect(page.locator('#pedalGrid .card')).toHaveCount(8);
 await expect(page.locator('#wiringGrid .card')).toHaveCount(7);
 await expect(page.locator('#pickupGrid .card')).toHaveCount(6);
 await expect(page.locator('#ampPicker')).toHaveCount(1);
 const hrefs=await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')));
 expect(hrefs.filter(h=>/^https?:/i.test(h||''))).toEqual([]);
});

test('amp picker opens, contains all choices and closes by X and Escape',async({page})=>{
 await page.goto('/index.html');
 await page.locator('#ampPicker').click();
 await expect(page.locator('#ampModal')).toHaveClass(/on/);
 await expect(page.locator('#ampChoices a')).toHaveCount(7);
 await page.locator('#ampModal .close').click();
 await expect(page.locator('#ampModal')).not.toHaveClass(/on/);
 await page.locator('#ampPicker').click();
 await page.keyboard.press('Escape');
 await expect(page.locator('#ampModal')).not.toHaveClass(/on/);
});

for(const [type,ids] of Object.entries(detailIds)){
 for(const id of ids){
  test(`detail ${type}:${id} renders complete internal content`,async({page})=>{
   await page.goto(`/detail2.html?type=${type}&id=${id}`);
   await expect(page.locator('h1')).not.toHaveText('Nicht gefunden');
   await expect(page.locator('.schem svg')).toHaveCount(1);
   expect(await page.locator('.bom tbody tr').count()).toBeGreaterThan(0);
   await expect(page.locator('.cost')).not.toBeEmpty();
   const hrefs=await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')));
   expect(hrefs.filter(h=>/^https?:/i.test(h||''))).toEqual([]);
   const box=await page.locator('.schem').boundingBox();
   expect(box.width).toBeGreaterThan(250);
  });
 }
}

test('schematic viewer supports mouse, keyboard, zoom, fit, reset and close',async({page})=>{
 await page.goto('/detail2.html?type=pedal&id=fuzz-face');
 const preview=page.locator('.schem');
 await preview.click();
 await expect(page.locator('.slb')).toHaveClass(/on/);
 await expect(page.locator('.slbzoom')).toBeVisible();
 const initial=await page.locator('.slbzoom').innerText();
 await page.locator('[data-act="in"]').click();
 expect(await page.locator('.slbzoom').innerText()).not.toBe(initial);
 await page.locator('[data-act="reset"]').click();
 await expect(page.locator('.slbzoom')).toHaveText('100%');
 await page.locator('[data-act="fit"]').click();
 await expect(page.locator('.slbcanvas svg')).toBeVisible();
 await page.keyboard.press('+');
 await page.keyboard.press('-');
 await page.keyboard.press('0');
 await expect(page.locator('.slbzoom')).toHaveText('100%');
 await page.keyboard.press('Escape');
 await expect(page.locator('.slb')).not.toHaveClass(/on/);
 await preview.focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('.slb')).toHaveClass(/on/);
 await page.locator('[data-act="close"]').click();
 await expect(page.locator('.slb')).not.toHaveClass(/on/);
});

test('zoomed canvas grows its scrollable geometry instead of clipping',async({page})=>{
 await page.goto('/detail2.html?type=amp&id=jcm800-2204');
 await page.locator('.schem').click();
 await page.locator('[data-act="reset"]').click();
 const before=await page.locator('.slbcanvas').boundingBox();
 for(let i=0;i<4;i++)await page.locator('[data-act="in"]').click();
 const after=await page.locator('.slbcanvas').boundingBox();
 expect(after.width).toBeGreaterThan(before.width*1.5);
 expect(after.height).toBeGreaterThan(before.height*1.5);
 const metrics=await page.locator('.slbview').evaluate(el=>({sw:el.scrollWidth,cw:el.clientWidth,sh:el.scrollHeight,ch:el.clientHeight}));
 expect(metrics.sw).toBeGreaterThan(metrics.cw);
 expect(metrics.sh).toBeGreaterThan(metrics.ch);
});

test('unknown detail fails safely',async({page})=>{
 await page.goto('/detail2.html?type=pedal&id=does-not-exist');
 await expect(page.locator('h1')).toHaveText('Nicht gefunden');
 await expect(page.locator('.schem svg')).toHaveCount(1);
 await expect(page.locator('a.backlink')).toHaveAttribute('href','index.html');
});

test('page has no accidental horizontal overflow on phone layout',async({page},testInfo)=>{
 if(!testInfo.project.name.includes('mobile'))test.skip();
 for(const url of ['/index.html','/detail2.html?type=pedal&id=tube-screamer','/detail2.html?type=pickup&id=paf']){
  await page.goto(url);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(2);
 }
});

test('mobile schematic controls are touch sized and viewer fits viewport',async({page},testInfo)=>{
 if(!testInfo.project.name.includes('mobile'))test.skip();
 await page.goto('/detail2.html?type=wiring&id=strat-5way');
 await page.locator('.schem').click();
 await expect(page.locator('.slb')).toHaveClass(/on/);
 const viewport=page.viewportSize();
 const overlay=await page.locator('.slb').boundingBox();
 expect(overlay.width).toBeLessThanOrEqual(viewport.width+1);
 expect(overlay.height).toBeLessThanOrEqual(viewport.height+1);
 for(const b of await page.locator('.slbbar button').all()){
  const r=await b.boundingBox();expect(r.height).toBeGreaterThanOrEqual(44);expect(r.width).toBeGreaterThanOrEqual(44);
 }
});
