const {test,expect}=require('@playwright/test');
const detailIds={
 pedal:['fuzz-face','tube-screamer','rat','big-muff','compressor','phase90','chorus','pt2399','distortion-plus','vox-v847','rangemaster','tone-bender-mkii','green-ringer','ea-tremolo','boss-ds1','sd1','micro-amp','orange-squeezer','noise-gate','envelope-filter','belton-reverb','aby-buffered','volume-passive','sample-trigger'],
 amp:['5f1','5e3','jcm800-2204','ac15','b15n','ruby','tda7294'],
 wiring:['strat-5way','tele-3way','les-paul','coil-split','series-parallel','treble-bleed','blower-switch','hss-autosplit','hsh-superswitch','phase-reverse','kill-switch','nashville-tele'],
 pickup:['strat-pickup','tele-bridge-pickup','p90','paf','p-bass','j-bass']
};
const truePlans={
 'fuzz-face':14,'tube-screamer':30,'rat':23,'distortion-plus':20
};

test('homepage renders expanded library and internal navigation',async({page})=>{
 await page.goto('/index.html');
 await expect(page.locator('h1')).toContainText('Pedale');
 await expect(page.locator('#pedalGrid .card')).toHaveCount(24);
 await expect(page.locator('#wiringGrid .card')).toHaveCount(12);
 await expect(page.locator('#pickupGrid .card')).toHaveCount(6);
 await expect(page.locator('#ampPicker')).toHaveCount(1);
 const hrefs=await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')));
 expect(hrefs.filter(h=>/^https?:/i.test(h||''))).toEqual([]);
 expect(hrefs.filter(h=>(h||'').startsWith('detail.html?'))).toEqual([]);
});

test('amp picker opens, contains all choices and closes by X and Escape',async({page})=>{
 await page.goto('/index.html');await page.locator('#ampPicker').click();await expect(page.locator('#ampModal')).toHaveClass(/on/);await expect(page.locator('#ampChoices a')).toHaveCount(7);await page.locator('#ampModal .close').click();await expect(page.locator('#ampModal')).not.toHaveClass(/on/);await page.locator('#ampPicker').click();await page.keyboard.press('Escape');await expect(page.locator('#ampModal')).not.toHaveClass(/on/);
});

for(const [type,ids] of Object.entries(detailIds))for(const id of ids)test(`detail ${type}:${id} renders complete internal content`,async({page})=>{
 await page.goto(`/detail2.html?type=${type}&id=${id}`);await expect(page.locator('h1')).not.toHaveText('Nicht gefunden');await expect(page.locator('.schem svg')).toHaveCount(1);expect(await page.locator('.bom tbody tr').count()).toBeGreaterThan(0);await expect(page.locator('.cost')).not.toBeEmpty();await expect(page.getByText('Datenstand / Referenzen')).toHaveCount(1);const hrefs=await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')));expect(hrefs.filter(h=>/^https?:/i.test(h||''))).toEqual([]);const box=await page.locator('.schem').boundingBox();expect(box.width).toBeGreaterThan(250);
});

for(const [id,count] of Object.entries(truePlans))test(`${id} has a registered component schematic`,async({page})=>{
 await page.goto(`/detail2.html?type=pedal&id=${id}`);await expect(page.locator('.true-schematic[data-schematic-kind="component"]')).toHaveCount(1);await expect(page.locator('.schem [data-component]')).toHaveCount(count);await expect(page.getByText('Komponenten-Schaltplan',{exact:true})).toHaveCount(1);await expect(page.getByText('Stückliste / Lötstatus',{exact:true})).toHaveCount(1);
});

test('Fuzz Face keeps classic component values',async({page})=>{
 await page.goto('/detail2.html?type=pedal&id=fuzz-face');for(const id of ['C1','Q1','R1','R4','Q2','R2','R3','C3','VR1','C2','VR2'])await expect(page.locator(`.schem [data-component="${id}"]`)).toHaveCount(1);await expect(page.locator('.schem')).toContainText('33 kΩ');await expect(page.locator('.schem')).toContainText('100 kΩ feedback');await expect(page.locator('.schem')).toContainText('8.2 kΩ');await expect(page.locator('.schem')).toContainText('500 kΩ A');
});

test('complex researched pedals remain explicitly non-component until topology is checked',async({page})=>{
 for(const id of ['big-muff','compressor','phase90','chorus','pt2399','vox-v847','ea-tremolo','boss-ds1']){await page.goto(`/detail2.html?type=pedal&id=${id}`);await expect(page.locator('.true-schematic')).toHaveCount(0);await expect(page.locator('.schem svg[data-schematic-kind="block"]')).toHaveCount(1);await expect(page.getByText('Daten/BOM erfasst · Komponentenplan noch in Prüfung')).toHaveCount(1)}
});

