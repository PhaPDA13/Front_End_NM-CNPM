import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReceiveAgentPage from './ReceiveAgencyPage'; // Một dấu chấm vì cùng thư mục
import agencyApi from '../../services/agencyApi';
import districtApi from '../../services/districtApi';
import agentTypeApi from '../../services/agentTypes';

// 1. Mock các API modules
jest.mock('../../services/agencyApi', () => ({
  create: jest.fn(),
}));

jest.mock('../../services/districtApi', () => ({
  getAll: jest.fn(),
}));

jest.mock('../../services/agentTypes', () => ({
  getAll: jest.fn(),
}));

// 2. Mock LoadingBar để tránh lỗi "continuousStart of undefined"
jest.mock('react-top-loading-bar', () => {
  // Sử dụng require ngay bên trong để tránh lỗi ReferenceError: React
  const React = require('react'); 
  
  return React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
      continuousStart: jest.fn(),
      complete: jest.fn(),
    }));
    return <div data-testid="loading-bar" />;
  });
});

// 3. Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('ReceiveAgency Page - Agency Reception Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Giả lập dữ liệu trả về từ API cho useEffect
    districtApi.getAll.mockResolvedValue({
      data: [
        { id: 'd1', name: 'Quận 1' },
        { id: 'd2', name: 'Quận 2' },
      ],
    });

    agentTypeApi.getAll.mockResolvedValue({
      data: [
        { id: 't1', name: 'Loại 1' },
        { id: 't2', name: 'Loại 2' },
      ],
    });
  });

  const renderReceiveAgency = () => {
    return render(<ReceiveAgentPage />);
  };

  describe('Luồng thành công', () => {
    test('Chức năng tiếp nhận: Thêm đại lý mới thành công', async () => {
      const user = userEvent.setup();
      agencyApi.create.mockResolvedValue({ data: { success: true } });

      renderReceiveAgency();

      // Chờ cho dropdown load dữ liệu từ API
      await screen.findByText('Quận 1');

      // Điền thông tin - TÊN NHÃN PHẢI KHỚP VỚI COMPONENT
      await user.type(screen.getByLabelText(/Tên/i), 'Đại lý ABC');
      await user.type(screen.getByLabelText(/Điện thoại/i), '0912345678');
      await user.type(screen.getByLabelText(/Email/i), 'agency@example.com');
      await user.type(screen.getByLabelText(/Địa chỉ/i), '123 Đường ABC');

      // Chọn select - Tìm theo nhãn Loại đại lý và Quận
      await user.selectOptions(screen.getByDisplayValue(/Chọn loại/i), 't1');
      await user.selectOptions(screen.getByDisplayValue(/Chọn Quận/i), 'd1');
      
      // Click nút submit - Tên nút phải khớp
      const submitButton = screen.getByRole('button', { name: /Tiếp nhận đại lý/i });
      await user.click(submitButton);

      // Kiểm tra API create có được gọi với đúng dữ liệu không
      await waitFor(() => {
        expect(agencyApi.create).toHaveBeenCalledWith(expect.objectContaining({
          name: 'Đại lý ABC',
          phone: '0912345678',
          email: 'agency@example.com',
          agentTypeId: 't1',
          districtId: 'd1'
        }));
      });
    });
  });

  describe('Kiểm tra Validation (Lỗi nhập liệu)', () => {
    test('Validation: Không được để trống tên', async () => {
      const user = userEvent.setup();
      renderReceiveAgency();

      await screen.findByText('Quận 1');
      const submitButton = screen.getByRole('button', { name: /Tiếp nhận đại lý/i });
      
      // Không nhập tên, nhấn submit ngay
      await user.click(submitButton);

      // API không được phép gọi khi có lỗi validation
      await waitFor(() => {
        expect(agencyApi.create).not.toHaveBeenCalled();
      });
    });

    test('Validation: Email sai định dạng', async () => {
      const user = userEvent.setup();
      renderReceiveAgency();

      await user.type(screen.getByLabelText(/Email/i), 'email-sai-dinh-dang');
      await user.click(screen.getByRole('button', { name: /Tiếp nhận đại lý/i }));

      await waitFor(() => {
        expect(agencyApi.create).not.toHaveBeenCalled();
      });
    });

    test('Validation: Số điện thoại không hợp lệ', async () => {
      const user = userEvent.setup();
      renderReceiveAgency();

      const phoneInput = screen.getByLabelText(/Điện thoại/i);
      await user.type(phoneInput, '123'); // Quá ngắn
      
      await user.click(screen.getByRole('button', { name: /Tiếp nhận đại lý/i }));

      await waitFor(() => {
        expect(agencyApi.create).not.toHaveBeenCalled();
      });
    });
  });
});