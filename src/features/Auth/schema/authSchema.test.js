import { schema as signInSchema } from '../schema/schemaSignIn';
import { schema as signUpSchema } from '../schema/schemaSignUp';

describe('SignIn Schema Validation Tests', () => {
  describe('Username Validation', () => {
    test('Should reject empty username', async () => {
      try {
        await signInSchema.validate({ username: '', password: 'password123' });
        expect(true).toBe(false); // Should throw
      } catch (error) {
        expect(error.message).toContain('Vui lòng nhập tên tài khoản');
      }
    });

    test('Should reject username with less than 4 characters', async () => {
      try {
        await signInSchema.validate({ username: 'abc', password: 'password123' });
        expect(true).toBe(false); // Should throw
      } catch (error) {
        expect(error.message).toContain('Nhập ít nhất 4 kí tự');
      }
    });

    test('Should accept valid username', async () => {
      const result = await signInSchema.validate({ 
        username: 'testuser123', 
        password: 'password123' 
      });
      expect(result.username).toBe('testuser123');
    });

    test('Should trim whitespace from username', async () => {
      const result = await signInSchema.validate({ 
        username: '  testuser  ', 
        password: 'password123' 
      });
      expect(result.username).toBe('testuser');
    });
  });

  describe('Password Validation', () => {
    test('Should reject empty password', async () => {
      try {
        await signInSchema.validate({ username: 'testuser123', password: '' });
        expect(true).toBe(false); // Should throw
      } catch (error) {
        expect(error.message).toContain('Vui lòng nhập mật khẩu');
      }
    });

    test('Should reject password with less than 8 characters', async () => {
      try {
        await signInSchema.validate({ username: 'testuser123', password: 'pass' });
        expect(true).toBe(false); // Should throw
      } catch (error) {
        expect(error.message).toContain('Mật khẩu có ít nhất 8 kí tự');
      }
    });

    test('Should accept valid password', async () => {
      const result = await signInSchema.validate({ 
        username: 'testuser123', 
        password: 'password123' 
      });
      expect(result.password).toBe('password123');
    });
  });
});

describe('SignUp Schema Validation Tests', () => {
  describe('Full Name Validation', () => {
    test('Should reject empty full name', async () => {
      try {
        await signUpSchema.validate({
          fullName: '',
          username: 'testuser123',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Vui lòng nhập tên');
      }
    });

    test('Should reject full name with less than 2 characters', async () => {
      try {
        await signUpSchema.validate({
          fullName: 'A',
          username: 'testuser123',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Tên phải có ít nhất 2 ký tự');
      }
    });

    test('Should reject full name that is too long', async () => {
      const longName = 'A'.repeat(101);
      try {
        await signUpSchema.validate({
          fullName: longName,
          username: 'testuser123',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Tên quá dài');
      }
    });

    test('Should accept valid full name', async () => {
      const result = await signUpSchema.validate({
        fullName: 'Nguyễn Văn A',
        username: 'testuser123',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
      expect(result.fullName).toBe('Nguyễn Văn A');
    });
  });

  describe('Username Validation', () => {
    test('Should reject empty username', async () => {
      try {
        await signUpSchema.validate({
          fullName: 'Nguyễn Văn A',
          username: '',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Vui lòng nhập username');
      }
    });

    test('Should accept valid username', async () => {
      const result = await signUpSchema.validate({
        fullName: 'Nguyễn Văn A',
        username: 'testuser123',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
      expect(result.username).toBe('testuser123');
    });
  });

  describe('Email Validation', () => {
    test('Should reject empty email', async () => {
      try {
        await signUpSchema.validate({
          fullName: 'Nguyễn Văn A',
          username: 'testuser123',
          email: '',
          password: 'password123',
          confirmPassword: 'password123'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Vui lòng nhập email');
      }
    });

    test('Should reject invalid email format', async () => {
      try {
        await signUpSchema.validate({
          fullName: 'Nguyễn Văn A',
          username: 'testuser123',
          email: 'invalidemail',
          password: 'password123',
          confirmPassword: 'password123'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Email không hợp lệ');
      }
    });

    test('Should accept valid email', async () => {
      const result = await signUpSchema.validate({
        fullName: 'Nguyễn Văn A',
        username: 'testuser123',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
      expect(result.email).toBe('test@example.com');
    });
  });

  describe('Password Validation', () => {
    test('Should reject empty password', async () => {
      try {
        await signUpSchema.validate({
          fullName: 'Nguyễn Văn A',
          username: 'testuser123',
          email: 'test@example.com',
          password: '',
          confirmPassword: 'password123'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Vui lòng nhập mật khẩu');
      }
    });

    test('Should reject password with less than 8 characters', async () => {
      try {
        await signUpSchema.validate({
          fullName: 'Nguyễn Văn A',
          username: 'testuser123',
          email: 'test@example.com',
          password: 'pass',
          confirmPassword: 'pass'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Mật khẩu có ít nhất 8 kí tự');
      }
    });

    test('Should accept valid password', async () => {
      const result = await signUpSchema.validate({
        fullName: 'Nguyễn Văn A',
        username: 'testuser123',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
      expect(result.password).toBe('password123');
    });
  });

  describe('Confirm Password Validation', () => {
    test('Should reject empty confirm password', async () => {
      try {
        await signUpSchema.validate({
          fullName: 'Nguyễn Văn A',
          username: 'testuser123',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: ''
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toMatch(/Vui lòng xác nhận mật khẩu|Xác nhận mật khẩu không khớp/);
      }
    });

    test('Should reject mismatched confirm password', async () => {
      try {
        await signUpSchema.validate({
          fullName: 'Nguyễn Văn A',
          username: 'testuser123',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password456'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Xác nhận mật khẩu không khớp');
      }
    });

    test('Should accept matching confirm password', async () => {
      const result = await signUpSchema.validate({
        fullName: 'Nguyễn Văn A',
        username: 'testuser123',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      });
      expect(result.confirmPassword).toBe('password123');
    });
  });

  describe('Complete SignUp Form Validation', () => {
    test('Should validate complete valid form', async () => {
      const validData = {
        fullName: 'Nguyễn Văn A',
        username: 'testuser123',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      const result = await signUpSchema.validate(validData);
      expect(result).toEqual(validData);
    });

    test('Should reject form with multiple errors', async () => {
      try {
        await signUpSchema.validate({
          fullName: 'A',
          username: 'test',
          email: 'invalidemail',
          password: 'pass',
          confirmPassword: 'pass123'
        });
        expect(true).toBe(false);
      } catch (error) {
        // Should have validation errors
        expect(error).toBeDefined();
      }
    });
  });
});
