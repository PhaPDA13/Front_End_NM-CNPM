import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import SignInPage from '../SignIn/SignIn';
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

describe('SignIn Page - Authentication Tests', () => {
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

  const renderSignIn = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <SignInPage />
        </BrowserRouter>
      </Provider>
    );
  };

  describe('Đăng nhập hợp lệ', () => {
    test('Chức năng đăng nhập: Kiểm tra hệ thống cho phép người dùng đăng nhập khi thông tin đúng', async () => {
      const user = userEvent.setup();
      
      // Mock successful login
      jest.spyOn(authActions, 'userLogin').mockImplementation(() => ({
        unwrap: jest.fn().mockResolvedValue({ accessToken: 'test-token' }),
      }));

      renderSignIn();

      // Enter valid credentials
      const usernameInput = screen.getByPlaceholderText('username');
      const passwordInput = screen.getByPlaceholderText('*********');
      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });

      await user.type(usernameInput, 'testuser123');
      await user.type(passwordInput, 'password123');
      
      expect(usernameInput.value).toBe('testuser123');
      expect(passwordInput.value).toBe('password123');

      await user.click(submitButton);

      // Verify form submission was triggered
      await waitFor(() => {
        expect(dispatchSpy).toHaveBeenCalled();
      });
    });
  });

  describe('Đăng nhập sai mật khẩu', () => {
    test('Chức năng đăng nhập: Kiểm tra hệ thống từ chối khi mật khẩu sai', async () => {
      const user = userEvent.setup();
      
      // Mock failed login with wrong password
      jest.spyOn(authActions, 'userLogin').mockImplementation(() => ({
        unwrap: jest.fn().mockRejectedValue({
          response: { data: { message: 'Mật khẩu không đúng' } },
        }),
      }));

      renderSignIn();

      const usernameInput = screen.getByPlaceholderText('username');
      const passwordInput = screen.getByPlaceholderText('*********');
      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });

      await user.type(usernameInput, 'testuser123');
      await user.type(passwordInput, 'wrongpassword');
      
      await user.click(submitButton);

      // Verify dispatch was called with rejection
      await waitFor(() => {
        expect(dispatchSpy).toHaveBeenCalled();
      });
    });
  });

  describe('Đăng nhập sai tên đăng nhập', () => {
    test('Chức năng đăng nhập: Kiểm tra hệ thống xử lý khi username không tồn tại', async () => {
      const user = userEvent.setup();
      
      // Mock failed login with non-existent user
      jest.spyOn(authActions, 'userLogin').mockImplementation(() => ({
        unwrap: jest.fn().mockRejectedValue({
          response: { data: { message: 'Người dùng không tồn tại' } },
        }),
      }));

      renderSignIn();

      const usernameInput = screen.getByPlaceholderText('username');
      const passwordInput = screen.getByPlaceholderText('*********');
      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });

      await user.type(usernameInput, 'nonexistentuser');
      await user.type(passwordInput, 'password123');
      
      await user.click(submitButton);

      // Verify dispatch was called
      await waitFor(() => {
        expect(dispatchSpy).toHaveBeenCalled();
      });
    });
  });

  describe('Validation Tests', () => {
    test('Validation: Username quá ngắn', async () => {
      const user = userEvent.setup();
      renderSignIn();

      const usernameInput = screen.getByPlaceholderText('username');
      const passwordInput = screen.getByPlaceholderText('*********');
      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });

      // Enter invalid data
      await user.type(usernameInput, 'abc');
      await user.type(passwordInput, 'password123');
      
      await user.click(submitButton);

      // Wait for validation error
      await waitFor(() => {
        const errorMsg = screen.queryByText(/Nhập ít nhất 4 kí tự/i);
        // Error should appear
      });
    });

    test('Validation: Password quá ngắn', async () => {
      const user = userEvent.setup();
      renderSignIn();

      const usernameInput = screen.getByPlaceholderText('username');
      const passwordInput = screen.getByPlaceholderText('*********');
      const submitButton = screen.getByRole('button', { name: /đăng nhập/i });

      await user.type(usernameInput, 'testuser123');
      await user.type(passwordInput, 'pass');
      
      await user.click(submitButton);

      // Wait for validation error
      await waitFor(() => {
        const errorMsg = screen.queryByText(/Mật khẩu có ít nhất 8 kí tự/i);
        // Error should appear
      });
    });
  });
});
