import idPlugin from '../index';
import type { Hook } from 'flatpickr/dist/types/options';
import type { Instance } from 'flatpickr/dist/types/instance';

describe('idPlugin', () => {
  let mockFlatpickr: Partial<Instance>;
  let mockInput: HTMLInputElement;
  let mockAltInput: HTMLInputElement;
  let mockMobileInput: HTMLInputElement;

  type PluginHooks = {
    onReady?: Hook | Hook[];
  };

  const invokeOnReady = (hooks: PluginHooks, instance: Instance): void => {
    const { onReady } = hooks;

    const execute = (hook: Hook): void => {
      hook([], '', instance);
    };

    if (Array.isArray(onReady)) {
      onReady.forEach((hook) => execute(hook));
      return;
    }

    if (onReady) {
      execute(onReady);
    }
  };

  beforeEach(() => {
    // Create mock input elements
    mockInput = document.createElement('input');
    mockAltInput = document.createElement('input');
    mockMobileInput = document.createElement('input');

    // Setup mock flatpickr instance
    mockFlatpickr = {
      input: mockInput,
      altInput: mockAltInput,
      mobileInput: undefined,
      loadedPlugins: [],
    } as Partial<Instance>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Default behavior', () => {
    it('should return a plugin function', () => {
      const plugin = idPlugin();
      expect(typeof plugin).toBe('function');
    });

    it('should return plugin hooks when called with flatpickr instance', () => {
      const plugin = idPlugin();
      const hooks = plugin(mockFlatpickr as Instance) as PluginHooks;
      expect(hooks).toHaveProperty('onReady');
      expect(typeof hooks.onReady).toBe('function');
    });

    it('should transfer id attribute to altInput', (done) => {
      mockInput.setAttribute('id', 'test-id');

      const plugin = idPlugin();
      const hooks = plugin(mockFlatpickr as Instance) as PluginHooks;

      invokeOnReady(hooks, mockFlatpickr as Instance);

      setTimeout(() => {
        expect(mockInput.getAttribute('id')).toBeNull();
        expect(mockAltInput.getAttribute('id')).toBe('test-id');
        done();
      }, 20);
    });

    it('should transfer title attribute to altInput', (done) => {
      mockInput.setAttribute('title', 'Test Title');

      const plugin = idPlugin();
      const hooks = plugin(mockFlatpickr as Instance) as PluginHooks;

      invokeOnReady(hooks, mockFlatpickr as Instance);

      setTimeout(() => {
        expect(mockInput.getAttribute('title')).toBeNull();
        expect(mockAltInput.getAttribute('title')).toBe('Test Title');
        done();
      }, 20);
    });

    it('should transfer aria-label attribute to altInput', (done) => {
      mockInput.setAttribute('aria-label', 'Select date');

      const plugin = idPlugin();
      const hooks = plugin(mockFlatpickr as Instance) as PluginHooks;

      invokeOnReady(hooks, mockFlatpickr as Instance);

      setTimeout(() => {
        expect(mockInput.getAttribute('aria-label')).toBeNull();
        expect(mockAltInput.getAttribute('aria-label')).toBe('Select date');
        done();
      }, 20);
    });

    it('should transfer aria-labelledby attribute to altInput', (done) => {
      mockInput.setAttribute('aria-labelledby', 'label-id');

      const plugin = idPlugin();
      const hooks = plugin(mockFlatpickr as Instance) as PluginHooks;

      invokeOnReady(hooks, mockFlatpickr as Instance);

      setTimeout(() => {
        expect(mockInput.getAttribute('aria-labelledby')).toBeNull();
        expect(mockAltInput.getAttribute('aria-labelledby')).toBe('label-id');
        done();
      }, 20);
    });

    it('should transfer multiple attributes to altInput', (done) => {
      mockInput.setAttribute('id', 'test-id');
      mockInput.setAttribute('title', 'Test Title');
      mockInput.setAttribute('aria-label', 'Select date');

      const plugin = idPlugin();
      const hooks = plugin(mockFlatpickr as Instance) as PluginHooks;

      invokeOnReady(hooks, mockFlatpickr as Instance);

      setTimeout(() => {
        expect(mockInput.getAttribute('id')).toBeNull();
        expect(mockInput.getAttribute('title')).toBeNull();
        expect(mockInput.getAttribute('aria-label')).toBeNull();

        expect(mockAltInput.getAttribute('id')).toBe('test-id');
        expect(mockAltInput.getAttribute('title')).toBe('Test Title');
        expect(mockAltInput.getAttribute('aria-label')).toBe('Select date');
        done();
      }, 20);
    });
  });

  describe('Mobile input priority', () => {
    it('should prefer mobileInput over altInput when both exist', (done) => {
      mockFlatpickr.mobileInput = mockMobileInput;
      mockInput.setAttribute('id', 'mobile-id');

      const plugin = idPlugin();
      const hooks = plugin(mockFlatpickr as Instance) as PluginHooks;

      invokeOnReady(hooks, mockFlatpickr as Instance);

      setTimeout(() => {
        expect(mockInput.getAttribute('id')).toBeNull();
        expect(mockMobileInput.getAttribute('id')).toBe('mobile-id');
        expect(mockAltInput.getAttribute('id')).toBeNull();
        done();
      }, 20);
    });
  });

  describe('Edge cases', () => {
    it('should handle when no target input exists', (done) => {
      mockFlatpickr.altInput = undefined;
      mockFlatpickr.mobileInput = undefined;
      mockInput.setAttribute('id', 'test-id');

      const plugin = idPlugin();
      const hooks = plugin(mockFlatpickr as Instance) as PluginHooks;

      invokeOnReady(hooks, mockFlatpickr as Instance);

      setTimeout(() => {
        // Original attribute should remain since there's no target
        expect(mockInput.getAttribute('id')).toBe('test-id');
        done();
      }, 20);
    });

    it('should not fail when input has no transferable attributes', (done) => {
      const plugin = idPlugin();
      const hooks = plugin(mockFlatpickr as Instance) as PluginHooks;

      expect(() => {
        invokeOnReady(hooks, mockFlatpickr as Instance);
      }).not.toThrow();

      setTimeout(() => {
        expect(mockAltInput.getAttribute('id')).toBeNull();
        done();
      }, 20);
    });

    it('should add plugin to loadedPlugins array', (done) => {
      mockInput.setAttribute('id', 'test-id');

      const plugin = idPlugin();
      const hooks = plugin(mockFlatpickr as Instance) as PluginHooks;

      invokeOnReady(hooks, mockFlatpickr as Instance);

      setTimeout(() => {
        expect(mockFlatpickr.loadedPlugins).toContain('idPlugin');
        done();
      }, 20);
    });
  });

  describe('Custom configuration', () => {
    it('should use custom delay', (done) => {
      mockInput.setAttribute('id', 'test-id');

      const plugin = idPlugin({ delay: 50 });
      const hooks = plugin(mockFlatpickr as Instance) as PluginHooks;

      invokeOnReady(hooks, mockFlatpickr as Instance);

      // Should not be transferred yet after default delay
      setTimeout(() => {
        expect(mockInput.getAttribute('id')).toBe('test-id');
      }, 20);

      // Should be transferred after custom delay
      setTimeout(() => {
        expect(mockInput.getAttribute('id')).toBeNull();
        expect(mockAltInput.getAttribute('id')).toBe('test-id');
        done();
      }, 60);
    });

    it('should use custom attributes list', (done) => {
      mockInput.setAttribute('id', 'test-id');
      mockInput.setAttribute('data-custom', 'custom-value');
      mockInput.setAttribute('title', 'Test Title');

      const plugin = idPlugin({ attributes: ['id', 'data-custom'] });
      const hooks = plugin(mockFlatpickr as Instance) as PluginHooks;

      invokeOnReady(hooks, mockFlatpickr as Instance);

      setTimeout(() => {
        expect(mockInput.getAttribute('id')).toBeNull();
        expect(mockInput.getAttribute('data-custom')).toBeNull();
        expect(mockInput.getAttribute('title')).toBe('Test Title');

        expect(mockAltInput.getAttribute('id')).toBe('test-id');
        expect(mockAltInput.getAttribute('data-custom')).toBe('custom-value');
        expect(mockAltInput.getAttribute('title')).toBeNull();
        done();
      }, 20);
    });

    it('should log debug messages when debug is enabled', (done) => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      mockInput.setAttribute('id', 'test-id');

      const plugin = idPlugin({ debug: true });
      const hooks = plugin(mockFlatpickr as Instance) as PluginHooks;

      invokeOnReady(hooks, mockFlatpickr as Instance);

      setTimeout(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(
          expect.stringContaining('[flatpickr-id-plugin]'),
          expect.anything(),
        );
        consoleLogSpy.mockRestore();
        done();
      }, 20);
    });

    it('should not log when debug is disabled', (done) => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      mockInput.setAttribute('id', 'test-id');

      const plugin = idPlugin({ debug: false });
      const hooks = plugin(mockFlatpickr as Instance) as PluginHooks;

      invokeOnReady(hooks, mockFlatpickr as Instance);

      setTimeout(() => {
        expect(consoleLogSpy).not.toHaveBeenCalled();
        consoleLogSpy.mockRestore();
        done();
      }, 20);
    });
  });

  describe('Error handling', () => {
    it('should not throw when setAttribute fails', (done) => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      mockInput.setAttribute('id', 'test-id');

      // Mock setAttribute to throw
      const originalSetAttribute = mockAltInput.setAttribute;
      mockAltInput.setAttribute = jest.fn(() => {
        throw new Error('setAttribute failed');
      });

      const plugin = idPlugin();
      const hooks = plugin(mockFlatpickr as Instance) as PluginHooks;

      expect(() => {
        invokeOnReady(hooks, mockFlatpickr as Instance);
      }).not.toThrow();

      setTimeout(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining('[flatpickr-id-plugin]'),
          expect.any(Error),
        );

        mockAltInput.setAttribute = originalSetAttribute;
        consoleErrorSpy.mockRestore();
        done();
      }, 20);
    });
  });
});
