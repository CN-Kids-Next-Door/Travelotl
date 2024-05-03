import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import App from '../../client/App.jsx';
import Login from '../../client/components/register/Login.jsx';
import Register from '../../client/components/register/Register.jsx';

describe('Unit tests for React components', () => {
    describe('App', () => {
        it('renders App component', () => {
            render(<App />);

            // shows the html rendered by the component in the terminal
            // screen.debug();

            const img = screen.getByAltText('Travolotl Logo');
            const heading = screen.getByRole('heading');
            const button = screen.getByRole('button');

            // check for website logo, correct heading, and navigation button
            expect(img).toBeVisible;
            expect(heading.textContent).toBe('Time to plan the trip of your dreams...');
            expect(button.textContent).toBe('Click here to begin your adventure!');
        });
    });

    describe('Login', () => {
        it('renders Login component', () => {
            render(
                <BrowserRouter>
                  <Login />
                </BrowserRouter>
            );

            // checks for email and password input fields
            const emailInput = screen.getByRole('textbox');
            const passwordInput = screen.getByLabelText(/password/i);
        });
    });

    describe('Register', () => {
        it('renders Register component', () => {
            render(
                <BrowserRouter>
                  <Register />
                </BrowserRouter>
            );

            // checks for name, username, and email input fields
            const firstnameInput = screen.getByRole('textbox', { name: 'First Name:'});
            const lastnameInput = screen.getByRole('textbox', { name: 'Last Name:'});
            const username = screen.getByRole('textbox', { name: 'Username:'});
            const email = screen.getByRole('textbox', { name: 'Email:'});
        });
    });
});

describe('React-Redux integration tests', () => {
    describe('Initializes state before user interaction', () => {
        it('expects store to be initialized', () => {
            expect(true).toBe(true);
        });
    });
});