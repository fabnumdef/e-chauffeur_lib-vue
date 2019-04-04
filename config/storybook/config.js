/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@storybook/vue';

// @todo: Find a way to add stories from @fabnumdef/design-system
// I've tried to add a require.context, but without success, same thing when I try to add cache key
const req = require.context('../../src/stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => (req(filename).default ? req(filename).default() : req(filename)));
}

configure(loadStories, module);
