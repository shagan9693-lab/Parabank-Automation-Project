const {expect}=require('@playwright/test')
class BillPay
{
    constructor (page)
    {
        this.page=page
        this.billpaylink=page.locator('a').filter({ hasText: 'Bill Pay' })
        this.payeename=page.locator("input[name='payee.name']")
        this.address=page.locator("input[name='payee.address.street']")
        this.city=page.locator("input[name='payee.address.city']")
        this.state=page.locator("input[name='payee.address.state']")
        this.zipcode=page.locator("input[name='payee.address.zipCode']")
        this.phone=page.locator('input[name="payee.phoneNumber"]')
        this.account=page.locator("input[name='payee.accountNumber']")
        this.verifyaccount=page.locator("input[name='verifyAccount']")
        this.amount=page.locator("input[name='amount']")
        this.fromaccount=page.locator('[name="fromAccountId"]')
        this.submitbtn=page.locator("input[value='Send Payment']")
        this.successmsg=page.locator(':text-is("Bill Payment Complete")')
        this.successmsgpayeename=page.locator("#payeeName")
        this.successmsgamount=page.locator("#amount")
        this.successmsgaccount=page.locator("#fromAccountId")
        this.errpayeename=page.locator('#validationModel-name')
        this.erraddress=page.locator('#validationModel-address')
        this.errcity=page.locator('#validationModel-city')
        this.errstate=page.locator('#validationModel-state')
        this.errzipcode=page.locator('#validationModel-zipCode')
        this.errphone=page.locator('#validationModel-phoneNumber')
        this.erraccount=page.locator('#validationModel-account-empty')
        this.errverifyaccount=page.locator('#validationModel-verifyAccount-empty')
        this.erramount=page.locator("#validationModel-amount-empty")
        this.errmsg=[
            this.errpayeename,
        this.erraddress,
        this.errcity,
        this.errstate,
        this.errzipcode,
        this.errphone,
        this.erraccount,
        this.errverifyaccount,
        this.erramount

        ]
        
     }

    async billPayment({payeename,address,city,state,zipcode,phone,account,verifyaccount,amount,fromaccount})
    {
        await this.billpaylink.click()
        {
        await this.payeename.fill(payeename)
        await this.address.fill(address)
        await this.city.fill(city)
        await this.state.fill(state)
        await this.zipcode.fill(zipcode)
        await this.phone.fill(phone)
        await this.account.fill(account)
        await this.verifyaccount.fill(verifyaccount)
        await this.amount.fill(amount)
        await this.fromaccount.selectOption({"index":fromaccount})
        await this.submitbtn.click()
       }
    }
    async assertBillpaySuccessMsg()
    {   
        await expect(this.successmsg).toBeVisible()
        await expect(this.successmsg).toHaveText("Bill Payment Complete")
        console.log(`Bill Payment to ${await this.successmsgpayeename.textContent()} in the amount of ${await this.successmsgamount.textContent()} from account ${await this.successmsgaccount.textContent()} was successful.`)
    }
    async assertEmptyInput(data)
    {
        for (const errorMsgValidation of this.errmsg)
        {
            await expect(errorMsgValidation).toBeVisible()
        }
    }
    async assertInvalidAccDropDown(fromaccount)
    {
        await expect(async () => 
            {
                await this.fromaccount.selectOption({ index:fromaccount})}).rejects.toThrow();
    }

}
module.exports={BillPay}