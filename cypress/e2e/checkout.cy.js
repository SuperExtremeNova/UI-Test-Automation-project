/// <reference types="cypress"/>

const loginPage = require('../pageprojects/login.page')
const productsPage = require('../pageprojects/products.page')
const cartPage = require('../pageprojects/cart.page')
const userData = require('../data/userdata')
const checkoutPage = require('../pageprojects/checkout.page')
const billingData = require('../data/billingdata')

describe('Checkout process validation', () => { 
    
    const items = ['fitted hat', 'trucker hat']

    beforeEach(() => {

        cy.visit('/')
        loginPage.loginUser(userData[4].email, userData[4].password)
        productsPage.addProductToCart(items)
        cy.wait(3000)
        cy.visit('/products#/cart')
        cartPage.getCheckoutButton.click()
    })

    it('varify that the billing form can be filled out completely', () => {

        checkoutPage.getNameInput.should('be.visible')

        checkoutPage.filloutBillingInformation(
            billingData[0].fullname, billingData[0].email, billingData[0].street, 
            billingData[0].apt, billingData[0].city, billingData[0].country, 
            billingData[0].state, billingData[0].postalCode
        )

        checkoutPage.getNameInput.invoke('val').should('equal',billingData[0].fullname)
        checkoutPage.getEmailInput.invoke('val').should('equal',billingData[0].email)
        checkoutPage.getStreet.invoke('val').should('equal',billingData[0].street)
        checkoutPage.getApt.invoke('val').should('equal',billingData[0].apt)
        checkoutPage.getCity.invoke('val').should('equal',billingData[0].city)
        checkoutPage.getCountry.should('contain',billingData[0].country)
        checkoutPage.getProvince.should('contain',billingData[0].state)
        checkoutPage.getPostal.invoke('val').should('equal',billingData[0].postalCode)

    })

    it('varify that all required fields are filled out before continuing to payment', () => {
        
        checkoutPage.getNameInput.should('be.visible')

        checkoutPage.filloutBillingInformation(
            billingData[0].fullname, billingData[0].email, billingData[0].street, 
            billingData[0].apt, billingData[0].city, billingData[0].country, 
            billingData[0].state, billingData[0].postalCode
        )
        
        checkoutPage.getEmailInput.invoke('val').should('equal',billingData[0].email)
        checkoutPage.getCity.invoke('val').should('equal',billingData[0].city)
        checkoutPage.getCountry.should('contain',billingData[0].country)
        checkoutPage.getPostal.invoke('val').should('equal',billingData[0].postalCode)
        
        checkoutPage.getcontinueToPayment.should('be.visible')
        checkoutPage.getcontinueToPayment.click()

    })

    it('varify that a user can\'t continue to payment if the required fields are not filled out', () => {
        
        checkoutPage.getNameInput.should('be.visible')

        checkoutPage.filloutBillingInformation(
            billingData[0].fullname,'{backspace}', billingData[0].street, 
            billingData[0].apt, '{backspace}', billingData[0].country, 
            billingData[0].state, billingData[0].postalCode
        )
        
        checkoutPage.getcontinueToPayment.should('be.visible')
        checkoutPage.getcontinueToPayment.click()
        checkoutPage.getRequiredError.should('be.visible')

    })

 })