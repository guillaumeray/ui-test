/// <reference types="cypress" />

Cypress.Commands.add('elementExist', (selector: string) => {
    cy.get('body').then($body => {
      if ($body.find(selector).length > 0) {
        return true
      }
      return false
    });
});

Cypress.Commands.add('changeButtonState', (cb: Function, desiredState: string) => {
    cb()
      .invoke('attr', 'data-state')
      .then((currentState) => {
        if (currentState === 'on' && desiredState === 'off') {
          cb().click();
        } else if (currentState === 'off' && desiredState === 'on') {
          cb().click();
        }
      });
  });

Cypress.Commands.add('setDefaultCookies', (cookies: any) => {
    for (const cookie of cookies) {
        cy.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain,
          expiry: cookie.expirationDate,
          httpOnly: cookie.httpOnly,
          secure: cookie.secure,
        }) 
      }
  });