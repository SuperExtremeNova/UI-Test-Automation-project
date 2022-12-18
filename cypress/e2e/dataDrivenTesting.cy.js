// this will help to auto fill cypress compands when typing
/// <reference types="cypress"/> 

// import all need resources for the test suite 
const loginPage = require('../pageprojects/login.page')
const {faker} = require('@faker-js/faker')

describe('Data driven test using faker', () =>{

    beforeEach(() => {
        cy.visit('/') // open the base url for the application
        loginPage.getWelcomePageButton.click() //open the app for login and signUp
        cy.wait(1000)
    })

    it('verify that a user can signUp with a valid email and password', ()=> {

        let email = faker.internet.email() // get the email from faker 
        let password = faker.internet.email() // set the password

        loginPage.getSignUpTab.click()
        loginPage.getEmailInput.type(email)
        loginPage.getPwdInput.type(password)

        loginPage.getSubmitButton.click()
        if(email != '' && password != '') { // check to see if the email and password passed was not blank
            cy.url().should('contain','https://dev-mlluudmotpwoldtv.us.auth0.com/')
        } else {
            cy.url().should('contain','https://ui-automation-camp.vercel.app/products')
        }
    })

    it('verify that a user is unable to signUp with bland or invalid email', () => {
        let email = '{backspace}'
        let password = faker.internet.password()

        loginPage.getSignUpTab.click()
        loginPage.getEmailInput.type(email)
        loginPage.getPwdInput.type(password)

        loginPage.getSubmitButton.click()
        if(email != '' && password != '') {
            cy.url().should('contain','https://dev-mlluudmotpwoldtv.us.auth0.com/')
        } else {
            cy.url().should('contain','https://ui-automation-camp.vercel.app/products')
        }
    })
})