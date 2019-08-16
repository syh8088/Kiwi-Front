<template>
    <div>
        <page-title :heading=heading :subheading=subheading :icon=icon></page-title>

        <div class="content">
            <b-card class="main-card mb-3">
                메인페이지
            </b-card>
        </div>

    </div>
</template>

<script>
    import PageTitle from "../../../Layout/Components/PageTitle.vue";

    export default {
        components: {
            PageTitle
        },
        data() {
            return {
                heading: '메인',
                subheading: 'Wide selection of modal dialogs styles advdvnd animations available.',
                icon: 'pe-7s-phone icon-gradient bg-premiumdvvd-dark'
            };
        },
        mounted() {
        },
        created() {

        },
        methods: {
        }

    }
</script>
