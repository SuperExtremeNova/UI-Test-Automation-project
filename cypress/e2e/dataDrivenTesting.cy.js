// this will help to auto fill cypress compands when typing
/// <reference types="cypress"/> 

const loginPage = require('../pageprojects/login.page')
const {faker} = require('@faker-js/faker')

describe('Data driven test using faker', () =>{

    beforeEach(() => {
        cy.visit('/') // open the base url for the application
        loginPage.getWelcomePageButton.click()
        cy.wait(1000)
    })

    it('verify that a user can signUp with a valid email and password', ()=> {

        let email = faker.internet.email()
        let password = faker.internet.email()

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