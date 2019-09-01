<template>
  <div id="app">

      <transition name="toast">
          <div class="toast-pc on" style="margin-bottom: 22px;" v-if="toastShow">
              <p>{{ toastText }}</p>
          </div>
      </transition>

    <component :is="layout">
        <transition name="fade" mode="out-in">
            <router-view :key="$route.fullPath"></router-view>
        </transition>
    </component>
  </div>
</template>

<script>
  const default_layout = "default";

  export default {
    computed: {
      layout() {
        return (this.$route.meta.layout || default_layout) + '-layout';
      },
    },
    data() {
      return {
          toastShow: false,
      }
    },
    created() {
      this.$eventBus.$on('toast', this.toastReceive);
      this.$eventBus.$on('location', this.locationReceive);
    },
    methods: {
        toastReceive: function(isToast, text, duration) {
            this.toastText = text
            this.toastShow = isToast

            setTimeout(function () {
                this.toastShow = !isToast;
                this.toastText = ''
            }.bind(this), duration);
        },
        locationReceive: function(where) {
            this.$router.push({name: where});
        },
    }
  }
</script>

<style lang="scss">
  @import "assets/base.scss";
  /* pc 버전 토스트 팝업 */
  .toast-pc{display:none;position:absolute;padding:0.95em 1.05em;border-radius:4px;background:#183661;font-size:14px;color:#efefef;bottom:0;left:50%;z-index:10;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);-moz-transform:translateX(-50%);transform:translateX(-50%);opacity:0.95;line-height:1.5}
  .toast-pc.on{display:block}
</style>
