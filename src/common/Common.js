(function() {

  module.exports = {


    install: function (Vue) {
      Vue.prototype.$common = this;
      Vue.common = this;
    },
    blind: function(zIndex) {

      let frame;

      return {
        draw: () => {
          if(document) {

            this.frame = document.createElement('div');
            document.body.appendChild(this.frame);

            this.frame.style.position = 'fixed';
            this.frame.style.width = parseInt(document.body.scrollWidth);
            this.frame.style.height = parseInt(document.body.clientHeight);
            this.frame.style.zIndex = zIndex || 1;
            this.frame.style.left = 0;
            this.frame.style.top = 0;
            this.frame.style.background = "rgba(0,0,0,0.5)";
            this.frame.style.width = "100%";
            this.frame.style.height = "100%";

            try {
              //   this.resizing();
              //   Event.observe(window, 'resize', this.resizing.bind(this));
            }
            catch(e) {
              //FF 3.6.13 error
              //alert(e.message);
            }

          }
        },
        remove: () => {
          if(this.frame) this.frame.remove();
        }
      };


    },


  };



})();
