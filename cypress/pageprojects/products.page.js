/// <reference types="cypress"/>

class productsPage {

    get getCartButton() {
        return cy.get('#drawer-cart')
    }
    get getCartDetails() {
        return cy.get('.snipcart-button-link')
    }
}

module.exports = new productsPage