# flatpickr-id-plugin

[Forked labelPlugin of flatpickr.](https://github.com/flatpickr/flatpickr/blob/master/src/plugins/labelPlugin/labelPlugin.ts)

You can control the id property on the flatpickr element.

## Use

```vue
// 'id', 'title', 'aria-label', 'aria-labelledby'

<flat-pickr id="write_id" />
```

```javascript
import IdPlugin from 'flatpickr-id-plugin';

// flatpickr config
{
    "plugins": [new IdPlugin()]
}
```
