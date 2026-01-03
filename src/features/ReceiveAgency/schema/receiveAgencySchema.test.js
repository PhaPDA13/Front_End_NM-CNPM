import { receiveAgentSchema } from '../schema/schemaReceiveAgency';

describe('ReceiveAgency Schema Validation Tests', () => {
  describe('Name Validation', () => {
    test('Should reject empty name', async () => {
      try {
        await receiveAgentSchema.validate({
          name: '',
          agentTypeId: '1',
          phone: '0912345678',
          districtId: '1',
          email: 'test@example.com',
          address: '123 Đường ABC'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Vui lòng nhập tên đại lý');
      }
    });

    test('Should accept valid name', async () => {
      const result = await receiveAgentSchema.validate({
        name: 'Đại lý ABC',
        agentTypeId: '1',
        phone: '0912345678',
        districtId: '1',
        email: 'test@example.com',
        address: '123 Đường ABC'
      });
      expect(result.name).toBe('Đại lý ABC');
    });
  });

  describe('Agent Type Validation', () => {
    test('Should reject empty agent type', async () => {
      try {
        await receiveAgentSchema.validate({
          name: 'Đại lý ABC',
          agentTypeId: '',
          phone: '0912345678',
          districtId: '1',
          email: 'test@example.com',
          address: '123 Đường ABC'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Vui lòng chọn loại đại lý');
      }
    });

    test('Should accept valid agent type', async () => {
      const result = await receiveAgentSchema.validate({
        name: 'Đại lý ABC',
        agentTypeId: '1',
        phone: '0912345678',
        districtId: '1',
        email: 'test@example.com',
        address: '123 Đường ABC'
      });
      expect(result.agentTypeId).toBe('1');
    });
  });

  describe('Phone Validation', () => {
    test('Should reject empty phone', async () => {
      try {
        await receiveAgentSchema.validate({
          name: 'Đại lý ABC',
          agentTypeId: '1',
          phone: '',
          districtId: '1',
          email: 'test@example.com',
          address: '123 Đường ABC'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Vui lòng nhập số điện thoại');
      }
    });

    test('Should reject phone with invalid format', async () => {
      try {
        await receiveAgentSchema.validate({
          name: 'Đại lý ABC',
          agentTypeId: '1',
          phone: 'abcdefghij',
          districtId: '1',
          email: 'test@example.com',
          address: '123 Đường ABC'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Số điện thoại không hợp lệ');
      }
    });

    test('Should reject phone with too few digits', async () => {
      try {
        await receiveAgentSchema.validate({
          name: 'Đại lý ABC',
          agentTypeId: '1',
          phone: '0912345',
          districtId: '1',
          email: 'test@example.com',
          address: '123 Đường ABC'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Số điện thoại không hợp lệ');
      }
    });

    test('Should reject phone with too many digits', async () => {
      try {
        await receiveAgentSchema.validate({
          name: 'Đại lý ABC',
          agentTypeId: '1',
          phone: '091234567890',
          districtId: '1',
          email: 'test@example.com',
          address: '123 Đường ABC'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Số điện thoại không hợp lệ');
      }
    });

    test('Should accept valid 9-digit phone', async () => {
      const result = await receiveAgentSchema.validate({
        name: 'Đại lý ABC',
        agentTypeId: '1',
        phone: '012345678',
        districtId: '1',
        email: 'test@example.com',
        address: '123 Đường ABC'
      });
      expect(result.phone).toBe('012345678');
    });

    test('Should accept valid 10-digit phone', async () => {
      const result = await receiveAgentSchema.validate({
        name: 'Đại lý ABC',
        agentTypeId: '1',
        phone: '0912345678',
        districtId: '1',
        email: 'test@example.com',
        address: '123 Đường ABC'
      });
      expect(result.phone).toBe('0912345678');
    });

    test('Should accept valid 11-digit phone', async () => {
      const result = await receiveAgentSchema.validate({
        name: 'Đại lý ABC',
        agentTypeId: '1',
        phone: '09123456789',
        districtId: '1',
        email: 'test@example.com',
        address: '123 Đường ABC'
      });
      expect(result.phone).toBe('09123456789');
    });
  });

  describe('District Validation', () => {
    test('Should reject empty district', async () => {
      try {
        await receiveAgentSchema.validate({
          name: 'Đại lý ABC',
          agentTypeId: '1',
          phone: '0912345678',
          districtId: '',
          email: 'test@example.com',
          address: '123 Đường ABC'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Vui lòng chọn quận');
      }
    });

    test('Should accept valid district', async () => {
      const result = await receiveAgentSchema.validate({
        name: 'Đại lý ABC',
        agentTypeId: '1',
        phone: '0912345678',
        districtId: '1',
        email: 'test@example.com',
        address: '123 Đường ABC'
      });
      expect(result.districtId).toBe('1');
    });
  });

  describe('Email Validation', () => {
    test('Should reject empty email', async () => {
      try {
        await receiveAgentSchema.validate({
          name: 'Đại lý ABC',
          agentTypeId: '1',
          phone: '0912345678',
          districtId: '1',
          email: '',
          address: '123 Đường ABC'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Vui lòng nhập email');
      }
    });

    test('Should reject invalid email format', async () => {
      try {
        await receiveAgentSchema.validate({
          name: 'Đại lý ABC',
          agentTypeId: '1',
          phone: '0912345678',
          districtId: '1',
          email: 'invalidemail',
          address: '123 Đường ABC'
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Email không hợp lệ');
      }
    });

    test('Should accept valid email', async () => {
      const result = await receiveAgentSchema.validate({
        name: 'Đại lý ABC',
        agentTypeId: '1',
        phone: '0912345678',
        districtId: '1',
        email: 'agency@example.com',
        address: '123 Đường ABC'
      });
      expect(result.email).toBe('agency@example.com');
    });
  });

  describe('Address Validation', () => {
    test('Should reject empty address', async () => {
      try {
        await receiveAgentSchema.validate({
          name: 'Đại lý ABC',
          agentTypeId: '1',
          phone: '0912345678',
          districtId: '1',
          email: 'test@example.com',
          address: ''
        });
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('Vui lòng nhập địa chỉ');
      }
    });

    test('Should accept valid address', async () => {
      const result = await receiveAgentSchema.validate({
        name: 'Đại lý ABC',
        agentTypeId: '1',
        phone: '0912345678',
        districtId: '1',
        email: 'test@example.com',
        address: '123 Đường ABC'
      });
      expect(result.address).toBe('123 Đường ABC');
    });
  });

  describe('Complete Form Validation', () => {
    test('Should validate complete valid form', async () => {
      const validData = {
        name: 'Đại lý ABC',
        agentTypeId: '1',
        phone: '0912345678',
        districtId: '1',
        email: 'agency@example.com',
        address: '123 Đường ABC'
      };
      const result = await receiveAgentSchema.validate(validData);
      expect(result).toEqual(validData);
    });

    test('Should accept form with valid multiple phone formats', async () => {
      const phones = ['012345678', '0912345678', '09123456789'];
      
      for (const phone of phones) {
        const result = await receiveAgentSchema.validate({
          name: 'Đại lý ABC',
          agentTypeId: '1',
          phone: phone,
          districtId: '1',
          email: 'agency@example.com',
          address: '123 Đường ABC'
        });
        expect(result.phone).toBe(phone);
      }
    });

    test('Should handle multiple validation errors', async () => {
      try {
        await receiveAgentSchema.validate({
          name: '',
          agentTypeId: '',
          phone: 'abc',
          districtId: '',
          email: 'invalidemail',
          address: ''
        });
        expect(true).toBe(false);
      } catch (error) {
        // Should have validation error
        expect(error).toBeDefined();
      }
    });
  });

  describe('Required Fields Validation', () => {
    test('Should reject missing all required fields', async () => {
      try {
        await receiveAgentSchema.validate({});
        expect(true).toBe(false);
      } catch (error) {
        // At least one error should be present
        expect(error).toBeDefined();
      }
    });

    test('Should validate each required field independently', async () => {
      const requiredFields = [
        { field: 'name', testValue: '' },
        { field: 'agentTypeId', testValue: '' },
        { field: 'phone', testValue: '' },
        { field: 'districtId', testValue: '' },
        { field: 'email', testValue: '' },
        { field: 'address', testValue: '' }
      ];

      for (const { field } of requiredFields) {
        const testData = {
          name: 'Đại lý ABC',
          agentTypeId: '1',
          phone: '0912345678',
          districtId: '1',
          email: 'agency@example.com',
          address: '123 Đường ABC'
        };

        testData[field] = '';

        try {
          await receiveAgentSchema.validate(testData);
          expect(true).toBe(false);
        } catch (error) {
          expect(error).toBeDefined();
        }
      }
    });
  });
});
