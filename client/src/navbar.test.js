import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import NavbarComponent from './views/navbar';

// describe('NavbarComponent', () => {
//   test('renders NavbarComponent with correct links when user is authenticated', async () => {
//     // Mocking localStorage to simulate an authenticated user
//     jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce('mocked-token');

//     render(<NavbarComponent />);

//     expect(screen.getByText('SPECIAL OFFERS')).toBeInTheDocument();
//     expect(screen.getByText('ROOMS')).toBeInTheDocument();
//     expect(screen.getByText('DINING')).toBeInTheDocument();
//     expect(screen.getByText('FACILITIES')).toBeInTheDocument();
//     expect(screen.getByText('MEETINGS & EVENTS')).toBeInTheDocument();
//     fireEvent.click(screen.getByRole('drop-down'));

    

//     await waitFor(() => {
//       expect(screen.getByRole("view-bookings")).toBeInTheDocument();
//     });

//     // Using waitFor to wait for asynchronous rendering of "Log out" in the dropdown
//     await waitFor(() => {
//       expect(screen.getByText('Log out')).toBeInTheDocument();
//     });
//     // Using waitFor to wait for asynchronous rendering of "View Bookings"
//   });
//   test('renders NavbarComponent with correct links when user is not authenticated', () => {
//     // Mocking localStorage to simulate an unauthenticated user
//     jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce(null);

//     render(<NavbarComponent />);

//     expect(screen.getByText('SPECIAL OFFERS')).toBeInTheDocument();
//     expect(screen.getByText('ROOMS')).toBeInTheDocument();
//     expect(screen.getByText('DINING')).toBeInTheDocument();
//     expect(screen.getByText('FACILITIES')).toBeInTheDocument();
//     expect(screen.getByText('MEETINGS & EVENTS')).toBeInTheDocument();
//     fireEvent.click(screen.getByRole('drop-down'));

//     expect(screen.getByRole('login')).toBeInTheDocument();
//     expect(screen.getByText('Join Member')).toBeInTheDocument();
//   });
 
  

// })

describe('NavbarComponent', () => {
  it('renders without crashing', () => {
    const { getByRole } = render(<NavbarComponent />);
    expect(getByRole('drop-down')).toBeInTheDocument();
  });

  it('displays login link when not authenticated', async () => {
    window.localStorage.removeItem('token');
    const { getByRole, rerender } = render(<NavbarComponent />);
    rerender(<NavbarComponent />);
    
    // Click on the dropdown
    fireEvent.click(getByRole('drop-down'));
  
    // Now the dropdown is open and we can query within it
    const dropdownMenu = within(getByRole('drop-down'));
    expect(dropdownMenu.getByRole('login')).toBeInTheDocument();
  });
  

  it('displays logout link when authenticated', () => {
    window.localStorage.setItem('token', 'testToken');
    const { getByText } = render(<NavbarComponent />);
    expect(getByText('Log out')).toBeInTheDocument();
  });

  it('logs out when logout link is clicked', () => {
    window.localStorage.setItem('token', 'testToken');
    const { getByText } = render(<NavbarComponent />);
    fireEvent.click(getByText('Log out'));
    expect(window.localStorage.getItem('token')).toBeNull();
  });
});