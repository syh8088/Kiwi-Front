(function () {

    let Axios = require('axios');

    const username = '67iU66Gc6re47YKk7JyE7YG065287Ja4';
    const password = '7YKk7JyE67iU66Gc6re47Iuc7YGs66a8';

    function getAxios(type) {
        return Axios.create({
            baseURL: (type === "login") ? 'http://localhost:8083' : 'http://localhost:8082',
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
        getToken: function (data) {

            let api = getAxios("login");

            api.defaults.headers.Authorization = 'Basic ' + btoa(username + ":" + password);
            return api.post('/oauth/token', jsonToForm(data))
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

    function jsonToForm(data) {
        const form = new FormData();
        for (let key in data) {
            form.append(key, data[key]);
        }
        return form;
    }
})();
