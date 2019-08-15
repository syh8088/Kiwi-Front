import Vue from 'vue'
import router from './router'

import BootstrapVue from "bootstrap-vue"

import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';
import VeeValidate from 'vee-validate'
import ko from 'vee-validate/dist/locale/ko.js'

import service from './service'
import Common from './common/Common.js'

Vue.config.productionTip = false;

ko.attributes.email = '이메일'
ko.attributes.title = '제목'
ko.attributes.phone = '연락처'
ko.attributes.content = '내용'
ko.messages.email = (field) => `올바른 이메일 형식이어야 합니다.`
ko.messages.numeric = (field) => `숫자만 입력이 가능합니다!`
ko.messages.url = (field) => `유효한 url이 아닙니다!`
ko.messages.included = (field) => `${field}를 선택해주세요!`
ko.messages.max = (field, e) => `${field}은/는 ${e[0]}자 이내로 입력 할수 있습니다!`
ko.messages.between = (field, e) => `${field} 입력 가능범위:${e[0]}~${e[1]}`
//ko.messages.required = (field) => `${field}을/를 입력해 주세요.`
ko.messages.required = (field) => `${Common.getRequiredErrorMassege(field)}`
ko.messages.decimal = (field) => `${Common.getRequiredErrorMassege(field)}`

const config = {
  locale: 'ko',
  dictionary: {
    ko
  }
};

Vue.use(VeeValidate, config);

Vue.use(BootstrapVue);
Vue.use(service);
Vue.use(Common);

Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
