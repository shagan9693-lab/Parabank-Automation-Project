const {test,expect}=require('@playwright/test')
class RegisterNew {
    constructor (page){
        this.page=page
        this.register=page.getByRole('link',{name:"Register"})
        this.firstname=page.locator('#customer\\.firstName')
        this.lastname=page.locator('#customer\\.lastName')
        this.address=page.locator('#customer\\.address\\.street')
        this.city=page.locator('#customer\\.address\\.city')
        this.state=page.locator('#customer\\.address\\.state')
        this.zipcode=page.locator('#customer\\.address\\.zipCode')
        this.phone=page.locator('#customer\\.phoneNumber')
        this.ssn=page.locator('#customer\\.ssn')
        this.username=page.locator('#customer\\.username')
        this.password=page.locator('#customer\\.password')
        this.confirmpw=page.locator('#repeatedPassword')
        this.submitreg=page.locator("input[value='Register']")
        this.regpage=page.getByRole('heading', { name: 'Signing up is easy!' })
        this.regsuccessmsg=page.getByText('Your account was created successfully. You are now logged in.')
        this.regfailedmsg=page.locator("div[id='rightPanel'] p")
        this.errfirstname=page.locator('#customer\\.firstName\\.errors')
        this.errlastname=page.locator('#customer\\.lastName\\.errors')
        this.erraddress=page.locator('#customer\\.address\\.street\\.errors')
        this.errcity=page.locator('#customer\\.address\\.city\\.errors')
        this.errstate=page.locator('#customer\\.address\\.state\\.errors')
        this.errzipcode=page.locator('#customer\\.address\\.zipCode\\.errors')
        this.errphone=page.locator('#customer\\.phoneNumber\\.errors')
        this.errssn=page.locator('#customer\\.ssn\\.errors')
        this.errusername=page.locator('#customer\\.username\\.errors')
        this.errpassword=page.locator('#customer\\.password\\.errors')
        this.errconfirmpw=page.locator('#repeatedPassword\\.errors')
         this.allErrorLocators = [
  this.errfirstname,
  this.errlastname,
  this.erraddress,
  this.errcity,
  this.errstate,
  this.errzipcode,
  this.errssn,
  this.errusername,
  this.errpassword,
  this.errconfirmpw
         ]

    }
 async regNewUser({firstname,lastname,address,city,state,zipcode,phone,ssn,username,password,confirmpw})
{
    await this.firstname.fill(firstname)
    await this.lastname.fill(lastname)
    await this.address.fill(address)
    await this.city.fill(city)
    await this.state.fill(state)
    await this.zipcode.fill(zipcode)
    await this.phone.fill(phone)
    await this.ssn.fill(ssn)
    await this.username.fill(username)
    await this.password.fill(password)
    await this.confirmpw.fill(confirmpw)
    await this.submitreg.click()

}
async navigateToRegPage()
{
  await this.register.click()
}
async assertOnRegPage()
{ 
    await expect(this.regpage).toHaveText("Signing up is easy!")
}

async assertRegSuccess()
{
    await expect(this.regsuccessmsg).toHaveText('Your account was created successfully. You are now logged in.')
}

async assertRegFailed()
{
    await expect(this.regfailedmsg).toHaveText('If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information.')
}
async assertEmptyInput() 
{
  for (const locator of this.allErrorLocators) {
    await expect(locator).toBeVisible()
  }
}


async assertWrongConfirmPw()
{
    await expect(this.errconfirmpw).toBeVisible()
}
}
module.exports={RegisterNew}
