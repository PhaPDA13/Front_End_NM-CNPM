import configureStore from 'redux-mock-store';
import { userLogin, userRegister } from './authSlice';
import axiosClient from '../../services/axiosClient';

// Mock axios client
jest.mock('../../services/axiosClient');

const mockStore = configureStore([]);

describe('Authentication Thunks - authSlice', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoading: false,
        accessToken: null,
      },
    });
    jest.clearAllMocks();
  });

  describe('userLogin Thunk', () => {
    test('Should handle successful login', async () => {
      const userData = {
        username: 'testuser',
        password: 'password123',
      };

      const mockResponse = {
        accessToken: 'test-token-123',
        user: {
          id: '1',
          username: 'testuser',
        },
      };

      axiosClient.post.mockResolvedValue(mockResponse);

      const dispatch = store.dispatch;
      const thunk = userLogin(userData);

      // Simulate the thunk
      const result = await thunk(dispatch, () => store.getState(), {});

      expect(axiosClient.post).toHaveBeenCalledWith('/user/login', userData);
      expect(result.payload).toEqual(mockResponse);
    });

    test('Should handle login with wrong password', async () => {
      const userData = {
        username: 'testuser',
        password: 'wrongpassword',
      };

      const mockError = {
        response: {
          data: {
            message: 'Mật khẩu không đúng',
          },
        },
      };

      axiosClient.post.mockRejectedValue(mockError);

      const dispatch = store.dispatch;
      const thunk = userLogin(userData);

      const result = await thunk(dispatch, () => store.getState(), {});

      expect(axiosClient.post).toHaveBeenCalledWith('/user/login', userData);
      expect(result.payload).toEqual(mockError.response.data);
    });

    test('Should handle login with non-existent user', async () => {
      const userData = {
        username: 'nonexistentuser',
        password: 'password123',
      };

      const mockError = {
        response: {
          data: {
            message: 'Người dùng không tồn tại',
          },
        },
      };

      axiosClient.post.mockRejectedValue(mockError);

      const dispatch = store.dispatch;
      const thunk = userLogin(userData);

      const result = await thunk(dispatch, () => store.getState(), {});

      expect(result.payload).toEqual(mockError.response.data);
    });

    test('Should handle network error during login', async () => {
      const userData = {
        username: 'testuser',
        password: 'password123',
      };

      const mockError = new Error('Network Error');

      axiosClient.post.mockRejectedValue(mockError);

      const dispatch = store.dispatch;
      const thunk = userLogin(userData);

      const result = await thunk(dispatch, () => store.getState(), {});

      expect(result.payload).toBeUndefined();
    });
  });

  describe('userRegister Thunk', () => {
    test('Should handle successful registration', async () => {
      const userData = {
        fullName: 'Nguyễn Văn A',
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const mockResponse = {
        id: '123',
        fullName: 'Nguyễn Văn A',
        username: 'newuser',
        email: 'newuser@example.com',
      };

      axiosClient.post.mockResolvedValue(mockResponse);

      const dispatch = store.dispatch;
      const thunk = userRegister(userData);

      const result = await thunk(dispatch, () => store.getState(), {});

      expect(axiosClient.post).toHaveBeenCalledWith('/user/', userData);
      expect(result.payload).toEqual(mockResponse);
    });

    test('Should handle duplicate username registration', async () => {
      const userData = {
        fullName: 'Nguyễn Văn B',
        username: 'existinguser',
        email: 'newuser@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const mockError = {
        response: {
          data: {
            error: {
              message: 'Username đã tồn tại',
            },
          },
        },
      };

      axiosClient.post.mockRejectedValue(mockError);

      const dispatch = store.dispatch;
      const thunk = userRegister(userData);

      const result = await thunk(dispatch, () => store.getState(), {});

      expect(result.payload).toBe('Username đã tồn tại');
    });

    test('Should handle duplicate email registration', async () => {
      const userData = {
        fullName: 'Nguyễn Văn C',
        username: 'newuser123',
        email: 'existing@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const mockError = {
        response: {
          data: {
            error: {
              message: 'Email đã tồn tại',
            },
          },
        },
      };

      axiosClient.post.mockRejectedValue(mockError);

      const dispatch = store.dispatch;
      const thunk = userRegister(userData);

      const result = await thunk(dispatch, () => store.getState(), {});

      expect(result.payload).toBe('Email đã tồn tại');
    });

    test('Should handle registration with generic error message', async () => {
      const userData = {
        fullName: 'Nguyễn Văn D',
        username: 'newuser456',
        email: 'newuser456@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const mockError = {
        response: {
          data: {
            error: {},
          },
        },
      };

      axiosClient.post.mockRejectedValue(mockError);

      const dispatch = store.dispatch;
      const thunk = userRegister(userData);

      const result = await thunk(dispatch, () => store.getState(), {});

      expect(result.payload).toBe('Error khi dang ky');
    });

    test('Should handle registration with no response error', async () => {
      const userData = {
        fullName: 'Nguyễn Văn E',
        username: 'newuser789',
        email: 'newuser789@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const mockError = new Error('Network Error');

      axiosClient.post.mockRejectedValue(mockError);

      const dispatch = store.dispatch;
      const thunk = userRegister(userData);

      const result = await thunk(dispatch, () => store.getState(), {});

      expect(result.payload).toBe('Error khi dang ky');
    });

    test('Should call API with correct endpoint and data', async () => {
      const userData = {
        fullName: 'Nguyễn Văn F',
        username: 'newuserapi',
        email: 'newuserapi@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      axiosClient.post.mockResolvedValue({ success: true });

      const dispatch = store.dispatch;
      const thunk = userRegister(userData);

      await thunk(dispatch, () => store.getState(), {});

      expect(axiosClient.post).toHaveBeenCalledWith('/user/', userData);
    });
  });
});
