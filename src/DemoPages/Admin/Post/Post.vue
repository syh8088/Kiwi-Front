<template>
    <div>
        <page-title :heading=heading :subheading=subheading :icon=icon></page-title>
        <b-card title="Example" class="main-card mb-4">
  <!--          <b-table :striped="striped"
                     :bordered="bordered"
                     :outlined="outlined"
                     :small="small"
                     :hover="hover"
                     :dark="dark"
                     :fixed="fixed"
                     :foot-clone="footClone"
                     :items="items"
                     :fields="fields">
            </b-table>-->

            <b-table :fields="fields" :items="items">
                <template slot="[title]" slot-scope="data">
                    <!-- `data.value` is the value after formatted by the Formatter -->
                    <a :href="`/admin/PostWrite?postNo=${data.item.postNo}`">{{ data.item.title }}</a>
                </template>
            </b-table>
        </b-card>
    </div>
</template>

<script>

    import PageTitle from "../../../Layout/Components/PageTitle.vue";

    export default {
        components: {
            PageTitle,
        },
        data: () => ({
            heading: 'post',
            subheading: 'Tables are the backbone of almost all web applications.',
            icon: 'pe-7s-drawer icon-gradient bg-happy-itmeo',

            fields: [ 'no', {
                // A column that needs custom formatting,
                // calling formatter 'fullName' in this app
                key: 'title',
                formatter: 'modify'
            }, 'category', 'tags', 'createdAt', 'updatedAt', 'state'],
            items: []
        }),
        created() {
            this.page = this.$route.query.page || 1;
            this.getPosts();
        },
        methods: {
            modify(postNo) {
               // this.$router.push({path:'/admin/PostWrite?postNo=' + postNo});
            },
            changePage(page) {
                this.page = page;
                this.getPosts();
            },
            getPosts() {
                let data = {
                    sort: "DESC",
                    order: "categoryNo",
                    offset: this.page,
                    limit: 10
                };

                this.$api.getPosts(data).then(response => {
                    if(response.status === 200 || response.status === 204) {

                        let postResponses = response.data.postResponses

                        let k = 0;
                        let len = postResponses.length;
                        for (; k < len ; k++ ) {

                            let tags = postResponses[k].tags.map((tag) => {
                                return tag.name;
                            });

                            let data = {
                                no: k,
                                title: postResponses[k].title,
                                category: postResponses[k].category.name,
                                tags: tags.join(","),
                                createdAt: postResponses[k].createdAt,
                                updatedAt: postResponses[k].updatedAt,
                                state: (postResponses[k].useYn) ? "Y" : "N",
                                postNo: postResponses[k].postNo
                            };

                            this.items.push(data);
                        }

                        this.totalSize = response.data.size;
                        console.log(response.data);
                    }

                }).catch(e => {
                    console.log(e);
                });
            }

        }
    }
</script>
