var app = new Vue({
    el: '#app',
    data: {
        show: false,
        mainPageStyle: 'sixteen wide aligned column'
    },
    created() {
        $('#main').transition('pulse');
    },
    methods: {
        changeSidebarState() {
            console.log('sidebar state changed');
            $('#sidebar').transition('slide right')
            $('#main').transition('pulse');
            if (app.show == true) {
                app.mainPageStyle = 'sixteen wide aligned column';
            } else {
                app.mainPageStyle = 'twelve wide aligned column';
            }

            app.show = !app.show;
        },
        changeProgrammingLanguage() {
            console.log('programming language changed');
            $('.shape')
                .shape('set next side', '.second.side')
                .shape('flip right');
        }
    }
});