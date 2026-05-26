const {expect}=require('@playwright/test')
class DashBoard
{
    constructor (page)
    {
        this.page=page
        this.dashboard=page.getByRole('heading', { name: 'Accounts Overview' })
        this.accrow=page.locator('#accountTable').locator('tbody tr').filter({ has: page.locator('td a')})
        this.accnumber=this.accrow.locator('td:nth-child(1) a')
        this.accbalance=this.accrow.locator('td:nth-child(2)')
        this.availamt=this.accrow.locator('td:nth-child(3)')
        this.balmsg=page.locator('td').filter({ hasText: '*Balance includes deposits that may be subject to holds' })
    }
    async assertDashboardPage()
    {
        await expect(this.dashboard).toHaveText("Accounts Overview")
    }

    async fetchAccountBalanceDetails()
    {    
        await this.page.waitForLoadState('networkidle')
      const accnumberlist=await this.accnumber.allTextContents()
        

        for (let i=0;i<accnumberlist.length;i++)
        {
            console.log(`Account number ${i+1} is:${accnumberlist[i]}`)
        }
        
        const balancelist=await this.accbalance.allTextContents()
       
        
        for (let i=0;i<balancelist.length;i++)
        {    
            const acctbalance=parseFloat(balancelist[i].replace("$",""))
            if(acctbalance>=0)
            {
            console.log(`Balance for Account number ${i+1} is:${balancelist[i]}`)
            }
            else{
                console.log(`This Account has insufficient funds`)
            }
        }
  
        const availamtlist=await this.availamt.allTextContents()
        for (let i=0;i<availamtlist.length;i++)
        {
            console.log(`Available amount for Account number ${i+1} is:${availamtlist[i]}`)
        }}

async assertbalmsg()
        {
        
        await expect(this.balmsg).toHaveText("*Balance includes deposits that may be subject to holds")
        }
    
}

module.exports={DashBoard}