# assemble

> Standalone builder for Selenium-webdriver.


## Install

```
$ npm install --save assemble
```


## Usage

```js
const buildConfig = {
	server: 'http://localhost:4444/wd/hub',
	browser: 'Chrome'
}
const assemble = require('assemble');

assemble(buildConfig);
//=> WebDriver instance
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
| creds |  `Object` | ~ | User and Key |





### StackObject
_Browserstack example configs: https://www.browserstack.com/automate/node#setting-os-and-browser_
```js
// example desktop config
const windows_7_IE11 = {
  'browserName' : 'IE',
  'browser_version' : '11.0',
  'os' : 'Windows',
  'os_version' : '10',
};
// OR example mobile config
const android_nexus6_Chrome = {
  'browserName' : 'android',
  'platform' : 'ANDROID',
  'device' : 'Google Nexus 5'
};
```



## License

MIT © [](https://github.com/DonPage)
