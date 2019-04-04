/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { add as addDSStories } from '@fabnumdef/design-system/src/stories/atoms/button.stories';
import cButton from '../../components/atoms/button.vue';

export default () => {
  addDSStories(storiesOf('Atoms/Button', module), cButton);
};
