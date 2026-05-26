const {test,expect}=require('@playwright/test')
const {RegisterNew}=require('../Page/registrationpage')
const {LoginPage}=require('../Page/loginpage')
const {DashBoard}=require('../Page/dashboardpage')
const {NewAccountOpening}=require('../Page/newaccountopening')
const {FundTransfer}=require('../Page/fundtransfer')
const {BillPay}=require('../Page/Billpayment')
const {FindTransaction}=require('../Page/findtrx')
const {RequestLoan}=require('../Page/requestloan')
const {Logout}=require('../Page/logout')
const regdata=require('../Testdata/regflowtestdata.json')
const logindata=require('../Testdata/Loginflowtestdata.json')
const accountopeningdata=require('../Testdata/accountopeningtestdata.json')
const fundtransferdata=require('../Testdata/fundtransfer.json')
const billdata=require('../Testdata/Billpay.json')
const findtrxdata=require('../Testdata/findtrx.json')
const reqloandata=require('../Testdata/reqloan.json')
test.beforeEach(async({page})=>{
  await page.goto("https://parabank.parasoft.com/parabank/index.htm")
}
)
test.describe("New Registration",()=>{
    for (const data of regdata){
        test(`New user registration ${data.testid}`,async({page})=>
        {
          const newuserreg=new RegisterNew(page)
          await newuserreg.navigateToRegPage()
         await newuserreg.assertOnRegPage()
          await newuserreg.regNewUser(data)
          if (data.errormsg==="No")
          {
            await newuserreg.assertRegSuccess()
          }
          else if(data.errormsg==="Generic Failure Error Msg"){
            await newuserreg.assertRegFailed()
          }
          else if(data.errormsg==="Empty Input"){
            await newuserreg.assertEmptyInput()
          }
          else if(data.errormsg==="Wrong Confirm Password Err"){
              await newuserreg.assertWrongConfirmPw()
          
          }
        })
    }
})
test.describe("Login",()=>
  {
    for(const data1 of logindata)
    {
      test(`Login with ${data1.inputtype}`,async({page})=>
        {
      const loginpage=new LoginPage(page)
      await loginpage.loginIntoParaBank(data1)
      if(data1.inputtype==="Valid Input")
      {
       await loginpage.assertLoginValidInput()
      }
      else if (data1.inputtype==="Invalid Input")
      {
      await loginpage.assertLoginInvalidInput()
      }

      else if (data1.inputtype==="Empty Input")
      {
       await loginpage.assertLoginEmptyInput()
      }

    })
  

    }
  }
  )
 test.describe("Dashboard Logic",()=>
{
  test("Dashboard Logic",async({page})=>
  {
const dashboard=new DashBoard(page)
const loginpage=new LoginPage(page)
    await loginpage.loginIntoParaBank(logindata[0])
    await dashboard.assertDashboardPage()
    await dashboard.fetchAccountBalanceDetails()
    await dashboard.assertbalmsg()



  })
  
})
test.describe("New Account Opening",()=>
{
  test("Acc Opening",async({page})=>
  {
    const loginpage=new LoginPage(page)
    await loginpage.loginIntoParaBank(logindata[0])
    const accountopen=new NewAccountOpening(page)
    await accountopen.createNewAccount(accountopeningdata)
    await accountopen.assertSuccessMsg()
    await accountopen.getNewAccId()


  })
}
)
test.describe("Fund Transfer",()=>
{
  for (const data of fundtransferdata)
  {
  test(`Transfer Between Accounts ${data.Transaction}`,async({page})=>
  {
    const fundtransfer=new FundTransfer(page)
     const loginpage=new LoginPage(page)
    await loginpage.loginIntoParaBank(logindata[0])
    await fundtransfer.fundTransferPage(data)
    await fundtransfer.assertSuccessmsg()

  })}
})

test.describe("Bill Payments Logic",()=>
{
  for (const data of billdata)
  {
    test(`Bills ${data.testid}`,async({page})=>
    {
    const loginpage=new LoginPage(page)
    await loginpage.loginIntoParaBank(logindata[0])
    const billpayment=new BillPay(page)
    
    if (data.inputtype ==="Valid")
    {
      await billpayment.billPayment(data)
    await billpayment.assertBillpaySuccessMsg()
    }
    else if (data.inputtype ==="Empty")
    {
      await billpayment.billPayment(data)
    await billpayment.assertEmptyInput()
    }
    else if  ((data.inputtype ==="Invalid Account from dropdown"))
    {
  await billpayment.assertInvalidAccDropDown(data.fromaccount)
    }
      
    })
  }
})

test.describe("Find Transaction",()=>
{
  test("Finding trx",async({page})=>
{
  
  
   const loginpage=new LoginPage(page)
    await loginpage.loginIntoParaBank(logindata[0])
    for (const data of findtrxdata)
    {
    const findtransac=new FindTransaction(page)
    await findtransac.navigateToFindTrxPage()
    await findtransac.assertFindTrxPage()
    if (data.VerifyTrx === "Verify Trx By particular date")
    {
      console.log("View transaction for particular date")
      await findtransac.verifyTrxByDate(data)
      await findtransac.viewTrxDetail()
    

    
    }
    else if(data.VerifyTrx === "Verify Trx By Date Range")
    {

    console.log("Viewing transaction in date range")
    await findtransac.navigateToFindTrxPage()
    await findtransac.verifyTrxByDateRange(data)
    await findtransac.viewTrxDetail()
    }
    else if(data.VerifyTrx === "Verify Trx By Amount")
    {
      console.log("Viewing transaction based on amount")
      await findtransac.navigateToFindTrxPage()
      await findtransac.verifyTrxByAmount(data)
      await findtransac.viewTrxDetail()

    }
  }
}  
)
}
)

test.describe("Request Loan",()=>
{
  test("New Loan Request",async({page})=>
  {
    const loginpage=new LoginPage(page)
    await loginpage.loginIntoParaBank(logindata[0])
    for (const data of reqloandata)
    {
    const reqloan=new RequestLoan(page)
    await reqloan.requestNewLoan(data)
    await reqloan.assertSuccessmsg()
    }
  })
}
)

test.describe("Logout",()=>
{
  
  test("Verify Logout",async({page})=>
  {
    const loginpage=new LoginPage(page)
  await loginpage.loginIntoParaBank(logindata[0])
  const logout=new Logout(page)
  await logout.performLogout()
  await logout.assertBackToSignin()
  })

})