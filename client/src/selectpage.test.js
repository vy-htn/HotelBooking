import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Availability from './views/selectpage';

describe('Availability Component', () => {
    
  test('renders with default room and guest values', () => {
    const { getByText, getByLabelText } = render(<Availability />);

    expect(getByText('1 Room, 1 Guest(s)')).toBeInTheDocument();
    expect(getByLabelText('Promo Code:')).toBeInTheDocument();

    // Simulate a click on the "Select rooms and guests" paragraph to display the guests div
    fireEvent.click(getByText('1 Room, 1 Guest(s)'));

    // Check if the guests div is displayed correctly
    expect(getByText('Room 1:')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument(); // Number of adults in Room 1
    expect(getByText('0')).toBeInTheDocument(); // Number of children in Room 1
  });

  // Add more tests for different scenarios or functionalities
});

describe('Availability Component', () => {
  test('changes date range when DateRangePicker is used', async () => {
    render(<Availability />);
    
    // Simulate selecting a new date range
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    fireEvent.change(screen.getByRole('datepicker-start-date'), { target: { value: startDate } });
    fireEvent.change(screen.getByRole('datepicker-end-date'), { target: { value: endDate } });

    // Assertions to check if the date range is updated
    await waitFor(() => {
      expect(screen.getByText(/Check-in Date/i)).toHaveTextContent(startDate.toLocaleDateString());
      expect(screen.getByText(/Check-out Date/i)).toHaveTextContent(endDate.toLocaleDateString());
    });
  });

  test('adds a room when "Add additional room" button is clicked', () => {
    render(<Availability />);
    
    // Simulate clicking on the "Add additional room" button
    fireEvent.click(screen.getByRole('button', { name: 'Add additional room' }));

    // Assertions to check if a new room is added
    expect(screen.getAllByLabelText(/Room \d:/)).toHaveLength(2);
  });

  test('deletes a room when "Delete" button is clicked', () => {
    render(<Availability />);
    
    // Simulate clicking on the "Delete" button for a room
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    // Assertions to check if the room is deleted
    expect(screen.queryByLabelText(/Room \d:/)).toBeNull();
  });

  test('updates the number of adults and children when buttons are clicked', () => {
    render(<Availability />);
    
    // Simulate clicking on the buttons to update the number of adults and children
    fireEvent.click(screen.getByText('Room 1:'));
    fireEvent.click(screen.getByLabelText('Decrease adults'));
    fireEvent.click(screen.getByLabelText('Increase children'));

    // Assertions to check if the number of adults and children is updated
    expect(screen.getByLabelText('Adults in Room 1:')).toHaveTextContent('0');
    expect(screen.getByLabelText('Children in Room 1:')).toHaveTextContent('1');
  });

  // Add more test cases as needed for other functionalities

});