test('component build status marks overlay only and persists per project',async({page})=>{
 await page.goto('/detail2.html?type=pedal&id=fuzz-face');await page.evaluate(()=>localStorage.clear());await page.reload();const row=page.locator('[data-component-row="R1"]');await row.click();await page.locator('[data-set-status="active"]').click();await expect(page.locator('.schem [data-component="R1"]')).toHaveAttribute('data-status','active');await expect(row.locator('.status-badge')).toHaveText('In Arbeit');const symbolStrokeBefore=await page.locator('.schem [data-component="R1"] .symbol').first().evaluate(el=>getComputedStyle(el).stroke);const markFill=await page.locator('.schem [data-component="R1"] .component-mark').evaluate(el=>getComputedStyle(el).fill);expect(markFill).not.toBe('rgba(0, 0, 0, 0)');await page.reload();await expect(page.locator('.schem [data-component="R1"]')).toHaveAttribute('data-status','active');const symbolStrokeAfter=await page.locator('.schem [data-component="R1"] .symbol').first().evaluate(el=>getComputedStyle(el).stroke);expect(symbolStrokeAfter).toBe(symbolStrokeBefore);await page.locator('[data-component-row="R1"]').click();await page.locator('[data-set-status="done"]').click();await expect(page.locator('.schem [data-component="R1"]')).toHaveAttribute('data-status','done');await page.goto('/detail2.html?type=pedal&id=rat');await expect(page.locator('.schem [data-component="R1"]')).toHaveAttribute('data-status','open');
});

test('schematic viewer supports mouse, keyboard, zoom, fit, reset and close',async({page})=>{
 await page.goto('/detail2.html?type=pedal&id=fuzz-face');const preview=page.locator('.schem');await preview.click({position:{x:10,y:10}});await expect(page.locator('.slb')).toHaveClass(/on/);const initial=await page.locator('.slbzoom').innerText();await page.locator('[data-act="in"]').click();expect(await page.locator('.slbzoom').innerText()).not.toBe(initial);await page.locator('[data-act="reset"]').click();await expect(page.locator('.slbzoom')).toHaveText('100%');await page.locator('[data-act="fit"]').click();await page.keyboard.press('+');await page.keyboard.press('-');await page.keyboard.press('0');await expect(page.locator('.slbzoom')).toHaveText('100%');await page.keyboard.press('Escape');await expect(page.locator('.slb')).not.toHaveClass(/on/);await preview.focus();await page.keyboard.press('Enter');await expect(page.locator('.slb')).toHaveClass(/on/);await page.locator('[data-act="close"]').click();await expect(page.locator('.slb')).not.toHaveClass(/on/);
});

test('large viewer can select and mark components on multiple registered pedals',async({page})=>{
 for(const [id,component] of [['fuzz-face','C1'],['distortion-plus','U1'],['rat','D1'],['tube-screamer','U1A']]){await page.goto(`/detail2.html?type=pedal&id=${id}`);await page.locator('.schem').click({position:{x:10,y:10}});await page.locator(`.slbcanvas [data-component="${component}"]`).click();await expect(page.locator('.slbstatus')).toHaveClass(/on/);await expect(page.locator('[data-viewer-selected]')).toContainText(component);await page.locator('.slbstatus [data-status="active"]').click();await expect(page.locator(`.slbcanvas [data-component="${component}"]`)).toHaveAttribute('data-status','active');await page.locator('[data-act="close"]').click()}
});

test('zoomed canvas grows its scrollable geometry instead of clipping',async({page})=>{
 await page.goto('/detail2.html?type=pedal&id=fuzz-face');await page.locator('.schem').click({position:{x:10,y:10}});await page.locator('[data-act="reset"]').click();const before=await page.locator('.slbcanvas svg').boundingBox();for(let i=0;i<4;i++)await page.locator('[data-act="in"]').click();const after=await page.locator('.slbcanvas svg').boundingBox();expect(after.width).toBeGreaterThan(before.width*1.5);expect(after.height).toBeGreaterThan(before.height*1.5);const metrics=await page.locator('.slbview').evaluate(el=>({sw:el.scrollWidth,cw:el.clientWidth,sh:el.scrollHeight,ch:el.clientHeight}));expect(metrics.sw).toBeGreaterThan(metrics.cw);expect(metrics.sh).toBeGreaterThan(metrics.ch);
});

test('unknown detail fails safely',async({page})=>{await page.goto('/detail2.html?type=pedal&id=does-not-exist');await expect(page.locator('h1')).toHaveText('Nicht gefunden');await expect(page.locator('.schem svg')).toHaveCount(1);await expect(page.locator('a.backlink')).toHaveAttribute('href','index.html')});

test('page has no accidental horizontal overflow on phone layout',async({page},testInfo)=>{if(!testInfo.project.name.includes('mobile'))test.skip();for(const url of ['/index.html','/detail2.html?type=pedal&id=fuzz-face','/detail2.html?type=pedal&id=tube-screamer','/detail2.html?type=pedal&id=rat','/detail2.html?type=pedal&id=distortion-plus','/detail2.html?type=pickup&id=paf']){await page.goto(url);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);expect(overflow).toBeLessThanOrEqual(2)}});

test('mobile schematic controls are touch sized and viewer fits viewport',async({page},testInfo)=>{if(!testInfo.project.name.includes('mobile'))test.skip();await page.goto('/detail2.html?type=pedal&id=fuzz-face');await page.locator('.schem').click({position:{x:10,y:10}});await expect(page.locator('.slb')).toHaveClass(/on/);const viewport=page.viewportSize(),overlay=await page.locator('.slb').boundingBox();expect(overlay.width).toBeLessThanOrEqual(viewport.width+1);expect(overlay.height).toBeLessThanOrEqual(viewport.height+1);for(const b of await page.locator('.slbbar button').all()){const r=await b.boundingBox();expect(r.height).toBeGreaterThanOrEqual(44);expect(r.width).toBeGreaterThanOrEqual(44)}await page.locator('.slbcanvas [data-component="Q1"]').click();await expect(page.locator('.slbstatus')).toHaveClass(/on/)});
