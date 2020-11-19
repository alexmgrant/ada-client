Input example:

```jsx
import React, {useState} from 'react';
const [value, setValue] = useState('');
<>
<Input placeholder="Search" onInputChange={(val) => setValue(val)} />

<p>Input value: {value}</p>
</>
```