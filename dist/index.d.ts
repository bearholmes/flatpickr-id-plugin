import { Plugin } from 'flatpickr/dist/types/options';
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
declare function idPlugin(config?: IdPluginConfig): Plugin;
export default idPlugin;
