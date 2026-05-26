const {test,expect}=require('@playwright/test')
class LoginPage
{
constructor (page) 
{
this.page=page
this.username=page.locator('[name="username"]')
this.password=page.locator('[name="password"]')
this.submitbtn=page.locator('input.button')
this.loginsuccessmsg=page.locator('h1:has-text("Accounts Overview")')
this.loginfailedinvalidinputmsg=page.locator('p:has-text("The username and password could not be verified.")')
this.loginfailedemptyinputmsg=page.locator('p:has-text("Please enter a username and password.")')
}
async loginIntoParaBank({username,password})
{
await this.username.fill(username)
await this.password.fill(password)
await this.submitbtn.click()
}

async assertLoginValidInput()
{
    await expect(this.loginsuccessmsg).toHaveText("Accounts Overview")
}

async assertLoginInvalidInput()
{
 await expect(this.loginfailedinvalidinputmsg).toHaveText("The username and password could not be verified.")
}

async assertLoginEmptyInput(){
 await expect(this.loginfailedemptyinputmsg).toHaveText("Please enter a username and password.")
}
}

module.exports={LoginPage}