/// <reference types="cypress"/>

// get all the locator for the contact page and create functions to modify the selection on that page
class contactPage {

    get getSocialMediaHandlers() {
        return cy.get('div.css-r2h33i>a[target="_blank"]')
    }
    get getFirstName() {
        return cy.get('#firstName')
    }
    get getLastName() {
        return cy.get('#lastName')
    }
    get getEmail() {
        return cy.get('#email')
    }
    get getSubject() {
        return cy.get('#subject')
    }
    get getMessage() {
        return cy.get('#message')
    }
    get getSendMessage() {
        return cy.get('button.css-vs0e4t')
    }
    get getErrorMessage() {
        return cy.get('div.css-170ki1a')
    }

    get getSuccessAlert() {
        return cy.get('#toast-1-title')
    }

    // using the passed value update the contact form on the page
    fillOutMessageForm(fname, lname, email, subject, Message) {

        this.getFirstName.clear().type(fname)
        this.getLastName.clear().type(lname)
        this.getEmail.clear().type(email)
        this.getSubject.clear().type(subject)
        this.getMessage.clear().type(Message)

    }
}
module.exports = new contactPage