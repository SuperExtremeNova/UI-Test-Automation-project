
class LoginPage {

    get getWelcomePageButton() {
        return cy.get('#signInOrRegister')
    }

    get getLoginTab() {
        return cy.get('li').contains('log in',{matchCase:false})
    }
    
    get getSignUpTab() {
        return cy.get('li').contains('sign up',{matchCase:false})
    }

    get getGoogleLink() {
        return cy.get('div').contains('google',{matchCase:false})
    }

    get getEmailInput() {
        return cy.get('input[name="email"]')
    }

    get getPwdInput() {
        return cy.get('input[name="password"]')
    }
    
    get getResetPwdLink() {
        return cy.get('a').contains('your password',{matchCase:false})
    }

    get getSubmitButton() {
        return cy.get('button[name="submit"]')
    }

    get getBackButton() {
        return cy.get('#undefined-back-button')
    }

    get getLoginError() {
        return cy.get('.animated.fadeInUp')
    }

    get getBlankEntry() {
        return cy.get('.auth0-lock-error-invalid-hint')
    }
}

module.exports = new LoginPage()