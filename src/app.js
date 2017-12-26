import Vue from 'vue';
import App from './view/App.vue';
import {MenuCommand} from './core/commands';

export const app = (modules = {
  menuCommand: MenuCommand({endpoint: '/api/get-me-a-menu'})
}) => new Vue({
  el: '#app',
  render: h => h(App),
  provide: modules
});