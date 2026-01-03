# Test Cases Summary

## Tổng Số Test Cases: 100+

---

## 1. AUTHENTICATION TESTS (Đăng Nhập & Đăng Ký)

### 1.1 SignIn Schema Validation Tests (7 cases)

| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 1.1.1 | Should reject empty username | ❌ Lỗi: "Vui lòng nhập tên tài khoản" |
| 1.1.2 | Should reject username < 4 chars | ❌ Lỗi: "Nhập ít nhất 4 kí tự" |
| 1.1.3 | Should accept valid username | ✅ Chấp nhận |
| 1.1.4 | Should trim whitespace from username | ✅ Loại bỏ khoảng trắng |
| 1.1.5 | Should reject empty password | ❌ Lỗi: "Vui lòng nhập mật khẩu" |
| 1.1.6 | Should reject password < 8 chars | ❌ Lỗi: "Mật khẩu có ít nhất 8 kí tự" |
| 1.1.7 | Should accept valid password | ✅ Chấp nhận |

### 1.2 SignUp Schema Validation Tests (14 cases)

#### Full Name Validation (4 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 1.2.1 | Should reject empty fullName | ❌ Lỗi: "Vui lòng nhập tên" |
| 1.2.2 | Should reject fullName < 2 chars | ❌ Lỗi: "Tên phải có ít nhất 2 ký tự" |
| 1.2.3 | Should reject fullName > 100 chars | ❌ Lỗi: "Tên quá dài" |
| 1.2.4 | Should accept valid fullName | ✅ Chấp nhận |

#### Email Validation (3 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 1.2.5 | Should reject empty email | ❌ Lỗi: "Vui lòng nhập email" |
| 1.2.6 | Should reject invalid email format | ❌ Lỗi: "Email không hợp lệ" |
| 1.2.7 | Should accept valid email | ✅ Chấp nhận |

#### Password Validation (3 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 1.2.8 | Should reject empty password | ❌ Lỗi: "Vui lòng nhập mật khẩu" |
| 1.2.9 | Should reject password < 8 chars | ❌ Lỗi: "Mật khẩu có ít nhất 8 kí tự" |
| 1.2.10 | Should accept valid password | ✅ Chấp nhận |

#### Confirm Password Validation (3 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 1.2.11 | Should reject empty confirmPassword | ❌ Lỗi: "Vui lòng xác nhận mật khẩu" |
| 1.2.12 | Should reject mismatched confirmPassword | ❌ Lỗi: "Xác nhận mật khẩu không khớp" |
| 1.2.13 | Should accept matching confirmPassword | ✅ Chấp nhận |

#### Complete Form (1 case)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 1.2.14 | Should validate complete valid form | ✅ Chấp nhận toàn bộ form |

### 1.3 SignIn Component Tests (5 cases)

| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 1.3.1 | Valid login - Allow user to login with correct info | ✅ Gửi request login |
| 1.3.2 | Invalid password - Reject when password is wrong | ❌ Xử lý lỗi |
| 1.3.3 | Invalid username - Handle non-existent user | ❌ Xử lý lỗi |
| 1.3.4 | Validation: Username too short | ❌ Hiển thị lỗi validation |
| 1.3.5 | Validation: Password too short | ❌ Hiển thị lỗi validation |

### 1.4 SignUp Component Tests (8 cases)

| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 1.4.1 | Register new account successfully | ✅ Tạo tài khoản thành công |
| 1.4.2 | Duplicate username - System prevents duplicate registration | ❌ Từ chối |
| 1.4.3 | Duplicate email - System prevents duplicate registration | ❌ Từ chối |
| 1.4.4 | Validation: Name too short | ❌ Hiển thị lỗi |
| 1.4.5 | Validation: Invalid email format | ❌ Hiển thị lỗi |
| 1.4.6 | Validation: Password confirmation mismatch | ❌ Hiển thị lỗi |
| 1.4.7 | Validation: Password too short | ❌ Hiển thị lỗi |
| 1.4.8 | Complete valid signup form | ✅ Đăng ký thành công |

### 1.5 Auth Redux Thunks Tests (12 cases)

#### User Login (6 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 1.5.1 | Handle successful login | ✅ Trả về token |
| 1.5.2 | Handle login with wrong password | ❌ Trả về lỗi |
| 1.5.3 | Handle login with non-existent user | ❌ Trả về lỗi |
| 1.5.4 | Handle network error during login | ❌ Xử lý exception |
| 1.5.5 | Call API with correct endpoint | ✅ Gọi /user/login |
| 1.5.6 | Return correct response format | ✅ Trả về token |

#### User Register (6 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 1.5.7 | Handle successful registration | ✅ Trả về user info |
| 1.5.8 | Handle duplicate username | ❌ Trả về lỗi |
| 1.5.9 | Handle duplicate email | ❌ Trả về lỗi |
| 1.5.10 | Handle generic error | ❌ Trả về lỗi mặc định |
| 1.5.11 | Handle network error | ❌ Xử lý exception |
| 1.5.12 | Call API with correct endpoint and data | ✅ Gọi /user/ với dữ liệu đúng |

---

## 2. RECEIVE AGENCY TESTS (Tiếp Nhận Đại Lý)

### 2.1 ReceiveAgency Schema Validation Tests (30 cases)

#### Name Validation (2 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 2.1.1 | Should reject empty name | ❌ Lỗi: "Vui lòng nhập tên đại lý" |
| 2.1.2 | Should accept valid name | ✅ Chấp nhận |

