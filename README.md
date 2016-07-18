# hack

[![npm version](https://img.shields.io/npm/v/hack.svg?style=flat-square)](https://npmjs.com/package/hack) [![npm downloads](https://img.shields.io/npm/dm/hack.svg?style=flat-square)](https://npmjs.com/package/hack) [![Gitter](https://img.shields.io/gitter/room/egoist/hack.svg?style=flat-square)](https://gitter.im/egoist/hack)

Dead simple CSS framework. 

## Install

```bash
$ npm install --save hack
```

Option #1: Use any pre-processor

```js
import 'hack'
```

Option #2: hot-link the css file ([npmcdn](http://npmcdn.com/hack)):

```html
<link rel="stylesheet" href="/path/to/hack.css">

<!-- markdown mode -->
<body class="hack"></body>

<!-- standard mode -->
<link rel="stylesheet" href="/path/to/standard.css">
<body class="standard"></body>

<!-- dark mode -->
<link rel="stylesheet" href="/path/to/dark.css">
<body class="hack dark"></body>
```

For more usages and style guideline head to [hackcss.com](http://hackcss.com/) 🎉

## Dist

```bash
dist
├── [ 640]  dark.css
├── [8.7K]  hack.css
└── [ 457]  standard.cs
```

## Development

```bash
$ npm run dev

$ npm run build
```

## License

MIT &copy; [EGOIST](https://github.com/egoist)
