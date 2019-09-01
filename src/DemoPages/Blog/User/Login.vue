<template>
    <div>
        <div class="h-100 bg-plum-plate bg-animation">
            <div class="d-flex h-100 justify-content-center align-items-center">
                <b-col md="8" class="mx-auto app-login-box">
                    <div class="app-logo-inverse mx-auto mb-3"/>

                    <div class="modal-dialog w-100 mx-auto">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="h5 modal-title text-center">
                                    <h4 class="mt-2">
                                        <div>어서오세요</div>
                                        <span>Please sign in to your account below.</span>
                                    </h4>
                                </div>
                                <b-form-group id="exampleInputGroup1"
                                              label-for="id"
                                              description="We'll never share your email with anyone else.">
                                    <b-form-input id="id"
                                                  type="text"
                                                  required
                                                  v-model="id"
                                                  placeholder="Enter id...">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group id="exampleInputGroup2"
                                              label-for="password">
                                    <b-form-input id="password"
                                                  type="password"
                                                  required
                                                  v-model="password"
                                                  placeholder="Enter password...">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-checkbox name="check" id="exampleCheck">
                                    Keep me logged in
                                </b-form-checkbox>
                                <div class="divider"/>
                                <h6 class="mb-0">
                                    No account?
                                    <a href="javascript:void(0);"class="text-primary">Sign up now</a>
                                </h6>
                            </div>
                            <div class="modal-footer clearfix">
                                <div class="float-left">
                                    <a href="javascript:void(0);" class="btn-lg btn btn-link">Recover Password</a>
                                </div>
                                <div class="float-right">
                                    <b-button variant="primary" size="lg" @click.prevent="login" >Login</b-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center text-white opacity-8 mt-3">
                        Copyright &copy; ArchitectUI 2019
                    </div>
                </b-col>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
        },
        computed: {
            isAuthenticated() {
                return this.$store.getters.isAuthenticated
            }
        },
        data() {
            return {
                id: '',
                password: '',
            }
        },

        beforeCreate() {
        },
        mounted() {
        },
        created () {
            console.log(this.isAuthenticated);
        },
        methods: {
            login() {

                let data = {
                    username: this.id,
                    password: this.password,
                    grant_type: 'password'
                };

                this.$store.dispatch('LOGIN', data).then(response => {

                    if(response.status === 200 || response.status === 204) {

                        this.$store.dispatch('USER', true).then(response1 => {
                            if(response.status === 200 || response.status === 204) {
                                console.log(response1);
                                this.$eventBus.$emit('location', 'main');
                            } else {
                                this.$eventBus.$emit('toast', true, '아이디 또는 비밀번호가 올바르지 않습니다.', 3000);
                            }

                        });
                    } else {
                        this.$eventBus.$emit('toast', true, '아이디 또는 비밀번호가 올바르지 않습니다.', 3000);
                    }
                });
            }
        }
    }

</script>
