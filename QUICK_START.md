# Quick Start - Unit Testing

## 🚀 Bắt Đầu Nhanh

### Step 1: Cài Đặt Dependencies
```bash
npm install
```

### Step 2: Chạy Tất Cả Tests
```bash
npm test
```

### Step 3: Xem Kết Quả
Bạn sẽ thấy output tương tự:
```
PASS  src/features/Auth/schema/authSchema.test.js
PASS  src/features/Auth/SignIn/SignIn.test.jsx
PASS  src/features/Auth/SignUp/SignUp.test.jsx
PASS  src/features/Auth/authSlice.test.js
PASS  src/features/ReceiveAgency/ReceiveAgencyPage.test.jsx
PASS  src/features/ReceiveAgency/schema/receiveAgencySchema.test.js

Test Suites: 6 passed, 6 total
Tests:       84+ passed, 84+ total
```

---

## 📋 Test Cases Covered

### ✅ Chức Năng Đăng Nhập
- [x] Đăng nhập hợp lệ - Kiểm tra hệ thống cho phép đăng nhập khi thông tin đúng
- [x] Đăng nhập sai mật khẩu - Kiểm tra hệ thống từ chối khi mật khẩu sai
- [x] Đăng nhập sai tên đăng nhập - Kiểm tra hệ thống xử lý khi username không tồn tại

### ✅ Chức Năng Đăng Ký
- [x] Đăng ký tài khoản mới - Kiểm tra tạo tài khoản mới thành công
- [x] Đăng ký trùng tài khoản - Kiểm tra hệ thống không cho đăng ký trùng

### ✅ Chức Năng Tiếp Nhận Đại Lý
- [x] Tiếp nhận đại lý hợp lệ - Kiểm tra thêm đại lý mới thành công
- [x] Tiếp nhận đại lý thiếu thông tin - Kiểm tra ràng buộc dữ liệu bắt buộc

---

## 📊 Chế Độ Chạy Test

### 1️⃣ Normal Mode (Chạy 1 lần)
```bash
npm test
```
✅ Phù hợp: Kiểm tra code trước khi commit

### 2️⃣ Watch Mode (Tự động chạy lại)
```bash
npm run test:watch
```
✅ Phù hợp: Phát triển và debug

### 3️⃣ Coverage Mode (Báo cáo chi tiết)
```bash
npm run test:coverage
```
✅ Phù hợp: Xem độ coverage của code

---

## 🔍 Chạy Test Cụ Thể

### Chạy Test Theo Tên File
```bash
npm test -- SignIn.test.jsx
npm test -- authSchema.test.js
npm test -- receiveAgencySchema.test.js
npm test -- ReceiveAgencyPage.test.jsx
```

### Chạy Test Theo Pattern
```bash
# Tất cả test có chứa "đăng nhập"
npm test -- --testNamePattern="đăng nhập"

# Tất cả test validation
npm test -- --testNamePattern="validation"

# Tất cả test schema
npm test -- --testNamePattern="schema"
```

### Chạy Test Theo Thư Mục
```bash
npm test -- --testPathPattern="Auth"
npm test -- --testPathPattern="ReceiveAgency"
```

---

## 📁 Cấu Trúc Test Files

```
src/
├── features/
│   ├── Auth/
│   │   ├── SignIn/
│   │   │   └── SignIn.test.jsx ........................... (5 tests)
│   │   ├── SignUp/
│   │   │   └── SignUp.test.jsx ........................... (8 tests)
│   │   ├── authSlice.test.js ............................ (12 tests)
│   │   └── schema/
│   │       └── authSchema.test.js ........................ (21 tests)
│   └── ReceiveAgency/
│       ├── ReceiveAgencyPage.test.jsx ................... (8 tests)
│       └── schema/
│           └── receiveAgencySchema.test.js ............. (30 tests)
└── test/
    └── setupTests.js
```

**Tổng Cộng: 84+ test cases**

---

## ✨ Test Cases Chi Tiết

