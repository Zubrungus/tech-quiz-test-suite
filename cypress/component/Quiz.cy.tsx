import React from "react";
import Quiz from '../../client/src/components/Quiz'

const singleQuestion = [{
    "question": "What is the output of print(2 ** 3)?",
    "answers": [
        { "text": "6", "isCorrect": false },
        { "text": "8", "isCorrect": true },
        { "text": "9", "isCorrect": false },
        { "text": "12", "isCorrect": false }
    ]
}]


describe('<Quiz />', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/questions/random', (req) => {
            req.reply({
                statusCode: 200,
                body: singleQuestion,
            });
        }).as('getQuestion');
    });

    it('should have a button with the text Start Quiz', () => {
        cy.mount(<Quiz />);
        cy.get('button').should('contain', 'Start Quiz');
    });

    it('should have four listed answers', () => {
        cy.mount(<Quiz />);
        cy.get('button').click();
        cy.wait('@getQuestion');
        cy.get('.mt-3').children().should('have.length', 4);
    });
});