const {expect}=require('@playwright/test')
class RequestLoan
{
    constructor (page)
    {
        this.page=page
        this.requestloanlink=page.locator("a[href='requestloan.htm']")
        this.loanamount=page.locator("#amount")
        this.downpayment=page.locator("#downPayment")
        this.fromacc=page.locator('#fromAccountId')
        this.applynow=page.locator("input[value='Apply Now']")
        this.successmsg1=page.getByRole('heading', { name: "Loan Request Processed" })
        this.successmsg2=page.getByText('Congratulations, your loan has been approved.')
        this.newacc=page.locator('#newAccountId')
    }
async requestNewLoan({loanamount,downpayment,fromacc})
{
    await this.requestloanlink.click()
    await this.loanamount.fill(String(loanamount))
    await this.downpayment.fill(String(downpayment))
    await this.fromacc.selectOption({index:fromacc})
    await this.applynow.click()
}

async assertSuccessmsg()
{
    await expect(this.successmsg1).toBeVisible()
    await expect(this.successmsg2).toBeVisible()
    await expect(this.successmsg1).toHaveText("Loan Request Processed")
    await expect(this.successmsg2).toHaveText("Congratulations, your loan has been approved.")
    console.log("New Account Number is:",await this.newacc.textContent())
}
}

module.exports={RequestLoan}