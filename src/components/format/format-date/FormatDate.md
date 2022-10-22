With formatter component:

```js
import { FormatDate } from '@react-calmly/components';

// to get date only
<FormatDate value={new Date()} preset={DATE_FORMAT.DATE} />;

// to get date with time
<FormatDate value={new Date()} preset={DATE_FORMAT.DATE_TIME} />;

// to get date with time and day of the week
<FormatDate value={new Date()} preset={DATE_FORMAT.DATE_TIME_WITH_WEEK_DAY} />;

// to get date in short format (for internal usage mostly)
<FormatDate value={new Date()} preset={DATE_FORMAT.SHORT_DATE} />;

// to get time only
<FormatDate value={new Date()} preset={DATE_FORMAT.TIME} />;

// to get time only (with seconds)
<FormatDate value={new Date()} preset={DATE_FORMAT.TIME_WITH_SECONDS} />;

// to get relative time (time ago)
<FormatDate value={new Date()} preset={DATE_FORMAT.TIME_AGO} />;
```

With hook:

```js
import { useFormat } from '@react-calmly/components';
const { formatDate } = useFormat();

// to get date only
const str1 = formatDate(new Date(), DATE_FORMAT.DATE);

// to get date with time
const str3 = formatDate(new Date(), DATE_FORMAT.DATE_TIME);

// to get date with time and day of the week
const str4 = formatDate(new Date(), DATE_FORMAT.DATE_TIME_WITH_WEEK_DAY);

// to get date in short format (for internal usage mostly)
const str5 = formatDate(new Date(), DATE_FORMAT.SHORT_DATE);

// to get time only
const str6 = formatDate(new Date(), DATE_FORMAT.TIME);

// to get time only (with seconds)
const str7 = formatDate(new Date(), DATE_FORMAT.TIME_WITH_SECONDS);

// to get relative time (time ago)
const str8 = formatDate(new Date(), DATE_FORMAT.TIME_AGO);
```
