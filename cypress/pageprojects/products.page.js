/// <reference types="cypress"/>

const cartPage = require('./cart.page')

class productsPage {

    get getCartButton() {
        return cy.get('#drawer-cart')
    }
    get getCartDetails() {
        return cy.get('.snipcart-button-link')
    }

    get getproductContainers() {
        return cy.get('.chakra-stack.css-uaqjf')
    }

    get getproductTextLocator() {
        return 'p.chakra-text.css-1n64n71'
    }

    get getproductImageLocator() {
        return 'img[draggable="false"]'
    }

    getImageOfOneProduct() {
        return cy.get('.chakra-image.css-2i84d9')
    }

    get cartItemName() {
        return cy.get('.snipcart-item-line__title.snipcart__font--xlarge.snipcart__font--secondary.snipcart__font--black')
    }

    getspecificProductContainer(num) {
        return cy.get(`#product-${num}`)
    }
    
    addProductToCart(items) {
        
        let count = 0

        for( const item of items) {

            const product = this.getproductContainers.children().contains(item,{matchCase:false})
            const addProductButton = product.parents('.chakra-stack.css-uaqjf').contains('add to cart',{matchCase:false})
            
            cy.wait(2000)
            addProductButton.click()
            cy.visit('/products#/cart')

            if(count < items.length) {
                cy.wait(2000)
                cartPage.getContinueShopping.click() 
            }
            
            count += 1
        }
    }

}

module.exports = new productsPage()