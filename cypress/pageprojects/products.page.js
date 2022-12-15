/// <reference types="cypress"/>

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

    get cartItemName() {
        return cy.get('.snipcart-item-line__title.snipcart__font--xlarge.snipcart__font--secondary.snipcart__font--black')
    }

    getspecificProductContainer(num) {
        return cy.get(`#product-${num}`)
    }
    

}

module.exports = new productsPage()