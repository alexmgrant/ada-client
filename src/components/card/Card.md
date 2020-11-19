Card Example:

```jsx
<Card>A simple card</Card>
```

Card with Link

```jsx
import React from 'react';
import Link from '../link/Link';
<Link>
    <Card>
        <a>
          List item link
        </a>
    </Card>
</Link>
```

Card with secondary Card

```jsx
<Card>
    <p>Text</p>
    <Card secondary="true">Template string</Card>
</Card>
```
