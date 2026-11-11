import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Login from '../components/Authontication_Forms/Login_form';

jest.mock('axios');

function renderLogin() {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
}

function fillAndSubmit(email, password) {
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { name: 'email', value: email } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { name: 'password', value: password } });
  fireEvent.click(screen.getByRole('button', { name: 'Login' }));
}

beforeEach(() => {
  localStorage.clear();
  axios.post.mockReset();
});

test('sends the email and password to the student login endpoint', async () => {
  axios.post.mockResolvedValue({ data: { bool: false } });
  renderLogin();

  fillAndSubmit('anna@example.com', 'Secret123!');

  expect(axios.post).toHaveBeenCalledTimes(1);
  const [url, formData] = axios.post.mock.calls[0];
  expect(url).toBe('http://127.0.0.1:8000/api/student_login');
  expect(formData.get('email')).toBe('anna@example.com');
  expect(formData.get('password')).toBe('Secret123!');
  await screen.findByText('Invalid email or password');
});

test('shows an error when the server cannot be reached', async () => {
  axios.post.mockRejectedValue(new Error('Network Error'));
  renderLogin();

  fillAndSubmit('anna@example.com', 'Secret123!');

  expect(await screen.findByText('Could not reach the server. Please try again.')).toBeInTheDocument();
});
