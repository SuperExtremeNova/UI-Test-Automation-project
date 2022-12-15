/// <reference types="cypress"/> 

const loginPage = require('../pageprojects/login.page')
const userData = require('../data/userdata')
const cartPage = require('../pageprojects/cart.page')
const productPage = require('../pageprojects/products.page')

describe('cart options test', () => {

    before(() =>{

        cy.visit('/')
        loginPage.loginUser(userData[4].email, userData[4].password)

    })

    it('varify a product has a title and discription in cart', () => {
        
        productPage.getCartButton.click()
        productPage.getCartDetails.click()
        cy.url().should('contain','https://ui-automation-camp.vercel.app/products#/cart')

        cartPage.getCartTitle.should('exist')
        cartPage.getItemName.should('exist')

    })

})