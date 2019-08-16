<template>
    <div class="app-sidebar sidebar-shadow" @mouseover="toggleSidebarHover('add','closed-sidebar-open')" @mouseleave="toggleSidebarHover('remove','closed-sidebar-open')">
        <div class="app-header__logo">
            <div class="logo-src"/>
            <div class="header__pane ml-auto">
                <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" v-bind:class="{ 'is-active' : isOpen }" @click="toggleBodyClass('closed-sidebar')">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>
        <div class="app-sidebar-content">
            <VuePerfectScrollbar class="app-sidebar-scroll" v-once>
                <sidebar-menu showOneChild :menu="menu"/>
            </VuePerfectScrollbar>
        </div>

    </div>
</template>

<script>
    import {SidebarMenu} from 'vue-sidebar-menu'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    export default {
        components: {
            SidebarMenu,
            VuePerfectScrollbar
        },
        data() {
            return {
                isOpen: false,
                sidebarActive: false,
                categoriesMenu1: [],
                menu: [

                    /*{
                        header: true,
                        title: 'Blog',
                    },

                    {
                        title: 'Main',
                        icon: 'pe-7s-rocket',
                        child: [
                            {
                                href: '/blog/main',
                                title: '블로그 메인',
                            }
                        ]
                    },
                    {},

            /!*        {
                        title: '포스트',
                        icon: 'pe-7s-rocket',
                        child: [
                            {
                                href: '/blog/posts',
                                title: '포스트',
                            }
                        ]
                    },*!/


                    {
                        header: true,
                        title: 'Blog Admin',
                    },
                    {
                        title: 'Post',
                        icon: 'pe-7s-rocket',
                        child: [
                            {
                                href: '/admin/post',
                                title: '목록',
                            },
                            {
                                href: '/admin/postWrite',
                                title: '글쓰기',
                            }
                        ]
                    },
                    {
                        title: 'Category',
                        icon: 'pe-7s-rocket',
                        child: [
                            {
                                href: '/admin/category',
                                title: '추가 및 수정',
                            }
                        ]
                    },

                    {
                        header: true,
                        title: 'Main Navigation',
                    },
                    {
                        title: 'Dashboards',
                        icon: 'pe-7s-rocket',
                        child: [
                            {
                                href: '/',
                                title: 'Analytics',
                            },
                        ]
                    },
                    {
                        title: 'Pages',
                        icon: 'pe-7s-browser',
                        child: [
                            {
                                href: '/pages/login-boxed',
                                title: 'Login Boxed',
                            },
                            {
                                href: '/pages/register-boxed',
                                title: 'Register Boxed',
                            },
                            {
                                href: '/pages/forgot-password-boxed',
                                title: 'Forgot Password Boxed',
                            },
                        ]
                    },
                    {
                        header: true,
                        title: 'UI Components',
                    },
                    {
                        icon: 'pe-7s-diamond',
                        title: 'Elements',
                        child: [
                            {
                                title: 'Buttons',
                                child: [
                                    {
                                        title: 'Standard',
                                        href: '/elements/buttons-standard',
                                    },
                                ]
                            },
                            {
                                title: 'Dropdowns',
                                href: '/elements/dropdowns',
                            },
                            {
                                title: 'Icons',
                                href: '/elements/icons',
                            },
                            {
                                title: 'Badges',
                                href: '/elements/badges-labels',
                            },
                            {
                                title: 'Cards',
                                href: '/elements/cards',
                            },
                            {
                                title: 'List Groups',
                                href: '/elements/list-group',
                            },
                            {
                                title: 'Timeline',
                                href: '/elements/timelines',
                            },
                            {
                                title: 'Utilities',
                                href: '/elements/utilities',
                            },
                        ],
                    },
                    {
                        icon: 'pe-7s-car',
                        title: 'Components',
                        child: [
                            {
                                title: 'Tabs',
                                href: '/components/tabs',
                            },
                            {
                                title: 'Accordions',
                                href: '/components/accordions',
                            },
                            {
                                title: 'Modals',
                                href: '/components/modals',
                            },
                            {
                                title: 'Progress Bar',
                                href: '/components/progress-bar',
                            },
                            {
                                title: 'Tooltips & Popovers',
                                href: '/components/tooltips-popovers',
                            },
                            {
                                title: 'Carousel',
                                href: '/components/carousel',
                            },
                            {
                                title: 'Pagination',
                                href: '/components/pagination',
                            },
                            {
                                title: 'Maps',
                                href: '/components/maps',
                            },
                        ],
                    },
                    {
                        icon: 'pe-7s-display2',
                        title: 'Tables',
                        child: [
                            {
                                title: 'Regular Tables',
                                href: '/tables/regular-tables',
                            },
                        ]
                    },
                    {
                        header: true,
                        title: 'Dashboard Boxes',
                    },
                    {
                        icon: 'pe-7s-graph2',
                        title: 'Chart Boxes',
                        href: '/widgets/chart-boxes-3',
                    },
                    {
                        header: true,
                        title: 'Forms',
                    },
                    {
                        icon: 'pe-7s-light',
                        title: 'Elements',
                        child: [
                            {
                                title: 'Controls',
                                href: '/forms/controls',
                            },
                            {
                                title: 'Layouts',
                                href: '/forms/layouts',
                            },
                        ],
                    },
                    {
                        header: true,
                        title: 'Charts',
                    },
                    {
                        icon: 'pe-7s-graph2',
                        title: 'ChartJS',
                        href: '/charts/chartjs',
                    },*/
                ],
                collapsed: true,
                windowWidth: 0,
                categoriesData: [],
                categoriesMenu: []
            }
        },
        props: {
            sidebarbg: String,
        },
        methods: {
            getCategories() {
                this.$api.getCategories().then(response => {
                    if(response.status === 200 || response.status === 204) {
                        this.categoriesData = response.data.categoryResponses;

                        this.setCategoriesMenu();
                    }

                }).catch(e => {
                    console.log(e);
                });
            },
            setCategoriesMenu() {

                this.menu = {
                    icon: 'pe-7s-diamond',
                    title: '블로그 리스트',
                    child: []
                };

                this.test(this.categoriesData, this.menu, true);
                console.log("#####################");
                console.log(this.categoriesData);
                console.log(this.categoriesMenu);
                console.log("#####################");
            //    this.menu[2] = this.categoriesMenu;
            },
            test(categoriesData, categoriesMenu, rootCategory = true) {

                let k = 0;
                let len = categoriesData.length;
                for (; k < len ; k++ ) {

                    if(rootCategory) {
                        categoriesMenu.child[k] = {
                            title: categoriesData[k].name,
                            path:'/blog/posts/' + categoriesData[k].categoryNo
                        }
                    } else {
                        categoriesMenu[k] = {
                            title: categoriesData[k].name,
                            path:'/blog/posts/' + categoriesData[k].categoryNo
                        }
                    }

                    if(categoriesData[k].children !== undefined && categoriesData[k].children.length > 0) {

                        if(rootCategory) {
                            categoriesMenu.child[k].child = [];
                            this.test(categoriesData[k].children, categoriesMenu.child[k].child, false);
                        } else {
                            categoriesMenu[k].child = [];
                            this.test(categoriesData[k].children, categoriesMenu[k].child, false);
                        }
                    }


                }
            },

            toggleBodyClass(className) {
                const el = document.body;
                this.isOpen = !this.isOpen;

                if (this.isOpen) {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            },
            toggleSidebarHover(add, className) {
                const el = document.body;
                this.sidebarActive = !this.sidebarActive;

                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth > '992') {
                    if (add === 'add') {
                        el.classList.add(className);
                    } else {
                        el.classList.remove(className);
                    }
                }
            },
            getWindowWidth() {
                const el = document.body;

                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth < '1350') {
                    el.classList.add('closed-sidebar', 'closed-sidebar-md');
                } else {
                    el.classList.remove('closed-sidebar', 'closed-sidebar-md');
                }
            },
        },
        mounted() {

            this.getCategories();

            this.$nextTick(function () {
                window.addEventListener('resize', this.getWindowWidth);

                //Init
                this.getWindowWidth()
            })
        },
        beforeCreate() {


        },

        created() {

            this.categoriesMenu1 = {
                title: '포스qqqq트',
                icon: 'pe-7s-rocket',
            };


        },
        beforeMount() {

        },

        beforeDestroy() {
            window.removeEventListener('resize', this.getWindowWidth);
        }
    }
</script>
