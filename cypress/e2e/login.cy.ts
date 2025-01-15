describe('login', () => {

  const url = 'https://auth.mistral.ai/ui/login'

  let elements = {
    loginInput: () => cy.get('input[name=identifier]'),
    passwordInput: () => cy.get('input[name=password]'),
    submitBtn: () => cy.get('button[name=method]')
  }

  beforeEach(() => {
    cy.clearCookies()
    cy.visit(url)
  });1

  it('Login', () => {
    elements.loginInput().type('Hello').should('have.value', 'Hello').and('exist')
    elements.passwordInput().type('Hello').should('have.value', 'Hello').and('exist')
    elements.submitBtn().should('be.visible').and('not.be.disabled').click()
  })

  
})