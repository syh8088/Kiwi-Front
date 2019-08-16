<template>
  <div>
    <page-title :heading=heading :subheading=subheading :icon=icon></page-title>

    <div class="content">
        <div class="row">


          <div class="col-md-4" v-for="item in items">
            <div class="mb-3 card card-body">
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
      limit: 10,
      totalPages: 0
    }),
    created() {
      this.getPosts();
    },
    methods: {
      movePostView(postNo) {
        this.$router.push({path:'/blog/postView/' + postNo});
      },
      getPosts() {
        let data = {
          sort: "DESC",
          order: "categoryNo",
          offset: this.page,
          limit: this.limit
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
            console.log(response.data);
          }

        }).catch(e => {
          console.log(e);
        });
      }

    }

  }
</script>
