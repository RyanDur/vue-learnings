import Vue from 'vue';
import App from './view/App.vue';

export const app = ({modules = {}}) => new Vue({
  el: '#app',
  render: h => h(App),
  provide: modules
});