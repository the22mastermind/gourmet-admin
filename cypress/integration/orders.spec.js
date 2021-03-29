/// <reference types="Cypress" />

describe('Orders', () => {
  before(() => {
    // Clear browser session
    cy.window().then((w) => {
      w.sessionStorage.clear();
    });

    // Launch App
    cy.visit('http://localhost:1234');
  });

  it('Should log in, update an order and navigate to first order (on last page)', () => {
    // Mock API response for login
    cy.intercept('POST', '/api/auth/login', { fixture: 'login.json' });
    // Mock API response for fetch orders list
    cy.intercept('GET', '/api/admin/orders', { fixture: 'ordersList.json' });
    // Mock API response for update order (error)
    cy.intercept('PATCH', '/api/admin/orders/6', { statusCode: 200, body: { message: 'Order updated successfully' } });
    
    // Valid login credentials
    cy.get('form').within(() => {
      cy.findByLabelText('phoneNumber').clear();
      cy.findByLabelText('phoneNumber').type('+250721111100').should('have.value', '+250721111100');
      cy.findByLabelText('password').clear();
      cy.findByLabelText('password').type('@1helloworld').should('have.value', '@1helloworld');
      cy.findByRole('button', { name: /Login/i }).click();
    });

    // Should be redirected to the dashboard
    cy.url().should('include', '/dashboard');
    cy.findByText('Orders list').should('exist');

     cy.get('[data-testid=orders-table]', { timeout: 5000 }).should('be.visible');

    // Table body should show 5 rows of latest orders
    cy.get('[data-testid=orders-table]').within(() => {
      cy.get('[data-testid=order-table-body-row]').should('have.length', 5);
      cy.get('[data-testid=order-table-body-row]').first().within(() => {
        cy.findByText('Order #6').should('exist');
        cy.findByText('PENDING').should('exist');
        // Open details panel
        cy.get('[data-testid=row-details-button]').click();
      });
    });

    cy.findByText('Update status').should('exist');
    cy.findByText('User info').should('exist');

    // Open user info
    cy.findByText('User info').click();

    // User info modal should be visible
    cy.get('[data-testid=dialog-wrapper]').within(() => {
      cy.findByText('User information').should('exist');
      cy.findByText('#7').should('exist');
      cy.findByText('James King').should('exist');
      cy.findByText('+250734107000').should('exist');
      cy.findByText('Kigali, Rwanda').should('exist');
    });

    // Close user info modal
    cy.get('[data-testid=close-dialog-button]').click();

    // Open update status modal
    cy.findByText('Update status').click();
    cy.findByText('Order #6 status').should('exist');

    // Submiting a new status should trigger a success message
    cy.get('[data-testid=select-modal]').within(() => {
      cy.get('[data-testid=select-input]').click();
    });
    cy.findByRole('listbox').within(() => {
      cy.findByText('Pending').should('exist');
      cy.findByText('On the move').should('exist');
      cy.findByText('Completed').should('exist');
      cy.findByText('Accepted').click();
    });

    // Accepted should be selected
    cy.get('[data-testid=select-modal]').within(() => {
      cy.findByText('Accepted').should('exist');
    });
    
    // Submit new status
    cy.get('[data-testid=confirm-button]').click();

    // Successful update snackbar
    cy.findByRole('alert').within(() => {
      cy.findByText('Order updated successfully').should('exist');
    });
  });

  it('Should test table pagination', () => {
    // Go to last page
    cy.get('[data-testid=last-page-button]').click();

    // Order #1 should only be displayed
    cy.get('[data-testid=orders-table]').within(() => {
      cy.get('[data-testid=order-table-body-row]').should('have.length', 1);
      cy.get('[data-testid=order-table-body-row]').first().within(() => {
        cy.findByText('Order #1').should('exist');
        cy.findByText('John Doe').should('exist');
        cy.findByText('$20').should('exist');
        cy.findByText('ACCEPTED').should('exist');
      });
    });

    // Go to previous page (first page)
    cy.get('[data-testid=previous-page-button]').click();

    // Last 5 orders should be displayed
    cy.get('[data-testid=orders-table]').within(() => {
      cy.get('[data-testid=order-table-body-row]').should('have.length', 5);
      cy.get('[data-testid=order-table-body-row]').first().findByText('Order #6').should('exist');
      cy.get('[data-testid=order-table-body-row]').next().findByText('Order #5').should('exist');
      cy.get('[data-testid=order-table-body-row]').next().findByText('Order #4').should('exist');
    });

    // Go to next page (last page/second page)
    cy.get('[data-testid=next-page-button]').click();

    // Order #1 should be displayed
    cy.get('[data-testid=orders-table]').within(() => {
      cy.get('[data-testid=order-table-body-row]').should('have.length', 1);
      cy.get('[data-testid=order-table-body-row]').first().findByText('Order #1').should('exist');
    });

    // Go to first page
    cy.get('[data-testid=first-page-button]').click();

    // Last 5 orders should be displayed
    cy.get('[data-testid=orders-table]').within(() => {
      cy.get('[data-testid=order-table-body-row]').should('have.length', 5);
    });
  });

  it('Update order should trigger an error', () => {
    // Mock API response for update order (error)
    cy.intercept('PATCH', '/api/admin/orders/6', { statusCode: 400, body: { error: 'Update failed. Order status exists already' } });
    
    // Table body should show 5 rows of latest orders
    cy.get('[data-testid=orders-table]').within(() => {
      cy.get('[data-testid=order-table-body-row]').should('have.length', 5);
      cy.get('[data-testid=order-table-body-row]').first().within(() => {
        cy.findByText('Order #6').should('exist');
        // Open details panel of order #6
        cy.get('[data-testid=row-details-button]').click();
      });
    });

    // Open update status modal
    cy.findByText('Update status').click();
    cy.findByText('Order #6 status').should('exist');

    // Submiting existing status should trigger an error
    cy.get('[data-testid=select-modal]').within(() => {
      // Submit new status
      cy.get('[data-testid=confirm-button]').click();
    });

    // Error should be displayed
    cy.get('#root').within(() => {
      cy.get('[data-testid=alert-wrapper]').findByRole('alert', { hidden: true }).within(() => {
        cy.findByText('Update failed. Order status exists already').should('exist');
      });
    });

    // Close modal
      cy.get('[data-testid=cancel-button]').click();
    
      // Close the details panel of order #6
      cy.get('[data-testid=order-table-body-row]').first().within(() => {
        cy.get('[data-testid=row-details-button]').click();
      });
  });
});
