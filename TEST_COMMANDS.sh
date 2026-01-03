#!/bin/bash

# Quick Test Commands Reference
# Sử dụng file này để tham khảo các lệnh chạy test nhanh

echo "=========================================="
echo "    Unit Test Commands Reference"
echo "=========================================="
echo ""

echo "1. RUN ALL TESTS"
echo "   npm test"
echo ""

echo "2. RUN TESTS IN WATCH MODE"
echo "   npm run test:watch"
echo ""

echo "3. RUN TESTS WITH COVERAGE REPORT"
echo "   npm run test:coverage"
echo ""

echo "4. RUN SPECIFIC TEST FILE"
echo "   npm test -- authSchema.test.js"
echo "   npm test -- SignIn.test.jsx"
echo "   npm test -- SignUp.test.jsx"
echo "   npm test -- ReceiveAgencyPage.test.jsx"
echo "   npm test -- receiveAgencySchema.test.js"
echo ""

echo "5. RUN TESTS BY PATTERN"
echo "   npm test -- --testNamePattern='đăng nhập'"
echo "   npm test -- --testNamePattern='validation'"
echo "   npm test -- --testNamePattern='schema'"
echo "   npm test -- --testNamePattern='đại lý'"
echo ""

echo "6. RUN SPECIFIC TEST SUITE"
echo "   # Authentication Tests"
echo "   npm test -- --testPathPattern='Auth'"
echo ""
echo "   # Agency Tests"
echo "   npm test -- --testPathPattern='ReceiveAgency'"
echo ""

echo "7. RUN TESTS WITH NO CACHE"
echo "   npm test -- --no-cache"
echo ""

echo "8. RUN TESTS AND STOP ON FIRST ERROR"
echo "   npm test -- --bail"
echo ""

echo "9. RUN TESTS WITH VERBOSE OUTPUT"
echo "   npm test -- --verbose"
echo ""

echo "10. UPDATE SNAPSHOTS (if any)"
echo "    npm test -- -u"
echo ""

echo "=========================================="
echo "AFTER RUNNING TESTS:"
echo "=========================================="
echo ""
echo "✅ Coverage Report will be in: coverage/lcov-report/index.html"
echo "✅ Open in browser to see detailed coverage"
echo ""

echo "=========================================="
echo "TEST FILES CREATED:"
echo "=========================================="
echo ""
echo "src/features/Auth/"
echo "  ├── SignIn/SignIn.test.jsx"
echo "  ├── SignUp/SignUp.test.jsx"
echo "  ├── authSlice.test.js"
echo "  └── schema/authSchema.test.js"
echo ""
echo "src/features/ReceiveAgency/"
echo "  ├── ReceiveAgencyPage.test.jsx"
echo "  └── schema/receiveAgencySchema.test.js"
echo ""
echo "src/test/"
echo "  └── setupTests.js"
echo ""

echo "=========================================="
