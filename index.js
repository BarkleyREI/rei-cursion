'use strict';

/* Inspired by ninety-six/mono-fractal */

const mandelbrot = require('@frctl/mandelbrot');
const _ = require('lodash');

/*
 * Required config overrides incoming options
 * Note: styles array is merged
 */
const requiredConfig = {
	styles: [
		'default',
		'/themes/rei-cursion/recur.css'
	],
	scripts: ['default']
};

module.exports = (options, mode) => {

	/*
	* Configure the theme
	*/
	const styles = _.union(requiredConfig.styles, options.styles || []);
	const scripts = _.union(requiredConfig.scripts, options.scripts || []);

	const config = _.defaultsDeep({
		skin: 'black',
		styles: styles,
		scripts: scripts,
		format: 'json',
		highlightStyles: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/default.min.css',
		information: []
	}, _.clone(options || {}));

	config.panels = config.panels || ['notes', 'info'];
	config.devpanels = config.devpanels || ['info', 'notes', 'html', 'context', 'audit'];

	if (mode !== 'development') {
		// Production settings
		config.labels = {
			panels: {
				info: 'Preview'
			}
		};
	} else {
		// Development settings
		config.panels = config.devpanels;
	}

	config.nav = config.nav || ['search', 'docs', 'components', 'information'];
	config.favicon = config.favicon || '/themes/rei-cursion/favicon.ico';

	/*
	 * Configure the theme
	 */
	const subTheme = mandelbrot(config);

	/*
	 * Specify a template directory to override any view templates
	 */
	subTheme.addLoadPath(__dirname + '/views');

	/*
	 * Specify the static assets directory that contains the custom stylesheet.
	 */
	subTheme.addStatic(__dirname + '/assets', '/themes/rei-cursion');

	/*
	 * Export the customised theme instance so it can be used in Fractal projects
	 */
	return subTheme;

};
