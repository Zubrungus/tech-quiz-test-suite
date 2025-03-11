import QUESTIONS from '../fixtures/questions.json'

describe('Quiz Game Cycle', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/questions/random', (req) => {
            req.reply({
                statusCode: 200,
                body: QUESTIONS,
            });
        }).as('getQuestion');
        cy.visit('/');
    });

    it('should have a button to start the game', () => {
        cy.get('button').should('be.visible');
    });

    it('should have four listed answers', () => {
        cy.get('button').click();
        cy.wait('@getQuestion');
        cy.get('.mt-3').children().should('have.length', 4);
    });

    it('should show the results screen with a correct score after clicking 10 times', () => {
        cy.get('button').click();
        cy.wait('@getQuestion');
        cy.get('.mt-3').first().first().click();
        cy.get('.mt-3').first().first().click();
        cy.get('.mt-3').first().first().click();
        cy.get('.mt-3').first().first().click();
        cy.get('.mt-3').first().first().click();
        cy.get('.mt-3').first().first().click();
        cy.get('.mt-3').first().first().click();
        cy.get('.mt-3').first().first().click();
        cy.get('.mt-3').first().first().click();
        cy.get('.mt-3').first().first().click();

    })



});