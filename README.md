# Kenteken, pls Browser Extension

## Installation

Install the latest version from the Chrome Webstore or Mozilla Addons depending on your browser.

* [Chrome Webstore](https://chrome.google.com/webstore/detail/kenteken-pls/ocofecjaanlckfpomkkbbanmlolgdkgh) for Google Chrome
* [Mozilla Addons](https://addons.mozilla.org/nl/firefox/addon/kenteken-pls/) for FireFox

## Development

### Requirements

* NodeJS 8.x or higher
* NPM 6.10 or higher

### Creating a production ready build

To create a production-ready build execute the following steps:

```sh
$ npm install
$ npm run build
```

The code will be bundled and minified, after this the full extension is available in the `extension/`-folder.