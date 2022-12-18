/// <reference types="cypress"/>

const productPage = require('../pageprojects/products.page')
const loginPage = require('../pageprojects/login.page')
const userData = require('../data/userdata')
const cartPage = require('../pageprojects/cart.page')


describe('Adding products to the cart', () => { 
    beforeEach(() =>{

        cy.visit('/')
        loginPage.loginUser(userData[4].email, userData[4].password)

    })

    it('verify that an item can be added to the cart', () => {

        const itemName = 'fitted hat'

        const product = productPage.getproductContainers.children().contains(itemName,{matchCase:false})
        product.should('exist')

        const addProductButton = product.parents().contains('add to cart',{matchCase:false})
        addProductButton.should('exist')
        cy.wait(3000)
        addProductButton.click()

        cy.visit('/products#/cart')
        cartPage.getCartQTY.contains('1')
        cartPage.getItemName.contains(itemName, {matchCase:false})

    })

    it('verify the cart quantity increase after adding an item', () => {
        cy.wait(3000)
        cy.visit('/products#/cart')
        let cartQTYFirst = null

        cartPage.getCartQTY.then(($qty) => {
            cartQTYFirst = $qty.text()
        })

        cy.visit('/products#')

        const itemName = 'fitted hat'

        const product = productPage.getproductContainers.children().contains(itemName,{matchCase:false})
        product.should('exist')

        const addProductButton = product.parents().contains('add to cart',{matchCase:false})
        addProductButton.should('exist')

        addProductButton.click()
        cy.wait(3000)
        
        cy.visit('/products#/cart')
        cartPage.getCartQTY.should('not.contain',cartQTYFirst)
    })

    it('verify that multiple item can be added to the cart', () => {

        let count = 0
        const items = ['fitted hat', 'trucker hat', 'mousepad']

        for( const item of items) {
            const product = productPage.getproductContainers.children().contains(item,{matchCase:false})
            product.should('exist')

            const addProductButton = product.parents('.chakra-stack.css-uaqjf').contains('add to cart',{matchCase:false})
            cy.wait(3000)

            addProductButton.click()
            cy.visit('/products#/cart')

            if(count < items.length) {
                cartPage.getContinueShopping.click()
                cy.wait(2000)
            }
            
        }

        cy.visit('/products#/cart')

        for( const item of items) {
            cartPage.getItemName.contains(item, {matchCase:false})
        }
        
    })
})