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
                <sidebar-menu showOneChild  @toggle-collapse="onToggleCollapse" @item-click="onItemClick" :menu="menu"/>
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
                menu: [
                    {
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
            onToggleCollapse(collapsed) {
            },
            onItemClick(event, item) {
                this.$router.push({path: item.path});
            },
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

                this.categoriesMenu = {
                    icon: 'pe-7s-diamond',
                    title: '블로그 리스트',
                    child: []
                };

                this.test(this.categoriesData, this.categoriesMenu, true);
             /*   console.log("#####################");
                console.log(this.categoriesData);
                console.log(this.categoriesMenu);
                console.log(this.menu);
                console.log("#####################");*/

                this.menu.push(this.categoriesMenu);
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
            this.$nextTick(function () {
                window.addEventListener('resize', this.getWindowWidth);

                //Init
                this.getWindowWidth()

            })
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
            this.getCategories();
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.getWindowWidth);
        }
    }
</script>
