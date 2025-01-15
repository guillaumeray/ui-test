describe('chat', () => {

  const url = 'https://chat.mistral.ai/chat'

  let elements = {
    // menu
    newChatButton: () => cy.get('button[aria-label="New chat"]'),
    openPanel: () => cy.get('button[aria-label="Open"]'),
    closePanel: () => cy.get('button[aria-label="close"]'),
    searchInMessages: () => cy.contains('span', 'Search'),
    searchInput: () => cy.get('div[role=dialog] input'),
    searchResult: () => cy.get('a span', { timeout: 5000 }),
    
    // prompt
    promptInput: () => cy.get('textarea'),
    submitPromptButton: () => cy.get('button[type=submit]'),
    messages: (timeout = 10000) => cy.get('div.prose p', { timeout: timeout }),
    canvas: () => cy.get('button[aria-label="Toggle canvas"]', { timeout: 10000 }),
    canvasEditor: () => cy.get('div.canva-editor', { timeout: 10000 }),
    webSearch: () => cy.get('button[aria-label="Toggle websearch"]', { timeout: 10000 }),
    imageGeneration: () => cy.get('button[aria-label="Toggle image generation"]'),
    addFile: () => cy.get('button[aria-label="Add files"]'),
  }

  beforeEach(() => {
    cy.visit(url)
    cy.wait(3000)
    // reset state of buttons
    cy.changeButtonState(elements.canvas, 'off');
    cy.changeButtonState(elements.webSearch, 'off');
    cy.changeButtonState(elements.imageGeneration, 'off');
  });

  // prompt 

  it('Basic user prompt message', () => {
    elements.promptInput().type('Hello')
    elements.submitPromptButton().click()
    elements.messages().should('length', 2)
    assert(elements.messages().eq(0).contains('Hello'))
  })

  it('Use canvas functionality', () => {
    elements.promptInput().type('Ouvrir un canvas pour du code python')
    cy.changeButtonState(elements.canvas, 'on');
    elements.submitPromptButton().click()
    elements.canvasEditor().should('have.length', 1)
  })

  it('Web search functionality', () => {
    elements.promptInput().type('Recherche sur le web : quel est le cours actuel du bitcoin ?')
    cy.changeButtonState(elements.webSearch, 'on');
    elements.submitPromptButton().click()
    elements.messages().should('have.length', 2)
    elements.messages().eq(1).should('contain', 'Le cours actuel du Bitcoin est de')
  })

  it('Image generation functionality', () => {
    elements.promptInput().type('Générer une image : un chaton mignon')
    cy.changeButtonState(elements.imageGeneration, 'on');
    elements.submitPromptButton().click()
    elements.messages().should('have.length', 2)
    elements.messages().eq(1).find('img', {timeout: 10000}).should('have.length', 1)
  })

  it('Import image and extract information', () => {
    const filePath = 'image.jpg';
    cy.get('input[type="file"]').should('exist');
    cy.get('input[type="file"]').attachFile(filePath);
    elements.promptInput().type('Quest ce que cette image représente ?')
    elements.submitPromptButton().click()
    elements.messages(15000).should('have.length', 2)
    cy.wait(3000)
    elements.messages().eq(1).invoke('text').then((text) => {
      if (text.includes('arbre')) {
      } else {
        throw new Error('Image does not contain tree')
      }
    });
  })

  it('Import pdf file and extract information', () => {
    const filePath = 'pdf_test.pdf';
    cy.get('input[type="file"]').should('exist');
    cy.get('input[type="file"]').attachFile(filePath);
    elements.promptInput().type('Quel est le contenu de ce fichier ?')
    elements.submitPromptButton().click()
    elements.messages(15000).should('have.length', 2)
    cy.wait(3000)
    elements.messages().eq(1).invoke('text').then((text) => {
      if (text.includes('faux-texte')) {
      } else {
        throw new Error('Pdf file does not contain faux-texte')
      }
    });
  })

  // menu 

  it('Open new chat', () => {
    elements.promptInput().type('Hello')
    elements.submitPromptButton().click()
    elements.messages().should('length', 2)
    elements.newChatButton().click();
    cy.wait(2000)
    elements.promptInput().should('have.value', '')
    elements.messages().should('have.length', 0)
  })

  it('Search for a conversation', () => {
    cy.get('body').then(($body) => {
      if ($body.find('button[aria-label="Open"]').length > 0) {
        elements.openPanel().click();
      }
    });
    elements.searchInMessages().click()
    elements.searchInput().type('Canvas')
    elements.searchResult().eq(0).click()
    elements.messages().its('length').should('be.gt', 1);
  })


  // edge cases and negative cases
  
  it('Prevent empty prompt submission', () => {
    elements.submitPromptButton().click({force: true});
    elements.messages().should('have.length', 0);
  });

  it('Web search functionality false case', () => {
    elements.promptInput().type('Recherche sur le web : quel est le cours actuel du bitcoin ?')
    elements.submitPromptButton().click()
    elements.messages().should('have.length', 2)
    elements.messages().eq(1).should('not.contain', 'Le cours actuel du Bitcoin est de')
  })

  // responsive compatibility

  it('Responsive UI test', () => {
    cy.viewport('iphone-6');
    cy.visit(url)
    elements.promptInput().should('be.visible');
    elements.promptInput().type('Hello')
    elements.submitPromptButton().click()
    elements.messages().should('length', 2)
  });

})