import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../../client/App.jsx';

describe('App', () => {
    it('renders App component', () => {
        render(<App />);

        // shows the html rendered by the component in the terminal
        //screen.debug();

        const img = screen.getByAltText('Travolotl Logo');
        const heading = screen.getByRole('heading');
        const button = screen.getByRole('button');

        expect(img).toBeVisible;
        expect(heading.textContent).toBe('Time to plan the trip of your dreams...');
        expect(button.textContent).toBe('Click here to begin your adventure!');
    });
});