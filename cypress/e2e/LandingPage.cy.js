import AbtractPage from "./Abtract page";

it('Login', () => {
  const correctEmail = 'dummyEmail@gmail.com';
  const correctPassword = '123456';

  // const checkButtonState = (shouldBeDisabled) => {
  //   const assertion = shouldBeDisabled ? 'be.disabled' : 'not.be.disabled';
  //   cy.get('.btn').should(assertion);
  // };

  cy.visit('http://localhost:5173/')

  AbtractPage.checkButtonState(true);
  
  cy.get('[type="text"]')
  .type(correctEmail)
  .invoke('val')
  .should('include', '@gmail.com');

  AbtractPage.checkButtonState(true);

  cy.get('[type="password"]')
  .type(correctPassword)
  .invoke('val')
  .should('have.length', 6);

  AbtractPage.checkButtonState(false);

  cy.get('.btn').click()
})