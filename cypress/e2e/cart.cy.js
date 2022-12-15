/// <reference types="cypress"/> 

const loginPage = require('../pageprojects/login.page')
const userData = require('../data/userdata')
const cartPage = require('../pageprojects/cart.page')
const productPage = require('../pageprojects/products.page')

describe('cart options test', () => {

    const items = ['fitted hat']

    beforeEach(() =>{
        
        cy.visit('/')
        loginPage.loginUser(userData[4].email, userData[4].password)
        
        productPage.addProductToCart(items)

        cy.visit('/products#/cart')

    })

    it('varify a product has a title, discription nd all other valuable item information is showing in cart', () => {
        
        cy.url().should('contain','https://ui-automation-camp.vercel.app/products#/cart')
        cy.wait(3000)

        cartPage.getCartTitle.should('exist')
        cartPage.getItemName.should('exist')
        cartPage.getItemDescription.should('exist')
        cartPage.getItemDeletButton.should('exist')
        cartPage.getItemQTY.should('exist')
        cartPage.getItemCost.should('exist')

    })

    it('varify a product can be removed from the cart using the delete button', () => {
        let itemCount = items.length
        let item = items[itemCount-1]
        const selectedItem = cartPage.getItemName.contains(item, {matchCase:false})
        
        // .then(($name) => {
        //     selectedItem = $name.text()
        // })

        selectedItem.siblings('button').click()
        selectedItem.should('not.exist')

    })

    it('varify that an item quantity can be modified in the cart', () => {
        //snipcart-item-line__product
        let itemQTY = 0
        let itemCount = items.length
        let item = items[itemCount-1]
        const selectedItem = cartPage.getItemName.contains(item, {matchCase:false})

        const getQTYElement = selectedItem.parents('div.snipcart-item-line__product').children('.snipcart-item-line__content')
        .children().children('.snipcart-item-line__variants').children('.snipcart-item-quantity')
        .children('div').children('.snipcart-item-quantity__quantity.snipcart__font--std')
        .children('span')
        
        getQTYElement.then(($qty) =>{
            itemQTY = $qty.text()
        })

        selectedItem.parents('.snipcart-item-line__product').then(($item) => {
            cartPage.getIncreaseQTY.click()
        })
        
        getQTYElement.should('not.equal',itemQTY)
        
    })

})