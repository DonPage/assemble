# assemble

> Standalone builder for Selenium-webdriver. Assemble makes it easy to get a webdriver instance with minimal configurations.


## Install

```
$ npm install --save assemble-driver
```


## Usage

```js
const buildConfig = {
	server: 'http://localhost:4444/wd/hub',
	browser: 'Chrome'
}
const assemble = require('assemble');

assemble(buildConfig).webdriver();
//=> Selenium WebDriver instance
```


## API

### assemble([buildConfig])

#### buildConfig

_These options should be a json format._

| Option | Type | Default | Description |
| ---- | ----------- | ----------- | ----------- |
| server | `string` | http://localhost:4444/wd/hub | Target host for test. |
| browser | `string` | Firefox | Target browser. |
| browser_version | `string` | ~ | Browser version. Will use current latest version if not set.
| os | `string` | ~ | Operating System. |
| os_version | `string` | ~ | OS version. |
| device | `string` | ~ | Device. |
| debug | `boolean` | false | Debug mode. |
| video | `boolean` | true | Record browser. (browserstack) |
| project | `string` | ProjectAssemble | Project Name |
| build | `string` | (today's date) | Build Name |
| creds |  `Object` | ~ | Cloud or grid creds: `{user, key}` |


## License

MIT © [](https://github.com/DonPage)
