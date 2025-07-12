import {
  sanitizeString,
  sanitizeUrl,
  generateCSRFToken,
  generateSecureToken,
  sanitizeMongoQuery,
} from '../../lib/security';

describe('Security Performance Tests', () => {
  describe('sanitizeString Performance', () => {
    it('should handle large strings efficiently', () => {
      const largeString = '<script>alert("xss")</script>'.repeat(1000);
      const startTime = performance.now();

      const result = sanitizeString(largeString);
      const endTime = performance.now();

      expect(result).not.toContain('<script>');
      expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
    });

    it('should handle multiple sanitization operations quickly', () => {
      const strings = Array(1000).fill(
        '<script>alert("xss")</script>Hello World'
      );
      const startTime = performance.now();

      strings.forEach(str => sanitizeString(str));
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(500); // Should complete in under 500ms
    });
  });

  describe('sanitizeUrl Performance', () => {
    it('should handle multiple URL validations efficiently', () => {
      const urls = [
        'https://example.com',
        'https://test.com/path?param=value',
        'http://localhost:3000',
        'https://api.example.com/v1/endpoint',
      ];

      const startTime = performance.now();

      urls.forEach(url => {
        try {
          sanitizeUrl(url);
        } catch (error) {
          // Expected for invalid URLs
        }
      });

      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(50); // Should complete in under 50ms
    });
  });

  describe('generateCSRFToken Performance', () => {
    it('should generate tokens quickly', () => {
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        generateCSRFToken();
      }

      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
    });

    it('should generate unique tokens', () => {
      const tokens = new Set();

      for (let i = 0; i < 1000; i++) {
        tokens.add(generateCSRFToken());
      }

      expect(tokens.size).toBe(1000); // All tokens should be unique
    });
  });

  describe('generateSecureToken Performance', () => {
    it('should generate secure tokens quickly', () => {
      const startTime = performance.now();

      for (let i = 0; i < 100; i++) {
        generateSecureToken(32);
      }

      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(200); // Should complete in under 200ms
    });

    it('should generate tokens of correct length', () => {
      const lengths = [16, 32, 64, 128];

      lengths.forEach(length => {
        const token = generateSecureToken(length);
        expect(token.length).toBe(length);
      });
    });
  });

  describe('sanitizeMongoQuery Performance', () => {
    it('should handle large query objects efficiently', () => {
      const largeQuery = {
        name: '<script>alert("xss")</script>John',
        email: 'test@example.com',
        metadata: {
          description: '<script>alert("xss")</script>Description',
          tags: ['<script>alert("xss")</script>tag1', 'tag2', 'tag3'],
          nested: {
            value: '<script>alert("xss")</script>nested value',
          },
        },
        array: Array(100).fill('<script>alert("xss")</script>item'),
      };

      const startTime = performance.now();

      const result = sanitizeMongoQuery(largeQuery);
      const endTime = performance.now();

      expect(result.name).not.toContain('<script>');
      expect(result.metadata.description).not.toContain('<script>');
      expect(result.array[0]).not.toContain('<script>');
      expect(endTime - startTime).toBeLessThan(50); // Should complete in under 50ms
    });

    it('should handle deep nested objects', () => {
      const deepQuery = {
        level1: {
          level2: {
            level3: {
              level4: {
                level5: {
                  value: '<script>alert("xss")</script>deep value',
                },
              },
            },
          },
        },
      };

      const startTime = performance.now();

      const result = sanitizeMongoQuery(deepQuery);
      const endTime = performance.now();

      expect(result.level1.level2.level3.level4.level5.value).not.toContain(
        '<script>'
      );
      expect(endTime - startTime).toBeLessThan(10); // Should complete in under 10ms
    });
  });

  describe('Memory Usage', () => {
    it('should not cause memory leaks with repeated operations', () => {
      const initialMemory = process.memoryUsage().heapUsed;

      // Perform many operations
      for (let i = 0; i < 10000; i++) {
        sanitizeString(`<script>alert("xss")</script>Test string ${i}`);
        generateCSRFToken();
        sanitizeMongoQuery({ test: `<script>alert("xss")</script>value ${i}` });
      }

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be reasonable (less than 10MB)
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
    });
  });

  describe('Concurrent Operations', () => {
    it('should handle concurrent sanitization operations', async () => {
      const operations = Array(100)
        .fill(null)
        .map((_, i) =>
          sanitizeString(`<script>alert("xss")</script>String ${i}`)
        );

      const startTime = performance.now();

      await Promise.all(operations);

      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
    });
  });
});
