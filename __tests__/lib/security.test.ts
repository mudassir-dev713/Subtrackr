import {
  sanitizeString,
  sanitizeUrl,
  emailSchema,
  passwordSchema,
  urlSchema,
  generateCSRFToken,
  validateCSRFToken,
  sanitizeMongoQuery,
  generateSecureToken,
  validateInput,
} from '../../lib/security';

describe('Security Utilities', () => {
  describe('sanitizeString', () => {
    it('should remove HTML tags', () => {
      const input = '<script>alert("xss")</script>Hello World';
      const result = sanitizeString(input);
      expect(result).toBe('alert("xss")Hello World');
    });

    it('should handle empty string', () => {
      const result = sanitizeString('');
      expect(result).toBe('');
    });

    it('should handle null and undefined', () => {
      expect(sanitizeString(null as any)).toBe('');
      expect(sanitizeString(undefined as any)).toBe('');
    });

    it('should preserve safe text', () => {
      const input = 'Hello World 123 !@#$%^&*()';
      const result = sanitizeString(input);
      expect(result).toBe(input);
    });
  });

  describe('sanitizeUrl', () => {
    it('should sanitize URLs with HTML', () => {
      const input = 'https://example.com<script>alert("xss")</script>';
      expect(() => sanitizeUrl(input)).toThrow('Invalid URL');
    });

    it('should handle valid URLs', () => {
      const input = 'https://example.com/path?param=value';
      const result = sanitizeUrl(input);
      expect(result).toBe(input);
    });

    it('should handle empty string', () => {
      const result = sanitizeUrl('');
      expect(result).toBe('');
    });
  });

  describe('validateInput with emailSchema', () => {
    it('should validate correct email addresses', () => {
      expect(validateInput(emailSchema, 'test@example.com').success).toBe(true);
      expect(
        validateInput(emailSchema, 'user.name+tag@domain.co.uk').success
      ).toBe(true);
      expect(validateInput(emailSchema, '123@test.org').success).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateInput(emailSchema, 'invalid-email').success).toBe(false);
      expect(validateInput(emailSchema, 'test@').success).toBe(false);
      expect(validateInput(emailSchema, '@example.com').success).toBe(false);
      expect(validateInput(emailSchema, 'test@.com').success).toBe(false);
      expect(validateInput(emailSchema, '').success).toBe(false);
    });
  });

  describe('validateInput with passwordSchema', () => {
    it('should validate strong passwords', () => {
      expect(validateInput(passwordSchema, 'Password123').success).toBe(true);
      expect(validateInput(passwordSchema, 'MySecurePass1').success).toBe(true);
      expect(validateInput(passwordSchema, 'Complex@Pass1').success).toBe(true);
    });

    it('should reject weak passwords', () => {
      expect(validateInput(passwordSchema, 'password').success).toBe(false); // no uppercase, no number
      expect(validateInput(passwordSchema, 'PASSWORD').success).toBe(false); // no lowercase, no number
      expect(validateInput(passwordSchema, 'Password').success).toBe(false); // no number
      expect(validateInput(passwordSchema, 'pass123').success).toBe(false); // no uppercase
      expect(validateInput(passwordSchema, '').success).toBe(false); // empty
      expect(validateInput(passwordSchema, '12345678').success).toBe(false); // no letters
    });

    it('should reject passwords that are too short', () => {
      expect(validateInput(passwordSchema, 'Pass1').success).toBe(false); // less than 8 characters
    });
  });

  describe('emailSchema', () => {
    it('should validate and transform valid emails', () => {
      const result = emailSchema.safeParse('TEST@EXAMPLE.COM');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('test@example.com'); // should be lowercase
      }
    });

    it('should reject invalid emails', () => {
      const result = emailSchema.safeParse('invalid-email');
      expect(result.success).toBe(false);
    });
  });

  describe('passwordSchema', () => {
    it('should validate strong passwords', () => {
      const result = passwordSchema.safeParse('Password123');
      expect(result.success).toBe(true);
    });

    it('should reject weak passwords', () => {
      const result = passwordSchema.safeParse('password');
      expect(result.success).toBe(false);
    });
  });

  describe('urlSchema', () => {
    it('should validate valid URLs', () => {
      const result = urlSchema.safeParse('https://example.com');
      expect(result.success).toBe(true);
    });

    it('should reject invalid URLs', () => {
      const result = urlSchema.safeParse('not-a-url');
      expect(result.success).toBe(false);
    });
  });

  describe('generateCSRFToken', () => {
    it('should generate a non-empty string', () => {
      const token = generateCSRFToken();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    it('should generate different tokens on each call', () => {
      const token1 = generateCSRFToken();
      const token2 = generateCSRFToken();
      expect(token1).not.toBe(token2);
    });
  });

  describe('validateCSRFToken', () => {
    it('should validate correct tokens', () => {
      const token = generateCSRFToken();
      expect(validateCSRFToken(token, token)).toBe(true);
    });

    it('should reject mismatched tokens', () => {
      const token1 = generateCSRFToken();
      const token2 = generateCSRFToken();
      expect(validateCSRFToken(token1, token2)).toBe(false);
    });

    it('should reject empty tokens', () => {
      expect(validateCSRFToken('', '')).toBe(false);
      expect(validateCSRFToken('token', '')).toBe(false);
      expect(validateCSRFToken('', 'token')).toBe(false);
    });
  });

  describe('sanitizeMongoQuery', () => {
    it('should sanitize query objects', () => {
      const query = {
        name: '<script>alert("xss")</script>John',
        email: 'test@example.com',
        age: 25,
      };
      const result = sanitizeMongoQuery(query);
      expect(result.name).toBe('alert("xss")John');
      expect(result.email).toBe('test@example.com');
      expect(result.age).toBe(25);
    });

    it('should handle nested objects', () => {
      const query = {
        user: {
          name: '<script>alert("xss")</script>John',
          email: 'test@example.com',
        },
      };
      const result = sanitizeMongoQuery(query);
      expect(result.user.name).toBe('alert("xss")John');
      expect(result.user.email).toBe('test@example.com');
    });

    it('should handle arrays', () => {
      const query = {
        tags: ['<script>alert("xss")</script>tag1', 'tag2'],
      };
      const result = sanitizeMongoQuery(query);
      expect(result.tags).toEqual(['alert("xss")tag1', 'tag2']);
    });
  });

  describe('generateSecureToken', () => {
    it('should generate token with default length', () => {
      const token = generateSecureToken();
      expect(typeof token).toBe('string');
      expect(token.length).toBe(32);
    });

    it('should generate token with custom length', () => {
      const token = generateSecureToken(16);
      expect(typeof token).toBe('string');
      expect(token.length).toBe(16);
    });

    it('should generate different tokens on each call', () => {
      const token1 = generateSecureToken();
      const token2 = generateSecureToken();
      expect(token1).not.toBe(token2);
    });

    it('should only contain alphanumeric characters', () => {
      const token = generateSecureToken();
      expect(token).toMatch(/^[A-Za-z0-9]+$/);
    });
  });
});
