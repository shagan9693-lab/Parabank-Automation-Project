const {test,expect}=require('@playwright/test')
class FundTransfer
{
constructor (page)
{
    this.page=page
    this.fundtranslink=page.locator('a:has-text("Transfer Funds")')
    this.amounttotransfer=page.locator('#amount')
    this.fromacc=page.locator('#fromAccountId')
    this.toacc=page.locator('#toAccountId')
    this.submitbutton=page.locator('input[type="submit"]')
    this.successmsg=page.getByText('Transfer Complete!')
    this.msg1 = page.locator('#amountResult')
    this.msg2 = page.locator('#fromAccountIdResult')
    this.msg3 = page.locator('#toAccountIdResult')



}
async fundTransferPage({amount,fromindex,toindex})
{
    await this.fundtranslink.click()
    await this.amounttotransfer.fill(amount)
    await this.fromacc.selectOption({index:fromindex})
    await this.toacc.selectOption({index:toindex})
    await this.submitbutton.click()
}

async assertSuccessmsg()
{
    await expect(this.successmsg).toHaveText("Transfer Complete!")
    await expect(this.msg1).not.toBeEmpty()
     await expect(this.msg2).not.toBeEmpty()
      await expect(this.msg3).not.toBeEmpty()
    console.log(`Amount ${await this.msg1.textContent()} has been transferred from account #${await this.msg2.textContent()} to account #${await this.msg3.textContent()}`);

}
}

module.exports={FundTransfer}
