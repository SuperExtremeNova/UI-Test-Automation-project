/// <reference types="cypress"/>

// import all needed resources for this test suite
const productPage = require('../pageprojects/products.page')
const loginPage = require('../pageprojects/login.page')
const userData = require('../data/userdata')
const contactPage = require('../pageprojects/contact.page')
const contactData = require('../data/contactdata')

describe('verify the functionality of the contact page', () => {
    beforeEach(() => { // runs before each of the tests cases
        cy.visit('/')
        loginPage.loginUser(userData[4].email, userData[4].password)
        productPage.getContactButton.click()
        cy.wait(1000)
    })

    it('verify that the social media handlers are clickable', () => {
        contactPage.getSocialMediaHandlers.each(($el) => {
            expect($el).not.to.have.prop('disabled', false)
        })
    })

    it('verify that the user can submit the form after entering all details', () => {

        contactPage.fillOutMessageForm(
            contactData[0].firstName, contactData[0].lastName, 
            contactData[0].email, contactData[0].subject, contactData[0].message
        )
        
        contactPage.getFirstName.invoke('val').should('equal',contactData[0].firstName)
        contactPage.getLastName.invoke('val').should('equal',contactData[0].lastName)
        contactPage.getEmail.invoke('val').should('equal',contactData[0].email)
        contactPage.getSubject.invoke('val').should('equal',contactData[0].subject)
        contactPage.getMessage.invoke('val').should('equal',contactData[0].message)

        contactPage.getSendMessage.click()
        contactPage.getSuccessAlert.should('be.visible')

    })

    it.only('verify that a user can not submit without all the required fields being filled out', () => {
        
        contactPage.fillOutMessageForm(
            contactData[0].firstName, contactData[0].lastName, 
            '{backspace}', contactData[0].subject, contactData[0].message
        )
        
        contactPage.getSendMessage.click()
        contactPage.getErrorMessage.should('exist')

    })
})