#### Agent Type Validation (2 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 2.1.3 | Should reject empty agentTypeId | ❌ Lỗi: "Vui lòng chọn loại đại lý" |
| 2.1.4 | Should accept valid agentTypeId | ✅ Chấp nhận |

#### Phone Validation (8 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 2.1.5 | Should reject empty phone | ❌ Lỗi: "Vui lòng nhập số điện thoại" |
| 2.1.6 | Should reject non-numeric phone | ❌ Lỗi: "Số điện thoại không hợp lệ" |
| 2.1.7 | Should reject phone < 9 digits | ❌ Lỗi: "Số điện thoại không hợp lệ" |
| 2.1.8 | Should reject phone > 11 digits | ❌ Lỗi: "Số điện thoại không hợp lệ" |
| 2.1.9 | Should accept 9-digit phone | ✅ Chấp nhận |
| 2.1.10 | Should accept 10-digit phone | ✅ Chấp nhận |
| 2.1.11 | Should accept 11-digit phone | ✅ Chấp nhận |
| 2.1.12 | Should validate all phone formats | ✅ Chấp nhận tất cả 3 format |

#### District Validation (2 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 2.1.13 | Should reject empty districtId | ❌ Lỗi: "Vui lòng chọn quận" |
| 2.1.14 | Should accept valid districtId | ✅ Chấp nhận |

#### Email Validation (3 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 2.1.15 | Should reject empty email | ❌ Lỗi: "Vui lòng nhập email" |
| 2.1.16 | Should reject invalid email format | ❌ Lỗi: "Email không hợp lệ" |
| 2.1.17 | Should accept valid email | ✅ Chấp nhận |

#### Address Validation (2 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 2.1.18 | Should reject empty address | ❌ Lỗi: "Vui lòng nhập địa chỉ" |
| 2.1.19 | Should accept valid address | ✅ Chấp nhận |

#### Complete Form (4 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 2.1.20 | Should validate complete valid form | ✅ Chấp nhận |
| 2.1.21 | Should validate all phone formats | ✅ Chấp nhận 9-11 digits |
| 2.1.22 | Should handle multiple validation errors | ❌ Trả về lỗi |
| 2.1.23 | Should reject missing all required fields | ❌ Trả về lỗi |

#### Required Fields (5 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 2.1.24 | Should reject empty name | ❌ Lỗi |
| 2.1.25 | Should reject empty agentTypeId | ❌ Lỗi |
| 2.1.26 | Should reject empty phone | ❌ Lỗi |
| 2.1.27 | Should reject empty districtId | ❌ Lỗi |
| 2.1.28 | Should reject empty address | ❌ Lỗi |

#### Validation Rules (2 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 2.1.29 | Should validate phone format (9-11 digits) | ✅ Chấp nhận 9-11 chữ số |
| 2.1.30 | Should validate email format | ✅ Chấp nhận email hợp lệ |

### 2.2 ReceiveAgency Component Tests (8 cases)

#### Valid Agency Reception (1 case)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 2.2.1 | Add new agency successfully | ✅ Tạo đại lý thành công |

#### Agency Reception with Missing Info (6 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 2.2.2 | Missing name | ❌ Kiểm tra ràng buộc bắt buộc |
| 2.2.3 | Missing agent type | ❌ Kiểm tra ràng buộc bắt buộc |
| 2.2.4 | Missing district | ❌ Kiểm tra ràng buộc bắt buộc |
| 2.2.5 | Invalid phone number | ❌ Kiểm tra ràng buộc bắt buộc |
| 2.2.6 | Invalid email format | ❌ Kiểm tra ràng buộc bắt buộc |
| 2.2.7 | Missing address | ❌ Kiểm tra ràng buộc bắt buộc |

#### Validation Tests (2 cases)
| No. | Test Case | Expected Result |
|-----|-----------|-----------------|
| 2.2.8 | Phone must be 9-11 digits | ❌ Từ chối nếu không đúng |
| 2.2.9 | Email format must be valid | ❌ Từ chối nếu sai định dạng |

---

## Summary Statistics

| Category | Total | Pass | Fail |
|----------|-------|------|------|
| Auth Schema | 21 | - | - |
| SignIn Component | 5 | - | - |
| SignUp Component | 8 | - | - |
| Auth Thunks | 12 | - | - |
| Agency Schema | 30 | - | - |
| Agency Component | 8 | - | - |
| **TOTAL** | **84+** | - | - |

---

## Test Execution Guide

### Run All Tests
```bash
npm test
```

### Run Specific Test Suite
```bash
# Authentication Tests
npm test -- authSchema.test.js
npm test -- SignIn.test.jsx
npm test -- SignUp.test.jsx
npm test -- authSlice.test.js

# Agency Tests
npm test -- receiveAgencySchema.test.js
npm test -- ReceiveAgencyPage.test.jsx
```

### Run Tests with Pattern
```bash
# Run validation tests
npm test -- --testNamePattern="Validation"

# Run login tests
npm test -- --testNamePattern="login|đăng nhập"

# Run agency tests
npm test -- --testNamePattern="agency|đại lý"
```

### Generate Coverage Report
```bash
npm run test:coverage
```

---

## Expected Results

✅ **All tests should PASS** when:
- Valid data is provided
- All required fields are filled
- Format validations are correct (email, phone, etc.)

❌ **All tests should FAIL (display error)** when:
- Required fields are empty
- Invalid data format
- Duplicate entries
- Data constraints violated

---

## Notes

- Tests sử dụng **Jest** framework
- Mock API calls với **redux-mock-store**
- Form validation sử dụng **Yup** schema
- Component testing sử dụng **React Testing Library**
- Tất cả tests độc lập và không phụ thuộc vào nhau
