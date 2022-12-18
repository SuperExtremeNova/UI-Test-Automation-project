/// <reference types="cypress"/>

// import all need resources for the test suite
const { resolve } = require('path')
const cartPage = require('./cart.page')

// get all the locator for the product page and create functions to modify the selection on that page
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
    
    get getContactButton() {
        return cy.get('#top-contact')
    }
    get getSearchInput() {
        return cy.get('#search')
    }
    getProductName() {
        return cy.get(this.getproductTextLocator)
    }

    get getproductImageLocator() {
        return 'img[draggable="false"]'
    }

    getImageOfOneProduct() {
        return cy.get('.chakra-image.css-2i84d9')
    }

    get getSortOption() {
        return cy.get('#sort')
    }
    get getCategorySelections() {
        return cy.get('#category')
    }

    get cartItemName() {
        return cy.get('.snipcart-item-line__title.snipcart__font--xlarge.snipcart__font--secondary.snipcart__font--black')
    }
    get getProductCost() {
        return cy.get('p.css-0')
    }
    get getProductCategory() {
        return cy.get('span.css-1ccau2i')
    }
    get getResetbutton() {
        return cy.get('#reset')
    }

    // gets the full price for all the items on the page and remove the $ sign and put them in an array
    getArrayOfPrices(ProductCost) {
        let prices = [];
        return new Cypress.Promise((resolve) => {
            ProductCost.each(($el) => {
                let price = $el.text().replace('$', '')
                prices.push(Number(price))
            })
            .then(() => resolve(prices))
        })
    }

    // get the product using the id by passing a number to select
    getspecificProductContainer(num) {
        return cy.get(`#product-${num}`)
    }
    
    // full function that adds items to the cart no matter the amount passed
    addProductToCart(items) {
        
        let count = 0

        for( const item of items) {

            const product = this.getproductContainers.children().contains(item,{matchCase:false})
            const addProductButton = product.parents('.chakra-stack.css-uaqjf').contains('add to cart',{matchCase:false})
            
            addProductButton.click()
            cy.visit('/products#/cart')

            if(count < items.length && items.length) {
                cy.wait(2000)
                cartPage.getContinueShopping.click() 
            }
            
            count += 1
        }
    }

}

module.exports = new productsPage()