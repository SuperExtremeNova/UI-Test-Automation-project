/// <reference types="cypress"/>

// importing all of the resources that are needed in the test suite
const userData = require('../data/userdata')
const loginPage = require('../pageprojects/login.page')
const productPage = require('../pageprojects/products.page')
const productDetailPage = require('../pageprojects/productDetail.page')

describe('Product detail page testing', () => {
    
    //global varibles for all of the test
    let productSelector = null
    let product = null
    let selectedProductName = null

    beforeEach(() =>{ // runs before each of the test cases
        
        cy.visit('/')
        loginPage.loginUser(userData[4].email, userData[4].password)
        productSelector = Math.floor(Math.random() * 21) + 1

        product = productPage.getspecificProductContainer(productSelector)

        product.find(productPage.getproductTextLocator).then(($el) => {
            selectedProductName = $el.text()
        })

        cy.wait(1000)
        
    })

    it('verify that the product details are on the page', () => {
        
        productPage.getspecificProductContainer(productSelector).click()
        cy.url().should('contain','https://ui-automation-camp.vercel.app/products/')

        productDetailPage.getProductName.should('exist')
        productDetailPage.getProductName.should('contain.text',selectedProductName)
        productDetailPage.getProductDescription.should('exist')

    })

    it('verify that the customer can go back after check the product details', () => {
    
        productPage.getspecificProductContainer(productSelector).click()
        cy.url().should('contain','https://ui-automation-camp.vercel.app/products/')

        productDetailPage.getProductName.should('exist')
        productDetailPage.getProductName.should('contain.text',selectedProductName)

        productDetailPage.getBackToProducts.should('exist')
        productDetailPage.getBackToProducts.click()

        cy.url().should('contain','https://ui-automation-camp.vercel.app/products')

    })

    it('verify that the selected item has an image on the detail page', () => {

        productPage.getspecificProductContainer(productSelector).click()
        cy.url().should('contain','https://ui-automation-camp.vercel.app/products/')

        productDetailPage.getProductName.should('exist')
        productDetailPage.getProductName.should('contain.text',selectedProductName)

        productDetailPage.getSelectedProductImage.should('exist')
    })

    it('verify that the user is unable to get to the detail page if the image is not clicked', () => {

        product = productPage.getspecificProductContainer(productSelector)
        product.find(productPage.getproductTextLocator).click()

        cy.url().should('not.contain','https://ui-automation-camp.vercel.app/products/')

    })
})