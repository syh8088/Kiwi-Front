<template>
  <div>
    <page-title :heading=heading :subheading=subheading :icon=icon></page-title>

    <div class="content" style="height:800px">
        <div class="row" id="list-container" v-scroll:throttle="{fn: onScroll, throttle: 400 }">


          <div class="col-md-4" v-for="item in items">
            <div class="mb-3 card card-body" >
              <h5 class="card-title">{{ item.title }}</h5>
              {{ item.content }}
              <button class="btn btn-primary mt-2" @click="movePostView(item.postNo)">보기</button>
            </div>
          </div>



        </div>
    </div>


    <div id="viewLoading" style="display: none;">
      <img id="loading-image" src="http://xn--950br8e31tlycdyl0qd.kr/img/img-loading.gif" alt="Loading..." class="loading-image">
    </div>
  </div>
</template>

<script>

  import PageTitle from "../../../Layout/Components/PageTitle.vue";

  export default {
    components: {
      PageTitle,

    },
    data: () => ({
      heading: '포스트',
      subheading: 'Wide selection of cards with multiple styles, borders, actions and hover effects.',
      icon: 'pe-7s-stopwatch icon-gradient bg-amy-crisp',
      items: [],
      totalSize: 0,
      size: 0,
      page: 1,
      limit: 5,
      totalPages: 0,
      categoryNo: 0,
      flag: true

  }),

    beforeCreate() {
    },
    mounted() {
      document.addEventListener('scroll', this.onScroll);

      let href = document.location.href;
      let categoryNo = href.substr(href.lastIndexOf('/') + 1);

      if(isNaN(categoryNo)) {
        alert("잘못된 경로 입니다.");
      } else {
        this.categoryNo = categoryNo;
        this.getPosts();
      }
    },
    created () {
    },
    methods: {
      onScroll() {

        if(this.flag && document.documentElement.scrollTop + document.getElementsByClassName("app-footer__inner")[0].scrollHeight > document.body.scrollHeight - window.innerHeight) {
          this.page+=1;
          if(this.totalPages >= this.page) {
            this.getPosts();
          } else {
            this.flag = false;
          }
  /*
          if (this.flag === true && parseInt(this.size) < parseInt(this.totalSize) ) {
            //$('#viewLoading').fadeIn(500);
            this.flag = false;

            //$('#viewLoading').fadeOut(500);

            setTimeout(() => {
              console.log("POsts");
              this.getPosts();
              this.flag = true;
            }, 500);
          }*/

        }

      },
      movePostView(postNo) {
        this.$router.push({path:'/blog/postView/' + postNo});
      },
      getPosts() {

        if(this.categoryNo) {
          let data = {
            sort: "DESC",
            order: "categoryNo",
            offset: this.page,
            limit: this.limit,
            categoryNo: this.categoryNo
          };

          this.$api.getPosts(data).then(response => {
            if(response.status === 200 || response.status === 204) {
              //this.items = [];
              let postResponses = response.data.postResponses;

              let k = 0;
              let len = postResponses.length;
              for (; k < len ; k++ ) {

                let tags = postResponses[k].tags.map((tag) => {
                  return tag.name;
                });

                let data = {
                  no: k,
                  title: postResponses[k].title,
                  content: postResponses[k].content,
                  category: postResponses[k].category.name,
                  tags: tags.join(","),
                  createdAt: postResponses[k].createdAt,
                  updatedAt: postResponses[k].updatedAt,
                  state: (postResponses[k].useYn) ? "Y" : "N",
                  postNo: postResponses[k].postNo
                };

                this.items.push(data);
              }

              this.size = response.data.size;
              this.totalSize = response.data.totalElements;
              this.totalPages = response.data.totalPages;
            }

          }).catch(e => {
            console.log(e);
          });
        }

      }
    }
  }
</script>
<style>
  #viewLoading {width:100%;margin:0 auto 20px;text-align:center}
  #viewLoading>.loading-image{display:inline-block;max-width:100%;height:auto}
</style>
