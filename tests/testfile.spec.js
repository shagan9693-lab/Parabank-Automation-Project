const {test,expect}=require('@playwright/test')
test.skip("sample",async({page})=>{
    await page.goto("https://google.com")
})