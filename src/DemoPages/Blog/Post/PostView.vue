<template>
    <div>
        <page-title :heading=heading :subheading=subheading :icon=icon></page-title>

        <div class="content">
            <b-card class="main-card mb-3">
                <!-- {{selArticle.content}} -->
                <viewer :value="viewerText" />
            </b-card>
        </div>

    </div>
</template>

<script>
    import PageTitle from "../../../Layout/Components/PageTitle.vue";
    import 'tui-editor/dist/tui-editor.css'
    import 'tui-editor/dist/tui-editor-contents.css'
    import 'codemirror/lib/codemirror.css'
    import { Editor, Viewer } from '@toast-ui/vue-editor'
    import VueTagsInput from '@johmun/vue-tags-input'

    export default {
        components: {
            PageTitle,
            'editor': Editor,
            'viewer': Viewer,
            VueTagsInput
        },
        data() {
            return {
                heading: '',
                subheading: 'Wide selection of modal dialogs styles advdvnd animations available.',
                icon: 'pe-7s-phone icon-gradient bg-premiumdvvd-dark',
                viewerText: ''
            };
        },
        mounted() {
            let href = document.location.href;
            let postNo = href.substr(href.lastIndexOf('/') + 1);

            if(isNaN(postNo)) {
                alert("잘못된 경로 입니다.");
            } else {
                this.getPost(postNo);
            }
        },
        created() {

        },
        methods: {
            getPost(postNo) {

                this.$api.getPost(postNo).then(response => {
                    if(response.status === 200 || response.status === 204) {

                        this.heading = response.data.title;
                        this.viewerText = response.data.content;
                    }

                }).catch(e => {
                    console.log(e);
                });

            }

        }

    }
</script>
