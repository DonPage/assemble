import test from 'ava';
import assemble from '.';

test('_buildConfig', t => {
	const a = assemble(true);
	console.log(`a.buildConfig`);
	console.log(a.buildConfig);
	t.true(true);
});
