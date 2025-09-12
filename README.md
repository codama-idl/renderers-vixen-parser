# Codama ➤ Renderers ➤ Vixen Parser

[![npm][npm-image]][npm-url]
[![npm-downloads][npm-downloads-image]][npm-url]

[npm-downloads-image]: https://img.shields.io/npm/dm/@codama/renderers-vixen-parser.svg?style=flat
[npm-image]: https://img.shields.io/npm/v/@codama/renderers-vixen-parser.svg?style=flat&label=%40codama%2Frenderers-vixen-parser
[npm-url]: https://www.npmjs.com/package/@codama/renderers-vixen-parser

This package renders Yellowstone account and instruction parsers.

## Installation

```sh
pnpm install @codama/renderers-vixen-parser
```

## Usage

Add the following script to your Codama configuration file.

```json
{
    "scripts": {
        "demo": {
            "from": "@codama/renderers-vixen-parser",
            "args": [
                {
                    "projectFolder": ".",
                    "projectName": "myProgram"
                }
            ]
        }
    }
}
```
