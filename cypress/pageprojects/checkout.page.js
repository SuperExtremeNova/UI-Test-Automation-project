
// get all the locator for the checkout page and create functions to modify the selection on that page
class checkoutPage {

    get getcontinueShopping() {
        return cy.xpath('//*[contains(text(),"Continue shopping")]')
    }
    get getcontinueToPayment() {
        return cy.xpath('//*[contains(text(),"Continue to payment")]')
    }
    get getNameInput() {
        return cy.get('input[name="name"]')
    }
    get getEmailInput() {
        return cy.get('input[name="email"]')
    }
    get getStreet() {
        return cy.get('input[name="address1"]')
    }
    get getApt() {
        return cy.get('input[name="address2"]')
    }
    get getCity() {
        return cy.get('input[name="city"]')
    }
    get getCountry() {
        return cy.get('select[name="country"]')
    }
    get getProvince() {
        return cy.get('select[name="province"]')
    }
    get getPostal() {
        return cy.get('input[name="postalCode"]')
    }
    get getRequiredError() {
        return cy.xpath('//div[contains(text(),"required")]')
    }

    // fill out the billing information on the page using the  passed value
    filloutBillingInformation(fullname, email, street, apt, city, country, state, postal) {
        this.getNameInput.type(fullname)
        this.getEmailInput.type(email)
        this.getStreet.type('{backspace}')
        this.getStreet.type(street)
        this.getApt.type(apt)
        this.getCity.type(city)
        this.getCountry.select(country)
        this.getProvince.select(state)
        this.getPostal.type(postal)
    }

}
module.exports = new checkoutPage