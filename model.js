var app = new Vue({
    el: '#app',
    data: {
        show: false,
        windowHeight: 0,
        sidebarHeight: 0
    },
    created() {
        window.addEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize: _.throttle(function () {
            console.log('Resized');
            this.calculateSidebar();
        }, 100),
        calculateSidebar() {
            app.sidebarHeight = $('#sidebar').innerHeight;
            app.windowHeight = window.innerHeight;
            console.log("sidebarHeight ", sidebarHeight);
            console.log("windowHeight ", windowHeight);
        }

    }
});