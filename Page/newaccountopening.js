const {test,expect}=require('@playwright/test')
class NewAccountOpening
{
    constructor (page)
    {
        this.page=page
        this.accountopening=page.locator('a:has-text("Open New Account")')
        this.acctypedrpdown=page.locator('#type')
        this.fromaccdrpdown=page.locator("#fromAccountId")
        this.opennewaccbtn=page.locator('input.button')
        this.successmsg1=page.getByText('Account Opened!')
        this.successmsg2=page.getByText('Congratulations, your account is now open.')
        this.newaccnumber=page.locator('#newAccountId')
    }

    async createNewAccount({Acctype,Fromacc})
    {
        await this.accountopening.click()
        await this.acctypedrpdown.selectOption({label:Acctype})
        await this.fromaccdrpdown.selectOption({label:Fromacc})
        await this.opennewaccbtn.click()
    }

    async assertSuccessMsg()
    {
        await expect(this.successmsg1).toHaveText("Account Opened!")
        await expect(this.successmsg2).toHaveText("Congratulations, your account is now open.")   
         }

    async getNewAccId()
    {
        await expect(this.newaccnumber).not.toBeEmpty()
        console.log(`Newly created account number is :${await this.newaccnumber.textContent()}`)
    }
}
module.exports={NewAccountOpening}