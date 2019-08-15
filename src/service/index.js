(function () {

    let Axios = require('axios');

    function getAxios() {
        return Axios.create({
            baseURL: 'http://localhost:8082',
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
    }

    module.exports = {
        install: function (Vue) {
            Vue.prototype.$api = this;
            Vue.api = this;
        },
        getUrl: function (url) {
            return Axios.get(url)
        },
        getCategories: function () {
            let api = getAxios();
            return api.get('/categories')
        },
        saveCategories: function(data) {
            let api = getAxios();
            api.defaults.headers['Content-Type'] = 'application/json';
            return api.post('/categories', data)
        },
        getTags: function () {
            let api = getAxios();
            return api.get('/tags')
        },
        getPosts: function (data) {
            let api = getAxios();
            return api.get(`/posts`, {params: data})
        },
        getPost: function (postNo) {
            let api = getAxios();
            return api.get(`/posts/${postNo}`)
        },
        savePost: function(data) {
            let api = getAxios();
            api.defaults.headers['Content-Type'] = 'application/json';
            return api.post('/posts', data)
        },
        saveImage: function(data) {
            let api = getAxios();
            let formData = new FormData();
            formData.append("multipartFile", data);
            api.defaults.headers['Content-Type'] = 'multipart/form-data';
            return api.post('/images', formData)
        },
    };
})();
