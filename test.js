import test from 'ava';
import assemble from '.';

test('buildConfig will take env variables for browser, server, and project.', t => {
	const customConfig = {
		server: 'browserstack.com',
		browser: 'Chrome',
		project: 'ENV-CONFIG'
	};
	process.env.SERVER = customConfig.server;
	process.env.BROWSER = customConfig.browser;
	process.env.PROJECT = customConfig.project;
	const buildConfig = assemble(true).buildConfig;
	t.true(buildConfig.browser === customConfig.browser);
	t.true(buildConfig.server === customConfig.server);
	t.true(buildConfig.project === customConfig.project);
});

test('buildConfig will take user config for browser, server, and project.', t => {
	const customConfig = {
		server: '172.0.0.1:4444',
		browser: 'Safari',
		project: 'USER-CONFIG'
	};
	const buildConfig = assemble(true, customConfig).buildConfig;
	t.true(buildConfig.server === customConfig.server);
	t.true(buildConfig.browser === customConfig.browser);
	t.true(buildConfig.project === customConfig.project);
});

test('buildConfig will overwrite default build for user build', t => {
	const customConfig = {build: 'USER-BUILD'};
	const buildConfig = assemble(true, customConfig).buildConfig;
	t.true(buildConfig.build === customConfig.build);
});

test('buildConfig will take in browserName, browser_version, and os_version if os is passed in.', t => {
	const customConfig = {
		browser: 'Edge',
		// eslint-disable-next-line camelcase
		browser_version: '14.0',
		os: 'Windows',
		// eslint-disable-next-line camelcase
		os_version: '10'
	};
	const buildConfig = assemble(true, customConfig).buildConfig;
	// customConfig.browser will be put into buildConfig.device.browserName.
	t.true(customConfig.browser === buildConfig.device.browserName);
	t.true(customConfig.browser_version === buildConfig.device.browser_version);
	t.true(customConfig.os === buildConfig.device.os);
	t.true(customConfig.os_version === buildConfig.device.os_version);
});
