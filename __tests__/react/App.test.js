import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import App from '../../client/App.jsx';
import Login from '../../client/components/register/Login.jsx';

describe('Unit tests for React components', () => {
    describe('App', () => {
        it('renders App component', () => {
            render(<App />);

            // shows the html rendered by the component in the terminal
            // screen.debug();

            const img = screen.getByAltText('Travolotl Logo');
            const heading = screen.getByRole('heading');
            const button = screen.getByRole('button');

            expect(img).toBeVisible;
            expect(heading.textContent).toBe('Time to plan the trip of your dreams...');
            expect(button.textContent).toBe('Click here to begin your adventure!');
        });
    });

    describe('Login', () => {
        it('renders Login component', () => {
            render(<Login />);

            // shows the html rendered by the component in the terminal
            screen.debug();

            // Should have email input
            // Should have password input
            // Should have login button
            // Should have signup button

            // const img = screen.getByAltText('Travolotl Logo');
            // const heading = screen.getByRole('heading');
            // const button = screen.getByRole('button');

            // expect(img).toBeVisible;
            // expect(heading.textContent).toBe('Time to plan the trip of your dreams...');
            // expect(button.textContent).toBe('Click here to begin your adventure!');
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