### 1. Đăng Nhập (SignIn) - 5 test cases
| Test | Mô Tả |
|------|-------|
| 1 | Đăng nhập thành công với thông tin đúng |
| 2 | Từ chối đăng nhập khi sai mật khẩu |
| 3 | Xử lý khi username không tồn tại |
| 4 | Validation: Username quá ngắn |
| 5 | Validation: Password quá ngắn |

### 2. Đăng Ký (SignUp) - 8 test cases
| Test | Mô Tả |
|------|-------|
| 1 | Đăng ký tài khoản mới thành công |
| 2 | Từ chối đăng ký nếu username trùng |
| 3 | Từ chối đăng ký nếu email trùng |
| 4 | Validation: Tên quá ngắn |
| 5 | Validation: Email không hợp lệ |
| 6 | Validation: Mật khẩu xác nhận không khớp |
| 7 | Validation: Mật khẩu quá ngắn |
| 8 | Form complete với tất cả thông tin đúng |

### 3. Tiếp Nhận Đại Lý (Agency) - 8 test cases
| Test | Mô Tả |
|------|-------|
| 1 | Thêm đại lý mới thành công |
| 2 | Validation: Thiếu tên đại lý |
| 3 | Validation: Thiếu loại đại lý |
| 4 | Validation: Thiếu quận |
| 5 | Validation: Số điện thoại không hợp lệ |
| 6 | Validation: Email không hợp lệ |
| 7 | Validation: Số điện thoại phải 9-11 chữ số |
| 8 | Validation: Email định dạng không đúng |

### 4. Schema Validation - 51 test cases
- **SignIn Schema**: 7 tests
- **SignUp Schema**: 14 tests
- **Agency Schema**: 30 tests

### 5. Redux Thunks - 12 test cases
- **User Login**: 6 tests (success, fail, network error)
- **User Register**: 6 tests (success, duplicate, error)

---

## 🎯 Expected Results

### ✅ Passing Tests (Thành Công)
```javascript
✓ Should validate complete valid form
✓ Should accept valid username
✓ Should accept valid email
✓ Should handle successful login
✓ Should add new agency successfully
```

### ❌ Failing Tests (Thất Bại - Dự Kiến)
```javascript
✗ Should reject empty username
✗ Should reject invalid email
✗ Should handle duplicate account
✗ Should reject missing required field
```

---

## 🛠️ Troubleshooting

### ❓ Problem: `Cannot find module '@testing-library/react'`
**Solution:**
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### ❓ Problem: Jest không tìm test files
**Solution:**
```bash
npm test -- --no-cache
```

### ❓ Problem: Tests fail lần đầu tiên
**Solution:**
```bash
npm install
npm test
```

---

## 📚 Resources

| Tài Liệu | Link |
|---------|------|
| Full Guide | [TEST_GUIDE.md](./TEST_GUIDE.md) |
| Test Summary | [TEST_CASES_SUMMARY.md](./TEST_CASES_SUMMARY.md) |
| Commands Reference | [TEST_COMMANDS.sh](./TEST_COMMANDS.sh) |

---

## 🎓 Học Thêm

### Tạo Test Mới
1. Tạo file `ComponentName.test.jsx` cùng folder với component
2. Import testing libraries:
```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
```
3. Viết test theo pattern **Arrange-Act-Assert**

### Cấu Trúc Một Test
```javascript
describe('Component Name', () => {
  test('Should do something', () => {
    // ARRANGE: Chuẩn bị
    const input = 'test';
    
    // ACT: Thực hiện
    const result = myFunction(input);
    
    // ASSERT: Kiểm tra
    expect(result).toBe('expected');
  });
});
```

---

## ⚡ Next Steps

1. ✅ Chạy `npm install`
2. ✅ Chạy `npm test`
3. ✅ Xem test results
4. ✅ Đọc [TEST_GUIDE.md](./TEST_GUIDE.md) để tìm hiểu thêm
5. ✅ Viết thêm test cho các features khác

---

**Ready to test! 🎉**
