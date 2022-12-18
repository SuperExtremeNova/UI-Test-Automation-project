/// <reference types="cypress"/>

// importing all needed resources for the test suite
const productPage = require('../pageprojects/products.page')
const loginPage = require('../pageprojects/login.page')
const userData = require('../data/userdata')

describe('Check that the search feature is working', () => {

    beforeEach(() => { // runs before each of the tests cases
        cy.visit('/')
        loginPage.loginUser(userData[4].email, userData[4].password)
    })

    it('verify that a product can be searched for', () => {

        productPage.getSearchInput.clear().type('Quality Jeans Pants')
        productPage.getProductName().should('have.text','Quality Jeans Pants')

    })

    it('verify that all product results contain the word in the search', () => {
        
        productPage.getSearchInput.clear().type('Pants')

        productPage.getProductName().each(($el) => {
            cy.wrap($el).contains('pants', {matchCase:false}).should('be.visible')
        })
    })

    it('verify that no item is displayed if an invalid word is search', () => {
        
        productPage.getSearchInput.clear().type('Paint')
        productPage.getProductName().should('not.exist')
       
    })
})