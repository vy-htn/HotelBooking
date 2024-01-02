// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText();
//   expect(linkElement).toBeInTheDocument();
// });
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './views/homepage';
import Availability from './views/selectpage';

describe('App', () => {
  it('renders the homepage', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Assuming your HomePage component renders some unique text
    expect(screen.getByText(/Welcome to the Royal/i)).toBeInTheDocument();
  });

  it('navigates to availability page by click book now button', () => {
    render(
      <BrowserRouter>
        <Availability />
      </BrowserRouter>
    );

    // Click on a link that navigates to availability
    fireEvent.click(screen.getByText((content, element) => {
      // Use a custom condition to match the text
      const normalizedText = content.trim().toUpperCase();
      return normalizedText === 'BOOK NOW';
    }));

    // Assuming your Availability component renders some unique text
    expect(screen.getByText(/Promo /i)).toBeInTheDocument();
  });

  // Add similar tests for other routes/components
});
