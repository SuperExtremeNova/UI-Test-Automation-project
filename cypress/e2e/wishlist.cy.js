/// <reference types="cypress"/>

const userData = require('../data/userdata')
const loginPage = require('../pageprojects/login.page')
const productPage = require('../pageprojects/products.page')
const wishlistPage = require('../pageprojects/wishlist.page')
const productDetailPage = require('../pageprojects/productDetail.page')

describe('Validate the favorites/wishlist option on the website', () => {
    let productSelector;

    beforeEach(()=> {
        cy.visit('/')
        loginPage.loginUser(userData[4].email, userData[4].password)
        productSelector = Math.floor(Math.random() * 21) + 1
    })

    it('verify that a product can be added to favorites from the products page', () => {

        productPage.getspecificProductContainer(productSelector).then((product) => {
            cy.wrap(product).find(wishlistPage.getItemFavoriteButtonLocator).click()
            cy.wrap(product).find(wishlistPage.getItemFavoriteButtonLocator)
            .should('have.attr','id').and('contain','remove')  
        })
        wishlistPage.getFlavorText.should('contain','added')
    })

    it('verify that a product can be removed from favorites on the products page', () => {

        productPage.getspecificProductContainer(productSelector).then((product) => {

            cy.wrap(product).find(wishlistPage.getItemFavoriteButtonLocator).then((wish) =>{
                
                if(wish.attr('id') === 'remove-from-favorite') {
                    cy.wrap(product).find(wishlistPage.getItemFavoriteButtonLocator).click()
                    cy.wrap(product).find(wishlistPage.getItemFavoriteButtonLocator)
                    .should('have.attr','id').and('contain','add')
                    wishlistPage.getFlavorText.should('contain','removed')
                }else {
                    cy.wrap(product).find(wishlistPage.getItemFavoriteButtonLocator).click()
                    cy.wrap(product).find(wishlistPage.getItemFavoriteButtonLocator).click()
                    cy.wrap(product).find(wishlistPage.getItemFavoriteButtonLocator)
                    .should('have.attr','id').and('contain','add')
                    wishlistPage.getFlavorText.should('contain','removed') 
                }
            })
              
        })
        
    })

    it('varify that a product can be added to favorite from the product detail page', () => {

        cy.wait(3000)
        productPage.getspecificProductContainer(productSelector).click()

        productDetailPage.getProductName.parent()
        .find(wishlistPage.getItemFavoriteButtonLocator).then((wish) =>{
                
            if(wish.attr('id') === 'remove-from-favorite') {
                productDetailPage.getProductName.parent().find(wishlistPage.getItemFavoriteButtonLocator).click()
                productDetailPage.getProductName.parent().find(wishlistPage.getItemFavoriteButtonLocator).click()
                productDetailPage.getProductName.parent().find(wishlistPage.getItemFavoriteButtonLocator)
                .should('have.attr','id').and('contain','remove')
                wishlistPage.getFlavorText.should('contain','added')
            }else {
                productDetailPage.getProductName.parent().find(wishlistPage.getItemFavoriteButtonLocator).click()
                productDetailPage.getProductName.parent().find(wishlistPage.getItemFavoriteButtonLocator)
                .should('have.attr','id').and('contain','remove')
                wishlistPage.getFlavorText.should('contain','added') 
            }
        })

    })

    it('verify that a user can\'t search for favourites with the search option', () => {
        
        productPage.getSearchInput.clear().type('favorite')
        productPage.getProductName().should('not.exist')

    })

    it('verify that the user can\'t and a quanty higher than one to favorite', () => {
        

        productPage.productQuantityInput(productSelector).type('{backSpace}' + productSelector)
        productPage.getspecificProductContainer(productSelector).then((product) => {
            cy.wrap(product).find(wishlistPage.getItemFavoriteButtonLocator).click()
            cy.wrap(product).find(wishlistPage.getItemFavoriteButtonLocator)
            .should('have.attr','id').and('contain','remove')  
        })
        cy.visit('/favorites')
        productPage.productQuantityInput(0).should('not.equal',productSelector)

    })
})