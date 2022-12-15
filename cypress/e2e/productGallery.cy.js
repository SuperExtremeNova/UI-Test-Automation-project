/// <reference types="cypress"/>

const userData = require('../data/userdata')
const loginPage = require('../pageprojects/login.page')
const productPage = require('../pageprojects/products.page')


describe('Run test on Product Gallery page', () => {
    beforeEach(()=> {
        cy.visit('/')
        loginPage.loginUser(userData[4].email, userData[4].password)
    })

    it('varify that all products have a title', () => {

        productPage.getproductContainers.each(($el) => {
        
            cy.wrap($el).children('.chakra-stack.css-n21gh5')
            .children('.chakra-stack.css-46p1lt').children('.chakra-stack.css-1oeb4ru')
            .children('p.chakra-text.css-1n64n71').should('exist')
            
        })
        //
    })

    it('varify that all products have a cost', () => {

        productPage.getproductContainers.each(($el) => {
        
            cy.wrap($el).children('.chakra-stack.css-n21gh5')
            .children('.chakra-stack.css-46p1lt').children('.chakra-stack.css-1ieohnc')
            .children('p.chakra-text.css-0').should('exist')
            
        })
    })

    it('varify that all products have an image', () => {

        productPage.getproductContainers.each(($el) => {
        
            cy.wrap($el).children('.css-5ge9zd')
            .children().children('.chakra-image.css-2i84d9').should('exist')
            
        })
    })
    
})