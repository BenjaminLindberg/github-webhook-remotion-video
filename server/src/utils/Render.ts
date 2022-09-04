import path from 'path';
import {bundle} from '@remotion/bundler';
import {getCompositions, renderMedia} from '@remotion/renderer';
import {v4 as uuid} from 'uuid';

const start = async (props: any) => {
	// The composition you want to render
	const compositionId = 'Composition';

	// You only have to do this once, you can reuse the bundle.
	const entry = 'remotion/src/index';
	console.log('Creating a Webpack bundle of the video');

	const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
		// If you have a Webpack override, make sure to add it here
		webpackOverride: (config: any) => config,
	});

	// Extract all the compositions you have defined in your project
	// from the webpack bundle.
	const comps = await getCompositions(bundleLocation, {
		// You can pass custom input props that you can retrieve using getInputProps()
		// in the composition list. Use this if you want to dynamically set the duration or
		// dimensions of the video.
		inputProps: props,
	});

	// Select the composition you want to render.
	const composition = comps[0];
	// Ensure the composition exists
	if (!composition) {
		throw new Error(`No composition with the ID ${compositionId} found.
  Review "${entry}" for the correct ID.`);
	}

	let id = uuid();
	const outputLocation = `out/${id}.mp4`;
	console.log('Attempting to render:', outputLocation);
	await renderMedia({
		composition,
		serveUrl: bundleLocation,
		codec: 'h264',
		outputLocation,
		inputProps: props,
	});
	console.log('Render done!');
	return id;
};

export default start;
