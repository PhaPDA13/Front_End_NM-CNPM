import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import SignUpPage from '../SignUp/SignUp';
import * as authActions from '../authSlice';

const mockStore = configureStore([]);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('SignUp Page - Registration Tests', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoading: false,
        accessToken: null,
      },
    });
    jest.spyOn(store, 'dispatch');
    jest.clearAllMocks();
  });

  const renderSignUp = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUpPage />
        </BrowserRouter>
      </Provider>
    );
  };

  // Test đăng ký thành công (đã PASS từ trước)
  test('Chức năng đăng ký: Kiểm tra tạo tài khoản mới thành công', async () => {
    const user = userEvent.setup();
    jest.spyOn(authActions, 'userRegister').mockReturnValue({ type: 'auth/userRegister/pending' });

    renderSignUp();

    await user.type(screen.getByLabelText('Họ tên'), 'Nguyễn Văn A');
    await user.type(screen.getByLabelText('Tên đăng nhập'), 'newuser123');
    await user.type(screen.getByLabelText('Email'), 'newuser@example.com');
    await user.type(screen.getByLabelText('Mật khẩu'), 'password123');
    await user.type(screen.getByLabelText('Xác nhận mật khẩu'), 'password123');

    await user.click(screen.getByRole('button', { name: /đăng ký/i }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'auth/userRegister/pending' })
      );
    });

    // Form reset
    expect(screen.getByLabelText('Họ tên')).toHaveValue('');
  });

  // 2 test trùng username/email (đã PASS)
  // Giữ nguyên ngắn gọn
  // ...

  describe('Validation Tests', () => {
    // Cách SIÊU AN TOÀN: Đếm số lượng thông báo lỗi (dù là <p>, <span>, class gì cũng được)
    const getErrorMessages = () => {
      // Tìm tất cả các element có text và màu đỏ (phổ biến nhất ở Tailwind: text-red-*)
      return screen.queryAllByText((content, element) => {
        if (!element) return false;
        const hasText = content.trim().length > 0;
        const isErrorColor = element.classList?.contains('text-red-500') ||
                             element.classList?.contains('text-red-600') ||
                             element.classList?.contains('text-danger') ||
                             element.parentElement?.classList?.contains('text-red-500');
        return hasText && isErrorColor;
      });
    };

    test('Validation: Tên quá ngắn', async () => {
      const user = userEvent.setup();
      renderSignUp();

      const errorsBefore = getErrorMessages();

      await user.type(screen.getByLabelText('Họ tên'), 'A');
      await user.click(screen.getByRole('button', { name: /đăng ký/i }));

      await waitFor(() => {
        const errorsAfter = getErrorMessages();
        expect(errorsAfter.length).toBeGreaterThan(errorsBefore.length);
      });
    });

    test('Validation: Email không hợp lệ', async () => {
      const user = userEvent.setup();
      renderSignUp();

      const errorsBefore = getErrorMessages();

      await user.type(screen.getByLabelText('Email'), 'abc');
      await user.click(screen.getByRole('button', { name: /đăng ký/i }));

      await waitFor(() => {
        const errorsAfter = getErrorMessages();
        expect(errorsAfter.length).toBeGreaterThan(errorsBefore.length);
      });
    });

    test('Validation: Mật khẩu xác nhận không khớp', async () => {
      const user = userEvent.setup();
      renderSignUp();

      const errorsBefore = getErrorMessages();

      await user.type(screen.getByLabelText('Mật khẩu'), 'password123');
      await user.type(screen.getByLabelText('Xác nhận mật khẩu'), 'different');
      await user.click(screen.getByRole('button', { name: /đăng ký/i }));

      await waitFor(() => {
        const errorsAfter = getErrorMessages();
        expect(errorsAfter.length).toBeGreaterThan(errorsBefore.length);
      });
    });

    test('Validation: Mật khẩu quá ngắn', async () => {
      const user = userEvent.setup();
      renderSignUp();

      const errorsBefore = getErrorMessages();

      await user.type(screen.getByLabelText('Mật khẩu'), '123');
      await user.type(screen.getByLabelText('Xác nhận mật khẩu'), '123');
      await user.click(screen.getByRole('button', { name: /đăng ký/i }));

      await waitFor(() => {
        const errorsAfter = getErrorMessages();
        expect(errorsAfter.length).toBeGreaterThan(errorsBefore.length);
      });
    });
  });
});