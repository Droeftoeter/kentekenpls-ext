# Kenteken, pls Browser Extension

## Installation

Install the latest version from the Chrome Webstore or Mozilla Addons depending on your browser.

* [Chrome Webstore](https://chrome.google.com/webstore/detail/kenteken-pls/ocofecjaanlckfpomkkbbanmlolgdkgh) for Google Chrome
* [Mozilla Addons](https://addons.mozilla.org/nl/firefox/addon/kenteken-pls/) for FireFox

## Usage

* Right click any input field (or focus on one and press `Alt`+`Shift`+`k`) and pick **Kenteken invoegen**
* Move through the categories until the icon changes to an input-box
* Click on the item or press `Enter` or `➞`
* The extension will pick a random license plate from within the selected category and insert it into the input field


## Development

### Requirements

* Docker

### Local development

Start a build process that continuously watches the code and (re)builds the extension

```sh
$ docker-compose run node npm install
$ docker-compose run node npm run watch
```

After the initial build is complete, load the unpacked extension into your favorite browser

#### Chrome

* Browse to [chrome://extensions](chrome://extensions)
* Click on **Load unpacked extension**
* Browse to the `extension/` folder and select it
* The development version of this extension is now loaded.

#### Firefox

* Browse to [about:debugging](about:debugging)
* Switch to the **This Firefox** tab
* Click on **Load Temporary Add-on**
* Browse to the `extension/` folder and select it
* The development version of this extension is now loaded.

#### Microsoft Edge

* Browse to [edge://extensions](edge://extensions)
* Click on **Load unpacked**
* Browse to the `extension/` folder and select it
* The development version of this extension is now loaded.

### Creating a production ready build

To create a production-ready build execute the following steps:

```sh
$ docker-compose run node npm install
$ docker-compose run node npm run build
```

The code will be bundled and minified, after this the full extension is available in the `extension/`-folder.
