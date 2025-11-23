/**
 * Attributes that will be transferred from the original input to the flatpickr-generated input
 */
const TRANSFERABLE_ATTRIBUTES = [
    'id',
    'title',
    'aria-label',
    'aria-labelledby',
];
/**
 * Delay in milliseconds before transferring attributes
 * This ensures flatpickr has fully initialized its DOM elements
 */
const ATTRIBUTE_TRANSFER_DELAY_MS = 10;
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
function idPlugin(config = {}) {
    const { delay = ATTRIBUTE_TRANSFER_DELAY_MS, attributes = TRANSFERABLE_ATTRIBUTES, debug = false, } = config;
    return (fp) => {
        /**
         * Logs debug messages if debug mode is enabled
         */
        const log = (...args) => {
            if (debug) {
                console.log('[flatpickr-id-plugin]', ...args);
            }
        };
        /**
         * Transfers attributes from source element to target element
         */
        const transferAttributes = () => {
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
            }
            catch (error) {
                console.error('[flatpickr-id-plugin] Error transferring attributes:', error);
            }
        };
        return {
            /**
             * Called when flatpickr is ready
             * Transfers attributes after a short delay to ensure DOM is fully initialized
             */
            onReady() {
                setTimeout(transferAttributes, delay);
            },
        };
    };
}

export { idPlugin as default };
//# sourceMappingURL=index.js.map
