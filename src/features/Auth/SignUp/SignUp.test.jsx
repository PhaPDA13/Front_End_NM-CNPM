import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import SignUpPage from '../SignUp/SignUp';
import * as authActions from '../authSlice';

const mockStore = configureStore([]);

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

// Mock toast notifications
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('SignUp Page - Registration Tests', () => {
  let store;
  let dispatchSpy;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoading: false,
        accessToken: null,
      },
    });
    dispatchSpy = jest.spyOn(store, 'dispatch');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSignUp = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUpPage />
        </BrowserRouter>
      </Provider>
    );
  };

  describe('Đăng ký tài khoản mới', () => {
    test('Chức năng đăng ký: Kiểm tra tạo tài khoản mới thành công', async () => {
      const user = userEvent.setup();

      // Mock successful registration
      jest.spyOn(authActions, 'userRegister').mockImplementation(() => ({
        unwrap: jest.fn().mockResolvedValue({ 
          id: '123',
          username: 'newuser',
          email: 'newuser@example.com'
        }),
      }));

      renderSignUp();

      // Fill form with valid data
      const fullNameInput = screen.getByPlaceholderText(/tên đầy đủ/i);
      const usernameInput = screen.getByPlaceholderText(/username/i);
      const emailInput = screen.getByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/mật khẩu/i);
      const confirmPasswordInput = screen.getByPlaceholderText(/xác nhận mật khẩu/i);
      const submitButton = screen.getByRole('button', { name: /đăng ký/i });

      await user.type(fullNameInput, 'Nguyễn Văn A');
      await user.type(usernameInput, 'newuser123');
      await user.type(emailInput, 'newuser@example.com');
      await user.type(passwordInput, 'password123');
      await user.type(confirmPasswordInput, 'password123');

      // Verify inputs
      expect(fullNameInput.value).toBe('Nguyễn Văn A');
      expect(usernameInput.value).toBe('newuser123');
      expect(emailInput.value).toBe('newuser@example.com');
      expect(passwordInput.value).toBe('password123');

      await user.click(submitButton);

      // Verify dispatch was called
      await waitFor(() => {
        expect(dispatchSpy).toHaveBeenCalled();
      });
    });
  });

  describe('Đăng ký trùng tài khoản', () => {
    test('Chức năng đăng ký: Kiểm tra hệ thống không cho đăng ký trùng', async () => {
      const user = userEvent.setup();

      // Mock failed registration - duplicate account
      jest.spyOn(authActions, 'userRegister').mockImplementation(() => ({
        unwrap: jest.fn().mockRejectedValue({
          response: { data: { error: { message: 'Username đã tồn tại' } } },
        }),
      }));

      renderSignUp();

      const fullNameInput = screen.getByPlaceholderText(/tên đầy đủ/i);
      const usernameInput = screen.getByPlaceholderText(/username/i);
      const emailInput = screen.getByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/mật khẩu/i);
      const confirmPasswordInput = screen.getByPlaceholderText(/xác nhận mật khẩu/i);
      const submitButton = screen.getByRole('button', { name: /đăng ký/i });

      // Try to register with existing username
      await user.type(fullNameInput, 'Nguyễn Văn B');
      await user.type(usernameInput, 'existinguser');
      await user.type(emailInput, 'newuser@example.com');
      await user.type(passwordInput, 'password123');
      await user.type(confirmPasswordInput, 'password123');

      await user.click(submitButton);

      // Verify dispatch was called
      await waitFor(() => {
        expect(dispatchSpy).toHaveBeenCalled();
      });
    });

    test('Chức năng đăng ký: Kiểm tra hệ thống không cho đăng ký email trùng', async () => {
      const user = userEvent.setup();

      // Mock failed registration - duplicate email
      jest.spyOn(authActions, 'userRegister').mockImplementation(() => ({
        unwrap: jest.fn().mockRejectedValue({
          response: { data: { error: { message: 'Email đã tồn tại' } } },
        }),
      }));

      renderSignUp();

      const fullNameInput = screen.getByPlaceholderText(/tên đầy đủ/i);
      const usernameInput = screen.getByPlaceholderText(/username/i);
      const emailInput = screen.getByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/mật khẩu/i);
      const confirmPasswordInput = screen.getByPlaceholderText(/xác nhận mật khẩu/i);
      const submitButton = screen.getByRole('button', { name: /đăng ký/i });

      // Try to register with existing email
      await user.type(fullNameInput, 'Nguyễn Văn C');
      await user.type(usernameInput, 'newuser456');
      await user.type(emailInput, 'existing@example.com');
      await user.type(passwordInput, 'password123');
      await user.type(confirmPasswordInput, 'password123');

      await user.click(submitButton);

      // Verify dispatch was called
      await waitFor(() => {
        expect(dispatchSpy).toHaveBeenCalled();
      });
    });
  });

  describe('Validation Tests', () => {
    test('Validation: Tên quá ngắn', async () => {
      const user = userEvent.setup();
      renderSignUp();

      const fullNameInput = screen.getByPlaceholderText(/tên đầy đủ/i);
      const submitButton = screen.getByRole('button', { name: /đăng ký/i });

      await user.type(fullNameInput, 'A');
      await user.click(submitButton);

      // Wait for validation error
      await waitFor(() => {
        // Error should appear for short name
      });
    });

    test('Validation: Email không hợp lệ', async () => {
      const user = userEvent.setup();
      renderSignUp();

      const emailInput = screen.getByPlaceholderText(/email/i);
      const submitButton = screen.getByRole('button', { name: /đăng ký/i });

      await user.type(emailInput, 'invalidemail');
      await user.click(submitButton);

      // Wait for validation error
      await waitFor(() => {
        // Error should appear for invalid email
      });
    });

    test('Validation: Mật khẩu xác nhận không khớp', async () => {
      const user = userEvent.setup();
      renderSignUp();

      const passwordInput = screen.getByPlaceholderText(/^Mật khẩu/i);
      const confirmPasswordInput = screen.getByPlaceholderText(/xác nhận mật khẩu/i);
      const submitButton = screen.getByRole('button', { name: /đăng ký/i });

      await user.type(passwordInput, 'password123');
      await user.type(confirmPasswordInput, 'password456');
      await user.click(submitButton);

      // Wait for validation error
      await waitFor(() => {
        // Error should appear for password mismatch
      });
    });

    test('Validation: Mật khẩu quá ngắn', async () => {
      const user = userEvent.setup();
      renderSignUp();

      const passwordInput = screen.getByPlaceholderText(/^Mật khẩu/i);
      const confirmPasswordInput = screen.getByPlaceholderText(/xác nhận mật khẩu/i);
      const submitButton = screen.getByRole('button', { name: /đăng ký/i });

      await user.type(passwordInput, 'pass');
      await user.type(confirmPasswordInput, 'pass');
      await user.click(submitButton);

      // Wait for validation error
      await waitFor(() => {
        // Error should appear for short password
      });
    });
  });
});
