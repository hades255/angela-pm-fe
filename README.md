- [figma](https://www.figma.com/design/4aUX4ImUNJ4A9f5G8z00Fh/Untitled?node-id=0-1&node-type=canvas&t=RKhPDXYj6GM8tbou-0)
- [github](https://github.com/hades255/angela-pm-fe)

## Necessary APIs

### For Customers

<details open>
  <summary>
    login
  </summary>

method: `get`

request:

```
name: String
```

response:

```js
user: {
  id: Number,
  name: String,
  avatar: String
},
admin: {
  id: Number,
  name: String,
  avatar: String
},
messages: [
  {
    room: String,
    id: Number,
    text: String,
    from: {
      id: Number,
      name: String,
      avatar: String
    },
    to: {
      id: Number,
      name: String,
      avatar: String
    },
    attachments: Array,
    created_at: Datetime,
    updated_at: Datetime,
    status: Enum["read", "unreaad"],
  }
]
```

</details>

### For Admin

<details>
  <summary>
    login
  </summary>

method: `get`

request:

```
name: String
```

response:

```js
user: {
  id: Number,
  name: String,
  avatar: String
},
admin: {
  id: Number,
  name: String,
  avatar: String
},
users: [  //  except admin
  {
    id: Number,
    name: String,
    avatar: String
  }
]
messages: [
  {
    room: String,
    id: Number,
    text: String,
    from: {
      id: Number,
      name: String,
      avatar: String
    },
    to: {
      id: Number,
      name: String,
      avatar: String
    },
    attachments: Array,
    created_at: Datetime,
    updated_at: Datetime,
    status: Enum["read", "unreaad"],
  }
]
```

</details>

### Common

- file upload