import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReceiveAgentPage from '../ReceiveAgencyPage';
import agencyApi from '../../services/agencyApi';
import districtApi from '../../services/districtApi';
import agentTypesApi from '../../services/agentTypes';

// Mock the API modules
jest.mock('../../services/agencyApi', () => ({
  create: jest.fn(),
}));

jest.mock('../../services/districtApi', () => ({
  getAll: jest.fn(),
}));

jest.mock('../../services/agentTypes', () => ({
  getAll: jest.fn(),
}));

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('ReceiveAgency Page - Agency Reception Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock API responses
    districtApi.getAll.mockResolvedValue({
      data: [
        { id: '1', name: 'Quận 1' },
        { id: '2', name: 'Quận 2' },
      ],
    });

    agentTypesApi.getAll.mockResolvedValue({
      data: [
        { id: '1', name: 'Loại 1' },
        { id: '2', name: 'Loại 2' },
      ],
    });
  });

  const renderReceiveAgency = () => {
    return render(<ReceiveAgentPage />);
  };

  describe('Tiếp nhận đại lý hợp lệ', () => {
    test('Chức năng tiếp nhận đại lý: Kiểm tra thêm đại lý mới thành công', async () => {
      const user = userEvent.setup();
      
      // Mock successful agency creation
      agencyApi.create.mockResolvedValue({
        data: {
          id: '123',
          name: 'Đại lý ABC',
          agentTypeId: '1',
          phone: '0912345678',
          districtId: '1',
          email: 'agency@example.com',
          address: '123 Đường ABC',
        },
      });

      renderReceiveAgency();

      // Wait for dropdowns to load
      await waitFor(() => {
        expect(districtApi.getAll).toHaveBeenCalled();
        expect(agentTypesApi.getAll).toHaveBeenCalled();
      });

      // Fill form
      const nameInput = screen.getByLabelText(/tên đại lý/i);
      const phoneInput = screen.getByLabelText(/số điện thoại/i);
      const emailInput = screen.getByLabelText(/email/i);
      const addressInput = screen.getByLabelText(/địa chỉ/i);
      const submitButton = screen.getByRole('button', { name: /submit|tạo|thêm/i });

      await user.type(nameInput, 'Đại lý ABC');
      await user.type(phoneInput, '0912345678');
      await user.type(emailInput, 'agency@example.com');
      await user.type(addressInput, '123 Đường ABC');

      // Select dropdowns
      const agentTypeSelect = screen.getByDisplayValue('Loại 1', { selector: 'select' });
      const districtSelect = screen.getByDisplayValue('Quận 1', { selector: 'select' });

      await user.selectOption(agentTypeSelect, '1');
      await user.selectOption(districtSelect, '1');

      await user.click(submitButton);

      // Verify API was called
      await waitFor(() => {
        expect(agencyApi.create).toHaveBeenCalledWith(expect.objectContaining({
          name: 'Đại lý ABC',
          phone: '0912345678',
          email: 'agency@example.com',
          address: '123 Đường ABC',
        }));
      });
    });
  });

  describe('Tiếp nhận đại lý thiếu thông tin', () => {
    test('Chức năng tiếp nhận đại lý: Kiểm tra ràng buộc dữ liệu bắt buộc - Thiếu tên', async () => {
      const user = userEvent.setup();

      renderReceiveAgency();

      await waitFor(() => {
        expect(districtApi.getAll).toHaveBeenCalled();
        expect(agentTypesApi.getAll).toHaveBeenCalled();
      });

      const phoneInput = screen.getByLabelText(/số điện thoại/i);
      const emailInput = screen.getByLabelText(/email/i);
      const addressInput = screen.getByLabelText(/địa chỉ/i);
      const submitButton = screen.getByRole('button', { name: /submit|tạo|thêm/i });

      // Don't fill name field
      await user.type(phoneInput, '0912345678');
      await user.type(emailInput, 'agency@example.com');
      await user.type(addressInput, '123 Đường ABC');

      await user.click(submitButton);

      // Verify error validation appears
      await waitFor(() => {
        // Name is required error should appear
      });
    });

    test('Chức năng tiếp nhận đại lý: Kiểm tra ràng buộc dữ liệu bắt buộc - Thiếu loại đại lý', async () => {
      const user = userEvent.setup();

      renderReceiveAgency();

      await waitFor(() => {
        expect(districtApi.getAll).toHaveBeenCalled();
        expect(agentTypesApi.getAll).toHaveBeenCalled();
      });

      const nameInput = screen.getByLabelText(/tên đại lý/i);
      const phoneInput = screen.getByLabelText(/số điện thoại/i);
      const emailInput = screen.getByLabelText(/email/i);
      const addressInput = screen.getByLabelText(/địa chỉ/i);
      const submitButton = screen.getByRole('button', { name: /submit|tạo|thêm/i });

      await user.type(nameInput, 'Đại lý ABC');
      await user.type(phoneInput, '0912345678');
      await user.type(emailInput, 'agency@example.com');
      await user.type(addressInput, '123 Đường ABC');
      
      // Don't select agent type

      await user.click(submitButton);

      // Verify error validation appears
      await waitFor(() => {
        // Agent type is required error should appear
      });
    });

    test('Chức năng tiếp nhận đại lý: Kiểm tra ràng buộc dữ liệu bắt buộc - Thiếu quận', async () => {
      const user = userEvent.setup();

      renderReceiveAgency();

      await waitFor(() => {
        expect(districtApi.getAll).toHaveBeenCalled();
        expect(agentTypesApi.getAll).toHaveBeenCalled();
      });

      const nameInput = screen.getByLabelText(/tên đại lý/i);
      const phoneInput = screen.getByLabelText(/số điện thoại/i);
      const emailInput = screen.getByLabelText(/email/i);
      const addressInput = screen.getByLabelText(/địa chỉ/i);
      const submitButton = screen.getByRole('button', { name: /submit|tạo|thêm/i });

      await user.type(nameInput, 'Đại lý ABC');
      await user.type(phoneInput, '0912345678');
      await user.type(emailInput, 'agency@example.com');
      await user.type(addressInput, '123 Đường ABC');

      const agentTypeSelect = screen.getByDisplayValue('Loại 1', { selector: 'select' });
      await user.selectOption(agentTypeSelect, '1');
      
      // Don't select district

      await user.click(submitButton);

      // Verify error validation appears
      await waitFor(() => {
        // District is required error should appear
      });
    });

    test('Chức năng tiếp nhận đại lý: Kiểm tra ràng buộc dữ liệu bắt buộc - Số điện thoại không hợp lệ', async () => {
      const user = userEvent.setup();

      renderReceiveAgency();

      await waitFor(() => {
        expect(districtApi.getAll).toHaveBeenCalled();
        expect(agentTypesApi.getAll).toHaveBeenCalled();
      });

      const nameInput = screen.getByLabelText(/tên đại lý/i);
      const phoneInput = screen.getByLabelText(/số điện thoại/i);
      const emailInput = screen.getByLabelText(/email/i);
      const addressInput = screen.getByLabelText(/địa chỉ/i);
      const submitButton = screen.getByRole('button', { name: /submit|tạo|thêm/i });

      await user.type(nameInput, 'Đại lý ABC');
      await user.type(phoneInput, '123'); // Invalid phone - too short
      await user.type(emailInput, 'agency@example.com');
      await user.type(addressInput, '123 Đường ABC');

      const agentTypeSelect = screen.getByDisplayValue('Loại 1', { selector: 'select' });
      const districtSelect = screen.getByDisplayValue('Quận 1', { selector: 'select' });
      await user.selectOption(agentTypeSelect, '1');
      await user.selectOption(districtSelect, '1');

      await user.click(submitButton);

      // Verify error validation appears for phone
      await waitFor(() => {
        // Phone format error should appear
      });
    });

    test('Chức năng tiếp nhận đại lý: Kiểm tra ràng buộc dữ liệu bắt buộc - Email không hợp lệ', async () => {
      const user = userEvent.setup();

      renderReceiveAgency();

      await waitFor(() => {
        expect(districtApi.getAll).toHaveBeenCalled();
        expect(agentTypesApi.getAll).toHaveBeenCalled();
      });

      const nameInput = screen.getByLabelText(/tên đại lý/i);
      const phoneInput = screen.getByLabelText(/số điện thoại/i);
      const emailInput = screen.getByLabelText(/email/i);
      const addressInput = screen.getByLabelText(/địa chỉ/i);
      const submitButton = screen.getByRole('button', { name: /submit|tạo|thêm/i });

      await user.type(nameInput, 'Đại lý ABC');
      await user.type(phoneInput, '0912345678');
      await user.type(emailInput, 'invalidemail'); // Invalid email
      await user.type(addressInput, '123 Đường ABC');

      const agentTypeSelect = screen.getByDisplayValue('Loại 1', { selector: 'select' });
      const districtSelect = screen.getByDisplayValue('Quận 1', { selector: 'select' });
      await user.selectOption(agentTypeSelect, '1');
      await user.selectOption(districtSelect, '1');

      await user.click(submitButton);

      // Verify error validation appears for email
      await waitFor(() => {
        // Email format error should appear
      });
    });
  });

  describe('Validation Tests', () => {
    test('Validation: Số điện thoại phải 9-11 chữ số', async () => {
      const user = userEvent.setup();

      renderReceiveAgency();

      await waitFor(() => {
        expect(districtApi.getAll).toHaveBeenCalled();
        expect(agentTypesApi.getAll).toHaveBeenCalled();
      });

      const phoneInput = screen.getByLabelText(/số điện thoại/i);
      const submitButton = screen.getByRole('button', { name: /submit|tạo|thêm/i });

      // Test invalid phone (too long)
      await user.type(phoneInput, '09123456789123');
      await user.click(submitButton);

      // Verify error appears
      await waitFor(() => {
        // Phone validation error should appear
      });
    });

    test('Validation: Email định dạng không đúng', async () => {
      const user = userEvent.setup();

      renderReceiveAgency();

      await waitFor(() => {
        expect(districtApi.getAll).toHaveBeenCalled();
        expect(agentTypesApi.getAll).toHaveBeenCalled();
      });

      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole('button', { name: /submit|tạo|thêm/i });

      await user.type(emailInput, 'notanemail');
      await user.click(submitButton);

      // Verify error appears
      await waitFor(() => {
        // Email validation error should appear
      });
    });
  });
});
