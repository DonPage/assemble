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
