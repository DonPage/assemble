'use strict';
const selenium = require('selenium-webdriver');

// default config
const deConfig = {
	server: 'http://localhost:4444/wd/hub',
	browser: 'Firefox',
	debug: false,
	video: true,
	realMobile: true,
	project: 'ProjectAssemble',
	creds: {
		user: '',
		key: ''
	},
	build: () => {
		const today = new Date();
		return `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
	}
};

const _targets = {
	browserstack: 'browserstack',
	local: 'local',
	grid: 'grid'
};

const _buildConfig = (config = {}) => {
	const builtConfig = {
		creds: {
			user: undefined,
			key: undefined
		}
	};
	// If nothing is set, lets set the ENV settings OR the defaults.
	builtConfig.browser =
		config.browser || process.env.BROWSER || deConfig.browser;
	builtConfig.server =
		config.server || process.env.SERVER || deConfig.server;
	builtConfig.project =
		config.project || process.env.PROJECT || deConfig.project;
	builtConfig.build =
		config.build || deConfig.build();

	// Browserstack automation settings.
	const configCreds = config.creds || {};
	builtConfig['browserstack.debug'] = config.debug || deConfig.debug;
	builtConfig['browserstack.video'] = config.video || deConfig.video;
	builtConfig['browserstack.user'] = configCreds.user || '';
	builtConfig['browserstack.key'] = configCreds.key || '';

	// Check to see if user passed in a device,
	// if so configure device settings.
	if (config.device) {
		builtConfig.browserName = builtConfig.browser;
		builtConfig.device = config.device;
		builtConfig.realMobile = config.realMobile || deConfig.realMobile;
	}

	if (config.os) {
		builtConfig.browserName = builtConfig.browser;
		// eslint-disable-next-line camelcase
		builtConfig.browser_version = config.browser_version || null;
		builtConfig.os = config.os;
		// eslint-disable-next-line camelcase
		builtConfig.os_version = config.os_version || null;
	}

	return builtConfig;
};

const _determineTargetServer = config => {
	config.server = config.server.toLowerCase().trim();

	if (config.server.includes('localhost')) {
		return _targets.local;
	} else if (config.server.includes('browserstack')) {
		return _targets.browserstack;
	}

	return _targets.grid;
};

module.exports = (config = {}) => {
	const build = new selenium.Builder();

	// We need to determine what the target server is based on buildConfig
	// (local, browserstack, or grid)
	const builtConfig = _buildConfig(config);
	if (_determineTargetServer(builtConfig) === _targets.local) {
		build.usingServer(builtConfig.server);
		build.forBrowser(builtConfig.browser.toLowerCase());
	} else if (_determineTargetServer(builtConfig) === _targets.browserstack) {
		build.usingServer('http://hub-cloud.browserstack.com/wd/hub');
		build.withCapabilities(builtConfig);
	} else {
		console.log(`could not find build target.`);
	}

	return {
		conf: config,
		builder: null,
		buildConfig: _buildConfig(config),
		server: _determineTargetServer(builtConfig),
		test: require('selenium-webdriver/testing'),
		webdriver: () => build.build()
	};
};
