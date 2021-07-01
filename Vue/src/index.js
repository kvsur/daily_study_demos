(function () {
    Vue.component('Hello', {
        name: 'Hello',
        props: {
            text: {
                type: Number,
            }
        },
        template: '<div>{{text}}</div>',
        beforeCreate() {
            console.log('%c beforeCreate-child','background:#aaa;color:#bada55')
        },
        created() {
            console.log('%c created-child','background:#aaa;color:#bada55')
        },
        beforeDestroy() {
            console.log('%c beforeDestroy-child','background:#aaa;color:#bada55')
        },
        destroyed() {
            console.log('%c destroyed-child','background:#aaa;color:#bada55')
        },
        beforeMount() {
            console.log('%c beforeMount-child','background:#aaa;color:#bada55')
        },
        mounted() {
            console.log('%c mounted-child','background:#aaa;color:#bada55')
        },
        beforeUpdate() {
            console.log('%c beforeUpdate-child','background:#aaa;color:#bada55')
        },
        updated() {
            console.log('%c updated-child','background:#aaa;color:#bada55')
        },
    })
    Vue.component('App', {
        name: 'App',
        data() {
            return {
                text: 10
            }
        },
        template: '<div>App main<button @click="text = 12">update</button><Hello :text="text" /></div>',
        beforeCreate() {
            console.log('%c beforeCreate','background:black;color: yellow')
        },
        created() {
            console.log('%c created','background:black;color: yellow')
        },
        beforeDestroy() {
            console.log('%c beforeDestroy','background:black;color: yellow')
        },
        destroyed() {
            console.log('%c destroyed','background:black;color: yellow')
        },
        beforeMount() {
            console.log('%c beforeMount','background:black;color: yellow')
        },
        mounted() {
            console.log('%c mounted','background:black;color: yellow')
        },
        beforeUpdate() {
            console.log('%c beforeUpdate','background:black;color: yellow')
        },
        updated() {
            console.log('%c updated','background:black;color: yellow')
        },
    })
    debugger;
    const app = new Vue({
        el: '#root',
        data() {
            return {
                show: true
            }
        },
        mounted() {
            setTimeout(() => {
                this.show = false;
            }, 10000);
        },
        template: '<div><App v-if="show"/><div v-else @click="show = true">no dom node</div></div>'
    });
    // console.log(app)
})();