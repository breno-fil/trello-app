export {}
declare global {
  namespace Cypress {
    interface Chainable {
      addBoardApi: typeof addBoardApi;
    }
  }
}

/**
 * Creates a new board using the API
 * @param name name of the board
 * @example
 * cy.addBoardApi('new board')
 *
 */

export const addBoardApi = function(this: any, name: string): Cypress.Chainable<any> {

  return cy
    .request('POST', 'http://localhost:3000/api/boards', { name })
    .its('body', { log: false }).as('board');
    
};