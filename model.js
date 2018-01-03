var app = new Vue({
    el: '#app',
    data: {
        show: false,
        sidebarStyle: 'zero wide column'
    },
    created() {
        $('#main').transition('pulse');
    },
    methods: {
        changeSidebarState() {
            console.log('sidebar state changed');

            $('#sidebar').transition('fade right');
            
            if (app.show) {
                app.sidebarStyle = 'zero wide column';
            } else {
                app.sidebarStyle = 'four wide column';
            }

            app.show = !app.show;
        },
        changeProgrammingLanguage() {
            console.log('programming language changed');
            $('.shape').shape('flip right');
        }
    }
});