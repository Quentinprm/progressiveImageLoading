import progressiveImageLoading from './ProgressiveImageLoading.vue';

module.exports = {
  install: function (Vue, options) {
    Vue.component('vue-progressive-image-loading', progressiveImageLoading);
  }
};