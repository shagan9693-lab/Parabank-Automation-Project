const {test,expect}=require('@playwright/test')
class FindTransaction
{
    constructor (page)
    {
        this.page=page
        this.findtrxlink=page.getByRole('link', { name: 'Find Transactions' })

        this.findtrxpage=page.locator('h1:has-text("Find Transactions")')
        this.selectacc=page.locator('#accountId')
        this.findbydate=page.locator('#transactionDate')
        this.findtrxbydate=page.locator('#findByDate')
        this.findbyfromdate=page.locator('#fromDate')
        this.findbytodate=page.locator('#toDate')
        this.findbydaterange=page.locator('#findByDateRange')
        this.findbyamount=page.locator('#amount')
        this.findtrxbyamount=page.locator('#findByAmount')
        this.rows=page.locator('#transactionBody tr')
        
    }
    async verifyTrxByDate({selectacc,findbydate})
    {
    await this.selectacc.selectOption({index:selectacc})
    await this.findbydate.fill(findbydate)
    await this.findtrxbydate.click()
    }

    async verifyTrxByDateRange({selectacc,findbyfromdate,findbytodate})
    {
    await this.selectacc.selectOption({index:selectacc})
    await this.findbyfromdate.fill(findbyfromdate)
    await this.findbytodate.fill(findbytodate)
    await this.findbydaterange.click()
}
    async verifyTrxByAmount({selectacc,findbyamount})
    {
       await this.selectacc.selectOption({index:selectacc})
       await this.findbyamount.fill(findbyamount)
       await this.findtrxbyamount.click()
    }
    async navigateToFindTrxPage()
    {
        await this.findtrxlink.click()
    }
   async assertFindTrxPage()
   {
    await expect(this.findtrxpage).toHaveText("Find Transactions")
   }

   async viewTrxDetail()
   {
    await this.page.waitForLoadState('load')
    await this.page.waitForLoadState('networkidle')
    const count=await this.rows.count()
    if(count>0)
    {
    console.log(`you have ${count} transactions`)
     for(let i=0;i<count;i++)
     {
        const row=this.rows.nth(i)
        const fetchdate=(await row.locator('td').nth(0).innerText()).trim()
        const fetchtrxtype=(await row.locator('td').nth(1).innerText()).trim()
        const fetchdebitdetailtext=await row.locator('td').nth(2).innerText()
        const fetchcreditdetailtext=await row.locator('td').nth(3).innerText()
         if (!fetchdate && !fetchtrxtype && !fetchdebitdetailtext && !fetchcreditdetailtext) {
         console.log("You dont have valid trx");
        continue
  }
        const fetchdebitdetail=fetchdebitdetailtext.trim() === ("") ? ("-") :fetchdebitdetailtext
        const fetchcreditdetail=fetchcreditdetailtext.trim() === ("") ? ("-") :fetchcreditdetailtext

        console.log(`Trx Date is ${fetchdate} 
        with Trx type as ${fetchtrxtype}
        With the Debit amount of ${fetchdebitdetail}
        With the Credit amount of ${fetchcreditdetail}`)
     }
    }

   }
}

module.exports={FindTransaction}