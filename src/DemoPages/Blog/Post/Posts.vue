<template>
  <div>
    <page-title :heading=heading :subheading=subheading :icon=icon></page-title>

    <div class="content" style="height:800px" >
        <div class="row"  id="list-container" v-scroll:throttle="{fn: onScroll, throttle: 400 }" >


          <div class="col-md-4" v-for="item in items" >
            <div class="mb-3 card card-body" >
              <h5 class="card-title">{{ item.title }}</h5>
              {{ item.content }}
              <button class="btn btn-primary mt-2" @click="movePostView(item.postNo)">보기</button>
            </div>
          </div>



        </div>
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
      page: 1,
      limit: 5,
      totalPages: 0,
      categoryNo: 0
    }),

    beforeCreate() {
    },
    mounted() {
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
      onScroll(e, position) {
        console.log(position.scrollTop);
        console.log(document.getElementById('list-container').scrollHeight - 300);

        if(position.scrollTop >= (document.getElementById('list-container').scrollHeight - 300)) {
          this.page+=1
          if(this.totalPages >= this.page) {
            this.getPosts()
          }
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
              this.items = [];
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
