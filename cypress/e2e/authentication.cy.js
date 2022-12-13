// this will help to auto fill cypress compands when typing
/// <reference types="cypress"/> 

const LoginPage = require('../pageprojects/login.page')
const userData = require('../data/userdata')


describe('app authentication', () => {

    beforeEach(() => {
        cy.visit('/') // open the base url for the application
    })

    it('verify that the button on the welcome page works', () => {

        LoginPage.getWelcomePageButton.should('exist')                                          // check if the login/sign up button is on the welcome page
        LoginPage.getWelcomePageButton.click()                                                  // opening the app to the login/sign up page
        cy.url().should('contain','https://dev-mlluudmotpwoldtv.us.auth0.com/login')            // checking that the correct url was loaded after selecting the button
    })

    it('verify that all links and text fields are functional for login', () => {

        LoginPage.getWelcomePageButton.click()

        const current_url = cy.url()

        LoginPage.getLoginTab.should('exist')
        LoginPage.getLoginTab.click()

        LoginPage.getGoogleLink.should('exist')
        LoginPage.getGoogleLink.click()
        cy.url().should('not.contain',current_url)

        cy.visit('/')
        LoginPage.getWelcomePageButton.click()

        LoginPage.getEmailInput.should('exist')
        LoginPage.getEmailInput.type('artcrazyderrick@gmail.com').should('have.value','artcrazyderrick@gmail.com')

        LoginPage.getPwdInput.should('exist')
        LoginPage.getPwdInput.type('Deadlysins').should('value','Deadlysins')

        LoginPage.getResetPwdLink.should('exist').click()
        cy.url().should('contain','https://dev-mlluudmotpwoldtv.us.auth0.com/')
        LoginPage.getBackButton.should('exist').click()

        LoginPage.getSubmitButton.should('exist')

    })

    it('should login user if an account exist with the email and password', () => {
        for(const user of userData) {
            cy.visit('/')
            LoginPage.getWelcomePageButton.click()
            const current_url = cy.url()

            LoginPage.getLoginTab.click()
            LoginPage.getEmailInput.type(user.email)
            LoginPage.getPwdInput.type(user.password)
            LoginPage.getSubmitButton.click()

            if(!user.isInputEmpty) {
                
                if(user.userType === 'invalid') {
                    LoginPage.getLoginError.should('exist')
                    cy.url().should('contain','https://dev-mlluudmotpwoldtv.us.auth0.com/')
                }else {
                    cy.url().should('contain','https://ui-automation-camp.vercel.app/products')
                }
            }else {
                cy.url().should('contain','https://dev-mlluudmotpwoldtv.us.auth0.com/')
                LoginPage.getBlankEntry.should('exist')
            }
        }
    })

})


