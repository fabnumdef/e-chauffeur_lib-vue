import Vue from 'vue';
// eslint-disable-next-line import/no-unresolved,import/extensions
import StateMachine from '<%=options.pkg.name%>/api/status';


export default () => {
  Vue.mixin({
    methods: {
      stateCanChange(current, projection) {
        return StateMachine(current).can(projection);
      },
      getTransitions(status) {
        return StateMachine(status).transitions();
      },
    },
  });
};
