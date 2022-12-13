/// <reference types="cypress"/> 

const loginPage = require('../pageprojects/login.page')
const userData = require('../data/userdata')

describe('cart options test', () => {

    beforeEach(() =>{

        cy.visit('/')
        loginPage.loginUser(userData[4].email, userData[4].password)

    })

    it('varify a product has a title and discription in cart', () => {
        
    })

})