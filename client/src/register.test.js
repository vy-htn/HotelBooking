import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './views/register';

describe('RegisterForm component', () => {
  it('renders without crashing', () => {
    render(<RegisterForm />);
  });

  it('should validate and display error messages for empty fields', async () => {
    const { getByText, getByPlaceholderText } = render(<RegisterForm />);
    
    fireEvent.click(getByText('BECOME A MEMBER'));

    // Check for error messages related to empty fields
    expect(getByText('First name is required')).toBeInTheDocument();
    expect(getByText('Last name is required')).toBeInTheDocument();
    expect(getByText('Email is required')).toBeInTheDocument();
    expect(getByText('Phone number is required')).toBeInTheDocument();
    expect(getByText('Password is required')).toBeInTheDocument();
    expect(getByText('Confirm password is required')).toBeInTheDocument();
  });

  it('should validate and display error messages for invalid email and phone', async () => {
    const { getByText, getByPlaceholderText } = render(<RegisterForm />);

    // Set invalid email and phone values
    fireEvent.change(getByPlaceholderText('email'), { target: { value: 'invalidemail' } });
    fireEvent.change(getByPlaceholderText('phone'), { target: { value: '123' } });

    fireEvent.click(getByText('BECOME A MEMBER'));

    // Check for error messages related to invalid email and phone
    expect(getByText('Email is not valid')).toBeInTheDocument();
    expect(getByText('Phone number is not valid')).toBeInTheDocument();
  });

  it('should validate and display error message for password mismatch', async () => {
    const { getByText, getByPlaceholderText } = render(<RegisterForm />);

    // Set password and confirm password values that do not match
    fireEvent.change(getByPlaceholderText('password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('confirm password'), { target: { value: 'password456' } });

    fireEvent.click(getByText('BECOME A MEMBER'));

    // Check for error message related to password mismatch
    expect(getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('should display success message when registration is successful', async () => {
    // Mock the fetch function to return a successful response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({}),
    });
    
    const { getByText, getByPlaceholderText } = render(<RegisterForm />);

    // Set valid input values
    fireEvent.change(getByPlaceholderText('firstname'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('lastname'), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText('email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByPlaceholderText('phone'), { target: { value: '1234567890' } });
    fireEvent.change(getByPlaceholderText('password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('confirm password'), { target: { value: 'password123' } });

    fireEvent.click(getByText('BECOME A MEMBER'));

    // Wait for the success message
    await waitFor(() => expect(getByText('Member Registered Successfully')).toBeInTheDocument());

    // Restore the original fetch function
    global.fetch.mockRestore();
  });
  global.alert = jest.fn();

  it('should display error message when registration fails', async () => {
    // Mock the fetch function to return a failed response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
    });

    const { getByText, getByPlaceholderText } = render(<RegisterForm />);

    // Set valid input values
    fireEvent.change(getByPlaceholderText('firstname'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('lastname'), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText('email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByPlaceholderText('phone'), { target: { value: '1234567890' } });
    fireEvent.change(getByPlaceholderText('password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('confirm password'), { target: { value: 'password123' } });

    fireEvent.click(getByText('BECOME A MEMBER'));

    // Wait for the error message
    // await waitFor(() => expect(getByText('Registration failed. Please try again.')).toBeInTheDocument());
    await waitFor(() =>expect(global.alert).toHaveBeenCalledWith('Registration failed. Please try again.'));

    // Restore the original fetch function
    global.fetch.mockRestore();
  });
});
