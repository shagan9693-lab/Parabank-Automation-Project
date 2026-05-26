const {test,expect}=require('@playwright/test')
class Logout
{
    constructor (page)
    {
        this.page=page
        this.logoutlink=page.getByRole('link', { name: 'Log Out' })
        this.backtosignin=page.getByText(/Customer Login/)

    }

async performLogout()
{
    this.logoutlink.click()
}

async assertBackToSignin()
{
await expect(this.backtosignin).toBeVisible()
await expect(this.backtosignin).toHaveText("Customer Login")
}

}

module.exports={Logout}