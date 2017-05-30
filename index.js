'use strict';



module.exports = (selenium, config = {}) => {

	if (!selenium) {
		throw new TypeError(`Expected Selenium to be passed in.`);
	}

	return config;
};


// default config
const _config = {
	server: 'http://localhost:4444/wd/hub',
	browser: 'Firefox',
	debug: false,
	video: true,
	project: 'ProjectAssemble',
	creds: {
		user: '',
		key: ''
	},
	build: () => {
		const today = new Date();
		return `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`
	}
};

const _buildConfig = (config = {}) => {
	const builtConfig = {};
	// If nothing is set, lets set the ENV settings OR the defaults.
	builtConfig.browser =
		config.browser || process.env.BROWSER || _config.browser;
	builtConfig.server =
		config.server || process.env.SERVER || _config.server;
	builtConfig.project =
		config.project || process.env.PROJECT || _config.project;
	builtConfig.build =
		config.build || _config.build();

	// Browserstack automation settings.
	builtConfig['browserstack.debug'] = config.debug || _config.debug;
	builtConfig['browserstack.video'] = config.video || _config.video;
	builtConfig['browserstack.user'] = config.creds.user || '';
	builtConfig['browserstack.key'] = config.creds.key || '';

	// Check to see if user passed in a device,
	// if so configure device settings.
	if (config.device) {
		builtConfig.device.browserName = builtConfig.browser;
		builtConfig.device.device = config.device;
	}

	if (config.os) {
		builtConfig.device.browserName = builtConfig.browser;
		builtConfig.device.browser_version = config.browser_version || null;
		builtConfig.device.os = config.os;
		builtConfig.device.os_version = config.os_version || null;
	}





};


