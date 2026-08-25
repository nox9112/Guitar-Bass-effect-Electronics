const {defineConfig,devices}=require('@playwright/test');
module.exports=defineConfig({
  testDir:'./tests',
  timeout:12000,
  expect:{timeout:5000},
  retries:0,
  fullyParallel:true,
  workers:4,
  reporter:[['list'],['html',{outputFolder:'playwright-report',open:'never'}]],
  use:{baseURL:'http://127.0.0.1:4173',trace:'retain-on-failure',screenshot:'only-on-failure'},
  projects:[{name:'desktop-chromium',use:{...devices['Desktop Chrome'],viewport:{width:1440,height:1000}}}],
  webServer:{command:"bash -lc 'rm -rf .site && mkdir .site && cp *.html *.js *.css .site/ && python3 -m http.server 4173 -d .site'",url:'http://127.0.0.1:4173',reuseExistingServer:false,timeout:20000}
});
