var app = new Vue({
    el: '#app',
    data: {
        show: false,
        sidebarStyle: 'zero wide column'
    },
    created() {
        // $('#main').transition('pulse');
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
            
            // $('#main').toggleClass("sixteen wide column");
            // $('#main').toggleClass("twelve wide column");
            // $('#sidebar').toggleClass("zero wide column");
            // $('#sidebar').toggleClass("four wide column");

            // $('#sidebar').transition('slide right');
            // $('#main').transition('pulse');
            // if (app.show == true) {
            //     app.mainPageStyle = 'sixteen wide aligned column';
            // } else {
            //     app.mainPageStyle = 'twelve wide aligned column';
            // }

            app.show = !app.show;
        },
        changeProgrammingLanguage() {
            console.log('programming language changed');
            $('.shape').shape('flip right');
        }
    }
});