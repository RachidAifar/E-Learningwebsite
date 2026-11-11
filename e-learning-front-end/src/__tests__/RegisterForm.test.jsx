import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Register from '../components/Authontication_Forms/Register_form';

jest.mock('axios');

function renderRegister() {
  const { container } = render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );
  return (name) => container.querySelector(`[name="${name}"]`);
}

function type(field, value) {
  fireEvent.change(field, { target: { name: field.name, value } });
}

beforeEach(() => axios.post.mockReset());

test('shows required-field errors and does not call the API when the form is empty', () => {
  renderRegister();

  fireEvent.click(screen.getByRole('button', { name: 'Register' }));

  expect(screen.getByText('Name is required')).toBeInTheDocument();
  expect(screen.getByText('Email is required')).toBeInTheDocument();
  expect(screen.getByText('Password is required')).toBeInTheDocument();
  expect(axios.post).not.toHaveBeenCalled();
});

test('rejects an invalid email, a short password and a non-numeric phone', () => {
  const field = renderRegister();

  type(field('student_fullname'), 'Anna Kovacs');
  type(field('email'), 'not-an-email');
  type(field('password'), 'short');
  type(field('mobile_phone'), 'abc');
  type(field('address'), 'Budapest');
  fireEvent.click(screen.getByRole('button', { name: 'Register' }));

  expect(screen.getByText('Email is invalid')).toBeInTheDocument();
  expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
  expect(screen.getByText('Mobile Phone is invalid')).toBeInTheDocument();
  expect(axios.post).not.toHaveBeenCalled();
});

test('submits valid data and shows a success message', async () => {
  axios.post.mockResolvedValue({ data: {} });
  const field = renderRegister();

  type(field('student_fullname'), 'Anna Kovacs');
  type(field('email'), 'anna@example.com');
  type(field('password'), 'Secret123!');
  type(field('mobile_phone'), '36301234567');
  type(field('address'), 'Budapest');
  fireEvent.click(screen.getByRole('button', { name: 'Register' }));

  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.post.mock.calls[0][1].get('email')).toBe('anna@example.com');
  expect(await screen.findByText('Thanks for registering!')).toBeInTheDocument();
});

test('shows an error message when registration fails on the server', async () => {
  axios.post.mockRejectedValue(new Error('Network Error'));
  const field = renderRegister();

  type(field('student_fullname'), 'Anna Kovacs');
  type(field('email'), 'anna@example.com');
  type(field('password'), 'Secret123!');
  type(field('mobile_phone'), '36301234567');
  type(field('address'), 'Budapest');
  fireEvent.click(screen.getByRole('button', { name: 'Register' }));

  expect(await screen.findByText('Something went wrong!!!')).toBeInTheDocument();
});
