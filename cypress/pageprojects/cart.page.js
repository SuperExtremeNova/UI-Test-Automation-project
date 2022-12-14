/// <reference types="cypress"/>

// get all the locator for the cart page and create functions to modify the selection on that page
class cartPage {
    get getItemDescription() {
        return cy.get('.snipcart-item-description')
    }
    get getItemName() {
        return cy.get('.snipcart-item-line__title')
    }
    get getItemCost() {
        return cy.get('.snipcart-item-quantity__total-price')
    }
    get getItemQTY() {
        return cy.get('.snipcart__font--secondary.snipcart__font--regular')
    }
    get getItemDeletButton() {
        return cy.get('.snipcart-button-icon.is-danger')
    }
    get getCartQTY() {
        return cy.get('.snipcart-cart-header__option.snipcart-cart-header__count.snipcart__font--secondary.snipcart__font--bold')
    }
    get getContinueShopping() {
        return cy.get('span').contains('continue',  {matchCase:false})
    }
    get getCartTitle() {
        return cy.get('.snipcart-cart-header__title.snipcart__font--black.snipcart__font--secondary')
    }
    get getCartTotal() {
        return cy.get('.snipcart-summary-fees__amount.snipcart-summary-fees__amount--highlight.snipcart__font--large')
    }
    get getCheckoutButton() {
        return cy.get('.snipcart-button-primary.snipcart-base-button.is-icon-right')
    }
    get getReduceQTY() {
        return cy.get('button[title="Decrement quantity"]')
    }
    get getIncreaseQTY() {
        return cy.get('button[title="Increment quantity"]')
    }
}

module.exports = new cartPage()