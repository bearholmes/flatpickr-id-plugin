import { Plugin } from 'flatpickr/dist/types/options';
import type { Instance } from 'flatpickr/dist/types/instance';

/**
 * Attributes that will be transferred from the original input to the flatpickr-generated input
 */
const TRANSFERABLE_ATTRIBUTES = [
  'id',
  'title',
  'aria-label',
  'aria-labelledby',
] as const;

/**
 * Delay in milliseconds before transferring attributes
 * This ensures flatpickr has fully initialized its DOM elements
 */
const ATTRIBUTE_TRANSFER_DELAY_MS = 10;

/**
 * Configuration options for the idPlugin
 */
export interface IdPluginConfig {
  /**
   * Custom delay in milliseconds before transferring attributes
   * @default 10
   */
  delay?: number;

  /**
   * Custom list of attributes to transfer
   * @default ['id', 'title', 'aria-label', 'aria-labelledby']
   */
  attributes?: readonly string[];

  /**
   * Enable debug logging
   * @default false
   */
  debug?: boolean;
}

/**
 * flatpickr plugin that transfers ID and accessibility attributes from the original input
 * to the actual input element created by flatpickr (either mobileInput or altInput).
 *
 * This is useful for maintaining proper form labels, accessibility, and unique identifiers
 * when flatpickr replaces or hides the original input element.
 *
 * @param config - Optional configuration for the plugin
 * @returns flatpickr Plugin function
 *
 * @example
 * ```typescript
 * import flatpickr from 'flatpickr';
 * import idPlugin from 'flatpickr-id-plugin';
 *
 * flatpickr('#myInput', {
 *   plugins: [idPlugin()]
 * });
 * ```
 *
 * @example
 * ```typescript
 * // With custom configuration
 * flatpickr('#myInput', {
 *   plugins: [idPlugin({
 *     delay: 20,
 *     debug: true
 *   })]
 * });
 * ```
 */
function idPlugin(config: IdPluginConfig = {}): Plugin {
  const {
    delay = ATTRIBUTE_TRANSFER_DELAY_MS,
    attributes = TRANSFERABLE_ATTRIBUTES,
    debug = false,
  } = config;

  return (fp: Instance): Record<string, unknown> => {
    /**
     * Logs debug messages if debug mode is enabled
     */
    const log = (...args: unknown[]): void => {
      if (debug) {
        console.log('[flatpickr-id-plugin]', ...args);
      }
    };

    /**
     * Transfers attributes from source element to target element
     */
    const transferAttributes = (): void => {
      try {
        const sourceElement = fp.input;
        const targetElement = fp.mobileInput || fp.altInput;

        if (!targetElement) {
          log('No target element (mobileInput or altInput) found');
          return;
        }

        log('Transferring attributes from', sourceElement, 'to', targetElement);

        let transferredCount = 0;

        for (const attributeName of attributes) {
          const attributeValue = sourceElement.getAttribute(attributeName);

          if (attributeValue) {
            sourceElement.removeAttribute(attributeName);
            targetElement.setAttribute(attributeName, attributeValue);
            transferredCount++;
            log(`Transferred ${attributeName}="${attributeValue}"`);
          }
        }

        log(`Transfer complete: ${transferredCount} attributes transferred`);

        // Register plugin in loadedPlugins array
        if (fp.loadedPlugins && !fp.loadedPlugins.includes('idPlugin')) {
          fp.loadedPlugins.push('idPlugin');
        }
      } catch (error) {
        console.error(
          '[flatpickr-id-plugin] Error transferring attributes:',
          error,
        );
      }
    };

    return {
      /**
       * Called when flatpickr is ready
       * Transfers attributes after a short delay to ensure DOM is fully initialized
       */
      onReady(): void {
        setTimeout(transferAttributes, delay);
      },
    };
  };
}

export default idPlugin;
