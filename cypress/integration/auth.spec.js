/// <reference types="Cypress" />

describe('Authentication', () => {
  beforeEach(() => {
    // Clear browser session
    cy.window().then((w) => {
      w.sessionStorage.clear();
    });

    // Launch App
    cy.visit('http://localhost:1234');
  });

  it('Should trigger network error', () => {
    // Mock network error
    cy.intercept('POST', '/api/auth/login', { forceNetworkError: true });

    // Invalid credentials
    cy.get('form').within(() => {
      cy.findByLabelText('phoneNumber').clear().type('+250721111100').should('have.value', '+250721111100');
      cy.findByLabelText('password').clear().type('@1helloworld').should('have.value', '@1helloworld');
      cy.findByRole('button', { name: /Login/i }).click();
    });

    // Trigger network error message
    cy.findByText('Network Error').should('exist');
  });

  it('Should display validation error and user not found', () => {
    // Clear inputs
    cy.get('form').within(() => {
      cy.findByLabelText('phoneNumber').clear();
      cy.findByLabelText('password').clear();
    });

    // Trigger is required validation error
    cy.get('form').within(() => {
      cy.findByRole('button', { name: /Login/i }).click();
      cy.findByText('Phone number is required').should('exist');
      cy.findByText('Password is required').should('exist');
    });
    
    // Trigger pattern validation error
    cy.get('form').within(() => {
      cy.findByLabelText('phoneNumber').type('+250#2hi3hh.8');
      cy.findByLabelText('password').type('hello');
      cy.findByRole('button', { name: /Login/i }).click();
      cy.findByText('Phone number must include country code eg. +250').should('exist');
      cy.findByText('Password length must be between 6 and 20, with at least one number and a symbol').should('exist');
    });

    // Mock API response
    cy.intercept('POST', '/api/auth/login', { statusCode: 404, body: { error: 'User not found' } });
    
    // Invalid credentials
    cy.get('form').within(() => {
      cy.findByLabelText('phoneNumber').clear().type('+250721111111').should('have.value', '+250721111111');
      cy.findByLabelText('password').clear().type('@2helloworld').should('have.value', '@2helloworld');
      cy.findByRole('button', { name: /Login/i }).click();
    });

    // Trigger user not found error
    cy.findByText('User not found').should('exist');
    cy.get('form').within(() => {
      cy.findByLabelText('phoneNumber').click();
    });
  });

  it('Should display user not admin error', () => {
    // Mock API response
    cy.intercept('POST', '/api/auth/login', {fixture: 'notadmin.json' });
    
    // Valid credentials but not admin
    cy.get('form').within(() => {
      cy.findByLabelText('phoneNumber').clear();
      cy.findByLabelText('phoneNumber').type('+250721111100').should('have.value', '+250721111100');
      cy.findByLabelText('password').clear();
      cy.findByLabelText('password').type('@1helloworld').should('have.value', '@1helloworld');
      cy.findByRole('button', { name: /Login/i }).click();
    });

    // Trigger not admin error
    cy.findByText('Access denied. You must be an admin to proceed').should('exist');

    // Close Snackbar
    cy.findByRole('alert').within(() => {
      cy.findByRole('button').click();
    });
  });

  it('Should log in, open drawer, then trigger token error on logout', () => {
    // Mock API response for login
    cy.intercept('POST', '/api/auth/login', {fixture: 'login.json' });
    // Mock API response for fetch orders list
    cy.intercept('GET', '/api/admin/orders', { statusCode: 404, body: { error: 'No orders found at the moment' } });
    // Mock API response for failed logout
    cy.intercept('GET', '/api/auth/logout', { statusCode: 401, body: { error: 'Invalid token, please login and try again' } });
    
    // Valid credentials
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
    // Table body should show 'No orders found' message
    cy.get('[data-testid=orders-table]').within(() => {
      cy.findByText('No orders found at the moment').should('exist');
    });

    // Close no orders found snackbar
    cy.findByRole('alert').within(() => {
      cy.findByRole('button').click();
    });

    // Open drawer
    cy.findByText('Gourmet Dashboard').click();

    // Close drawer by clicking on list item in drawer
    cy.get('[data-testid=drawer-item-orders]').click();

    // Failed logout should display an error message
    cy.get('[data-testid=header-menu-button]').click();
    cy.findByText('Log Out').click();
    cy.findByText('Invalid token, please login and try again').should('exist');

    // Close Snackbar
    cy.findByRole('alert').within(() => {
      cy.findByRole('button').click();
    });
  });

  it('Should log in, then log out', () => {
    // Mock API response for login
    cy.intercept('POST', '/api/auth/login', {fixture: 'login.json' });
    // Mock API response for fetch orders list
    cy.intercept('GET', '/api/admin/orders', { statusCode: 404, body: { error: 'No orders found at the moment' } });
    // Mock API response for successful logout
    cy.intercept('GET', '/api/auth/logout', { statusCode: 200, body: { message: 'Logged out successfully' } });
    
    // Valid credentials
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

    // Open Menu then log out
    cy.get('[data-testid=header-menu-button]').click();
    cy.findByText('Log Out').click();

    // Should be redirected to the login page
    cy.url({ timeout: 6000 }).should('include', '/');
    cy.findByRole('button', { name: /Login/i }).should('exist');
  });

  it('Should navigate to unexisting page then back to login page', () => {
    cy.visit('/abcd');

    // Should be redirected to page not found
    cy.url().should('include', '/abcd');
    cy.findByText('Page not found').should('exist');

    // Return to login page
    cy.visit('/');
  });
});
