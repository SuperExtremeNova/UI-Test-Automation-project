/// <reference types="cypress"/>

const productPage = require('../pageprojects/products.page')
const loginPage = require('../pageprojects/login.page')
const userData = require('../data/userdata')

describe('Varify the sorting and filtering on the products page', () => {

    beforeEach(() => {
        cy.visit('/')
        loginPage.loginUser(userData[4].email, userData[4].password)
    })

    it('varify that products can be sorted by price (low to high)', () => {

        productPage.getSortOption.select('lowToHigh').invoke('val')
        cy.wait(1000)

        productPage.getArrayOfPrices(productPage.getProductCost).then((price) => {
            expect(price).to.be.sorted()
        })
    })

    it('varify that products can be filtered by category', () => {
        let category = 'pant'
        productPage.getCategorySelections.select(category).invoke('val')
        cy.wait(1000)

        productPage.getProductCategory.each(($el) => {
            cy.wrap($el).should('contain',category)
        }) 
        
    })

    it('varify that the filtered category can be cleared with the reset button', () => {

        let category = 'pant'
        productPage.getCategorySelections.select(category).invoke('val')
        cy.wait(1000)

        productPage.getProductCategory.should('have.length.lessThan',22)
        productPage.getResetbutton.click()
        productPage.getProductCategory.should('have.length',22)

    })
})