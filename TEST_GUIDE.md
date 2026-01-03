# Unit Test Guide - Frontend Application

## Tổng Quan

Dự án đã được thiết lập với Jest cho unit testing. Bộ test bao gồm các trường hợp kiểm tra sau:

### 1. **Đăng Nhập (Sign In)**
   - ✅ Đăng nhập hợp lệ
   - ✅ Đăng nhập sai mật khẩu
   - ✅ Đăng nhập sai tên đăng nhập
   - ✅ Kiểm tra validation input

### 2. **Đăng Ký (Sign Up)**
   - ✅ Đăng ký tài khoản mới
   - ✅ Đăng ký trùng tài khoản
   - ✅ Kiểm tra validation email
   - ✅ Kiểm tra xác nhận mật khẩu

### 3. **Tiếp Nhận Đại Lý (Receive Agency)**
   - ✅ Tiếp nhận đại lý hợp lệ
   - ✅ Tiếp nhận đại lý thiếu thông tin
   - ✅ Kiểm tra validation số điện thoại
   - ✅ Kiểm tra validation email

## Cấu Trúc File Test

```
src/
├── features/
│   ├── Auth/
│   │   ├── SignIn/
│   │   │   └── SignIn.test.jsx        # Test component đăng nhập
│   │   ├── SignUp/
│   │   │   └── SignUp.test.jsx        # Test component đăng ký
│   │   ├── authSlice.test.js          # Test Redux logic
│   │   └── schema/
│   │       └── authSchema.test.js     # Test Yup validation schema
│   └── ReceiveAgency/
│       ├── ReceiveAgencyPage.test.jsx # Test component tiếp nhận đại lý
│       └── schema/
│           └── receiveAgencySchema.test.js # Test validation schema
└── test/
    └── setupTests.js                   # Jest setup file
```

## Cài Đặt Dependencies

```bash
npm install
```

## Chạy Test

### Chạy tất cả các test:
```bash
npm test
```

### Chạy test trong chế độ watch (tự động chạy lại khi file thay đổi):
```bash
npm run test:watch
```

### Chạy test với báo cáo coverage:
```bash
npm run test:coverage
```

### Chạy test cho một file cụ thể:
```bash
npm test -- SignIn.test.jsx
npm test -- authSchema.test.js
npm test -- receiveAgencySchema.test.js
```

### Chạy test với filter:
```bash
npm test -- --testNamePattern="đăng nhập"
npm test -- --testNamePattern="validation"
```

## Mô Tả Chi Tiết Các Test Case

### 1. Authentication Tests (authSchema.test.js)

#### SignIn Schema Validation
- **Username Validation**: Kiểm tra username trống, quá ngắn (< 4 kí tự), và hợp lệ
- **Password Validation**: Kiểm tra password trống, quá ngắn (< 8 kí tự), và hợp lệ
- **Trim Whitespace**: Kiểm tra loại bỏ khoảng trắng

#### SignUp Schema Validation
- **Full Name**: Kiểm tra trống, quá ngắn (< 2 kí tự), quá dài (> 100 kí tự)
- **Username**: Kiểm tra trống và hợp lệ
- **Email**: Kiểm tra trống, định dạng email không hợp lệ
- **Password**: Kiểm tra trống, quá ngắn (< 8 kí tự)
- **Confirm Password**: Kiểm tra trống và khớp với password

### 2. ReceiveAgency Schema Tests (receiveAgencySchema.test.js)

#### Required Fields
- **Name**: Kiểm tra bắt buộc
- **Agent Type**: Kiểm tra bắt buộc
- **Phone**: Kiểm tra định dạng (9-11 chữ số)
- **District**: Kiểm tra bắt buộc
- **Email**: Kiểm tra định dạng email
- **Address**: Kiểm tra bắt buộc

#### Phone Number Validation
- Chấp nhận 9-11 chữ số
- Từ chối chữ cái và ký tự đặc biệt
- Từ chối quá ngắn/quá dài

### 3. Component Tests

#### SignIn Component (SignIn.test.jsx)
- Render form đăng nhập
- Submit form với thông tin hợp lệ
- Xử lý lỗi đăng nhập

#### SignUp Component (SignUp.test.jsx)
- Render form đăng ký
- Fill form với dữ liệu hợp lệ
- Xử lý lỗi validation

#### ReceiveAgency Component (ReceiveAgencyPage.test.jsx)
- Load dữ liệu master (districts, agent types)
- Submit form với dữ liệu hợp lệ
- Xử lý lỗi validation

### 4. Redux Thunks Tests (authSlice.test.js)

#### User Login
- Đăng nhập thành công với token
- Xử lý sai mật khẩu
- Xử lý người dùng không tồn tại
- Xử lý lỗi mạng

#### User Register
- Đăng ký thành công
- Xử lý duplicate username
- Xử lý duplicate email
- Xử lý lỗi khác

## Kết Quả Mong Đợi

Khi chạy `npm test`, bạn sẽ thấy:

```
PASS  src/features/Auth/schema/authSchema.test.js
  SignIn Schema Validation Tests
    Username Validation
      ✓ Should reject empty username
      ✓ Should reject username with less than 4 characters
      ✓ Should accept valid username
      ✓ Should trim whitespace from username
    Password Validation
      ✓ Should reject empty password
      ✓ Should reject password with less than 8 characters
      ✓ Should accept valid password

PASS  src/features/Auth/schema/authSchema.test.js
  SignUp Schema Validation Tests
    ...

PASS  src/features/ReceiveAgency/schema/receiveAgencySchema.test.js
  ReceiveAgency Schema Validation Tests
    ...

Test Suites: 7 passed, 7 total
Tests:       100+ passed, 100+ total
```

## Troubleshooting

### Problem: Jest không tìm thấy modules
**Solution**: Đảm bảo tất cả packages đã được cài đặt:
```bash
npm install
```

### Problem: Tests fail vì missing dependencies
**Solution**: Kiểm tra jest.config.js và cấu hình moduleNameMapper

### Problem: Cannot find module '@testing-library/react'
**Solution**: Cài đặt lại dependencies:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

## Best Practices

1. **Tên Test Rõ Ràng**: Mỗi test nên có tên mô tả chính xác những gì được kiểm tra
2. **Arrange-Act-Assert Pattern**: 
   - Arrange: Chuẩn bị dữ liệu và mock
   - Act: Thực hiện action
   - Assert: Kiểm tra kết quả

3. **Mock External Dependencies**: Mock API calls và external services
4. **Test Isolation**: Mỗi test độc lập và không phụ thuộc vào test khác
5. **Coverage**: Cố gắng đạt ít nhất 80% code coverage

## Thêm Test Mới

Để thêm test mới, tạo file `.test.js` hoặc `.test.jsx` trong cùng folder với component/module cần test:

```javascript
describe('Feature Name', () => {
  test('Should do something', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = myFunction(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

## References

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Yup Documentation](https://github.com/jquense/yup)
- [Redux Mock Store](https://github.com/dmitry-zaets/redux-mock-store)

## Liên Hệ

Nếu có câu hỏi hoặc vấn đề, vui lòng liên hệ với team development.
