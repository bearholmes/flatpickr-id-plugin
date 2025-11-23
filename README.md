<div align="center">

# 🗓️ flatpickr-id-plugin

[![npm version](https://img.shields.io/npm/v/flatpickr-id-plugin.svg)](https://www.npmjs.com/package/flatpickr-id-plugin)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**A lightweight flatpickr plugin for transferring ID and accessibility attributes**

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [API](#api) • [Demo](#demo)

</div>

---

## 📋 Overview

`flatpickr-id-plugin` is a simple yet powerful plugin for [flatpickr](https://flatpickr.js.org/) that automatically transfers important attributes from your original input element to the flatpickr-generated input. This ensures proper form labels, accessibility features, and unique identifiers work correctly with flatpickr.

Inspired by [flatpickr's labelPlugin](https://github.com/flatpickr/flatpickr/blob/master/src/plugins/labelPlugin/labelPlugin.ts), this version adds TypeScript support, richer configuration, and more robust attribute handling.

<a id="features"></a>

## ✨ Features

- 🎯 **Automatic Attribute Transfer** - Transfers `id`, `title`, `aria-label`, and `aria-labelledby`
- ♿ **Accessibility First** - Maintains ARIA attributes for screen readers
- 🔧 **Highly Configurable** - Customize delay, attributes list, and debug mode
- 📱 **Mobile Support** - Works with both altInput and mobileInput modes
- 💪 **TypeScript Support** - Full type definitions included
- 🛡️ **Error Handling** - Comprehensive error handling and optional debug logging
- 📦 **Zero Dependencies** - Only requires flatpickr as peer dependency
- 🪶 **Lightweight** - ~2KB minified

<a id="installation"></a>

## 📦 Installation

### npm

```bash
npm install flatpickr-id-plugin
```

### yarn

```bash
yarn add flatpickr-id-plugin
```

### pnpm

```bash
pnpm add flatpickr-id-plugin
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/flatpickr-id-plugin/dist/index.js"></script>
```

<a id="usage"></a>

## 🚀 Usage

### Basic Usage

```javascript
import flatpickr from 'flatpickr';
import idPlugin from 'flatpickr-id-plugin';

flatpickr('#myDatePicker', {
  plugins: [idPlugin()],
});
```

```html
<input
  type="text"
  id="myDatePicker"
  title="Select a date"
  aria-label="Date picker"
  placeholder="Click to select date"
/>
```

### With Custom Configuration

```javascript
flatpickr('#myDatePicker', {
  plugins: [
    idPlugin({
      delay: 20, // Custom delay in ms
      attributes: ['id', 'title', 'data-custom'], // Custom attributes
      debug: true, // Enable debug logging
    }),
  ],
});
```

### TypeScript

```typescript
import flatpickr from 'flatpickr';
import idPlugin, { IdPluginConfig } from 'flatpickr-id-plugin';

const config: IdPluginConfig = {
  delay: 15,
  debug: true,
};

flatpickr('#myDatePicker', {
  plugins: [idPlugin(config)],
});
```

### Vue.js

```vue
<template>
  <input
    ref="datepicker"
    type="text"
    id="vueDatePicker"
    aria-label="Select date"
  />
</template>

<script>
import flatpickr from 'flatpickr';
import idPlugin from 'flatpickr-id-plugin';

export default {
  mounted() {
    flatpickr(this.$refs.datepicker, {
      plugins: [idPlugin()],
    });
  },
};
</script>
```

### React

```jsx
import { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import idPlugin from 'flatpickr-id-plugin';

function DatePicker() {
  const inputRef = useRef(null);

  useEffect(() => {
    flatpickr(inputRef.current, {
      plugins: [idPlugin()],
    });
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      id="reactDatePicker"
      aria-label="Select date"
      placeholder="Pick a date"
    />
  );
}
```

<a id="api"></a>

## 📖 API

### `idPlugin(config?: IdPluginConfig)`

Creates a new instance of the plugin.

#### Configuration Options

| Option       | Type       | Default                                            | Description                                          |
| ------------ | ---------- | -------------------------------------------------- | ---------------------------------------------------- |
| `delay`      | `number`   | `10`                                               | Delay in milliseconds before transferring attributes |
| `attributes` | `string[]` | `['id', 'title', 'aria-label', 'aria-labelledby']` | List of attributes to transfer                       |
| `debug`      | `boolean`  | `false`                                            | Enable console logging for debugging                 |

#### Transferred Attributes

By default, the following attributes are transferred:

- **`id`** - Element identifier for labels and forms
- **`title`** - Tooltip text
- **`aria-label`** - Accessibility label for screen readers
- **`aria-labelledby`** - Reference to label element

<a id="demo"></a>

## 🎨 Demo

Try the deployed demo (pending Actions run) at https://bearholmes.github.io/flatpickr-id-plugin/examples/demo.html, or open `examples/demo.html` locally after running `npm run build` to inspect the plugin behavior:

```bash
git clone https://github.com/bearholmes/flatpickr-id-plugin.git
cd flatpickr-id-plugin
npm install
npm run build
# Open examples/demo.html in your browser
```

## 🛠️ Development

### Setup

```bash
npm install
```

### Build

```bash
npm run build          # Development build
npm run build:prod     # Production build with minification
npm run dev            # Watch mode
```

### Testing

```bash
npm test               # Run tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

### Type Checking

```bash
npm run typecheck
```

### Formatting

```bash
npm run format         # Format all files
npm run format:check   # Check formatting
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT © [bearholmes](https://github.com/bearholmes)

## 🔗 Links

- [flatpickr](https://flatpickr.js.org/) - The amazing date picker library
- [Original labelPlugin](https://github.com/flatpickr/flatpickr/blob/master/src/plugins/labelPlugin/labelPlugin.ts) - Source of inspiration
- [GitHub Repository](https://github.com/bearholmes/flatpickr-id-plugin)
- [npm Package](https://www.npmjs.com/package/flatpickr-id-plugin)
- [Issue Tracker](https://github.com/bearholmes/flatpickr-id-plugin/issues)

## 🙏 Acknowledgments

Inspired by flatpickr's labelPlugin with enhancements including:

- TypeScript support
- Configurable options
- Enhanced error handling
- Comprehensive test coverage
- Better documentation

---

<div align="center">

Made with ❤️ by [bearholmes](https://github.com/bearholmes)

If this plugin helped you, please ⭐ star the repository!

</div>
