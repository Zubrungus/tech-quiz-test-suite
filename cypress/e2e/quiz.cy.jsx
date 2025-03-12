import QUESTIONS from '../fixtures/questions.json'

describe('Quiz Game Cycle', () => {
    beforeEach(() => {
        //intercept the api request for random questions and supply 10 ten specific questions
        cy.intercept('GET', '/api/questions/random', (req) => {
            req.reply({
                statusCode: 200,
                body: QUESTIONS,
            });
        }).as('getQuestion');
        cy.visit('http://127.0.0.1:3001/');
    });
    
    //start game button should be visible
    it('should have a button to start the game', () => {
        cy.get('button').should('be.visible');
    });

    //the div that contains the answers should have 4 children, meaning 4 listed answers
    it('should have four listed answers', () => {
        cy.get('button').click();
        cy.wait('@getQuestion');
        cy.get('.mt-3').children().should('have.length', 4);
    });

    it('should show the results screen with a correct score after clicking the first answer 10 times', () => {
        cy.get('button').click();
        cy.wait('@getQuestion');
        //click the first answer all 10 times
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        //given the questions received from fixtures/questions.json, score should always be 2/10 if first answer is always clicked
        cy.get('.alert-success').should('contain','Your score: 2/10');
    })

    it('should restart the game when the Take New Quiz button is clicked', () => {
        cy.get('button').click();
        cy.wait('@getQuestion');
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        cy.get('.mt-3').children().first().children().first().click();
        //after going through the quiz, ensure we are clicking the Take New Quiz button
        cy.get('.d-inline-block').should('contain', 'Take New Quiz').click();
        //check if the header contains a question mark, meaning a question is on screen and the game has been restarted
        cy.get('h2').should('contain', '?')
    })

});