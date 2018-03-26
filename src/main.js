import Vue from 'vue';
import App from './App.vue';
import VScrollBar from '../VScrollBar';

Vue.use(VScrollBar, {
  top: 5,
  right: 5,
  bottom: 5,
  width: 7,
  // noHide: true
});

new Vue({
  el: '#app',
  render: h => h(App)
});
