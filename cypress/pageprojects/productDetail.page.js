/// <reference types="cypress"/>

// get all the locator for the product detail page
class ProductDetailPage {

    get getProductName() {
        return cy.get('div.css-84zodg>h2')
    }

    get getProductDescription() {
        return cy.get('div.css-egoftb>p')
    }

    get getBackToProducts() {
        return cy.get('svg+h2')
    }
    get getSelectedProductImage() {
        return cy.get('li.selected>img')
    }
}

module.exports = new ProductDetailPage