/// <reference types="cypress"/>

class wishlistPage {

    get getItemFavoriteButtonLocator() {
        return ('div.css-1m8iww1>svg')
    }
    get getItemQuantity() {
        return ('input[type="text"]')
    }
    get getItemName() {
        return ('.snipcart-item-line__title.snipcart__font--xlarge.snipcart__font--secondary.snipcart__font--black')  
    }
    get getFlavorText() {
        return cy.get('.chakra-alert__title.css-tidvy5')
    }

}
module.exports = new wishlistPage