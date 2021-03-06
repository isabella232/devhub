const EXPAND_TAG_TEXT = '...';

Cypress.Commands.add('closeModal', () => {
    cy.get('[data-test="modal-close"]').click();
});

// Keep a reference to the body dom element to reference later even in "within" blocks
Cypress.Commands.add('useBodyReference', () => {
    cy.get('body').as('body');
});

Cypress.Commands.add('checkTagListProperties', shouldExpand => {
    cy.get('ul li a')
        .first()
        .should('have.attr', 'href')
        .should('match', /\/(tag|product|language)/);
    if (shouldExpand) {
        const length = cy.get('ul li a').length;
        cy.get('ul li a')
            .last()
            .within($el => {
                expect($el.text()).to.equal(EXPAND_TAG_TEXT);
            });
        cy.get('ul li a').last().should('not.have.attr', 'href');
        cy.get('ul li a').last().click();
        // Now more tags may have been rendered but regardless the last one should
        // not be the ...
        const updatedLength = cy.get('ul li a').length;
        const numTagsChanged = length !== updatedLength;
        let lastElementDoesNotExpand;
        cy.get('ul li a')
            .last()
            .within($el => {
                lastElementDoesNotExpand = $el.text() !== EXPAND_TAG_TEXT;
            });
        expect(lastElementDoesNotExpand);
        // This may not always be true, but it is for the testing purposes
        // of a single chosen article
        expect(numTagsChanged);
    }
});

// Basic sanity checks for an article card (image, title, tags, etc)
Cypress.Commands.add('checkArticleCard', card => {
    cy.get(card).within(() => {
        // Title
        cy.get('h5').should('not.be.empty');
        // Description
        cy.get('p').should('not.be.empty');
        cy.get('img').should('have.attr', 'src').should('not.be.empty');
        // Tags
        cy.checkTagListProperties();
    });
});

Cypress.Commands.add('checkFirstCardInCardList', contains => {
    cy.get('[data-test="card-list"]').within(() => {
        cy.get('[data-test="card"]')
            .first()
            .within(card => {
                cy.checkArticleCard(card);
                cy.contains(contains);
            });
    });
});

// Check featured article cards on learn page with no images
Cypress.Commands.add('checkSecondaryFeaturedArticleCard', card => {
    cy.get(card).within(() => {
        // Title
        cy.get('h5').should('not.be.empty');
        // Description
        cy.get('p').should('not.be.empty');
        // Tags
        cy.checkTagListProperties();
    });
});

Cypress.Commands.add('checkMetaContentProperty', (query, value) => {
    cy.get(`head meta[${query}]`).should('have.prop', 'content', value);
});

Cypress.Commands.add('checkCanonicalUrlValue', value => {
    cy.get(`link[rel="canonical"]`).should('have.prop', 'href', value);
});

// Mock data from events servers
Cypress.Commands.add('mockEventsApi', () => {
    cy.fixture('liveEventData.json').as('liveEventData');
    cy.fixture('eventData.json').as('eventData');
    cy.server();
    cy.route(
        '**/api/event/all/1?sort=-node_type_attributes.event_start',
        '@eventData'
    ).as('getEvents');
    cy.route('**/api/event?status=Live', '@liveEventData').as('getLiveEvents');
});

Cypress.Commands.add('mockTextFilterResponse', () => {
    cy.fixture('javaTextFilterResponse.json').as('javaTextFilterResponse');
    cy.server();
    cy.route({
        method: 'POST',
        url: '**/api/client/v2.0/app/devhubauthentication-lidpq/functions/call',
        response: '@javaTextFilterResponse',
    }).as('filterJavaArticles');
});

Cypress.Commands.add('toggleLearnPageTab', tabName => {
    cy.get('[data-test="tabs"]').within(() => {
        cy.contains(tabName).should('exist').click({ force: true });
    });
});

// To stub requests with Cypress, we must remove fetch from the browser so
// we can fallback to XMLHttpRequests
// https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/stubbing-spying__window-fetch#readme

Cypress.Commands.add('visitWithoutFetch', path => {
    cy.readFile('node_modules/whatwg-fetch/dist/fetch.umd.js').then(
        polyfill => {
            cy.visit(path, {
                onBeforeLoad(win) {
                    delete win.fetch;
                    win.eval(polyfill);
                },
            });
        }
    );
});
