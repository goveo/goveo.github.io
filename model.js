var Color = net.brehaut.Color;
var app = new Vue({
    el: '#app',
    data: {
        show: false,
        sidebarStyle: 'zero wide column',
        windowHeight: null,
        backgroundColor: {
            rgba: {
                red: 1,
                green: 1,
                blue: 1,
                alpha: 1
            },
            current: {},
            default: '#f5f5f5',
            sidebarOpened: '#c6c6c6'
        },
        activeSidebarLinkId: 'about'
    },
    created: function () {
        this.backgroundColor.current = Object.assign({}, this.backgroundColor.rgba);
        this.updateColor(this.backgroundColor.default);
        $('#main').transition('pulse');
        // document.getElementById('about-sidebar-link').classList.add("active");

        this.windowHeight = $(window).height();
    },
    methods: {
        onScroll: function (event) {
            
            if (app.show) {
                app.updateColor(app.backgroundColor.default);
            }

        },
        changeSidebarState: function () {
            console.log('sidebar state changed');

            $('#sidebar').transition('fade right');

            if (app.show) {
                app.sidebarStyle = 'zero wide column';
                app.updateColor(app.backgroundColor.default);
            } else {
                app.sidebarStyle = 'four wide column';
                app.updateColor(app.backgroundColor.sidebarOpened);
            }
            app.show = !app.show;
        },
        changeProgrammingLanguage: function () {
            $('.shape').shape('flip right');
        },
        updateColor: function (toChange) {
            this.backgroundColor.rgba = new Color(toChange).toRGB();
        }
    },
    watch: {
        rgba: function () {
            function animate() {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            new TWEEN.Tween(app.backgroundColor.current)
                .to(app.backgroundColor.rgba, 750)
                .start();

            animate();
        }
    },
    computed: {
        currentBackgroundColor: function () {
            return new Color({
                red: this.backgroundColor.current.red,
                green: this.backgroundColor.current.green,
                blue: this.backgroundColor.current.blue,
                alpha: this.backgroundColor.current.alpha
            }).toCSS();
        },
        rgba: function () {
            return this.backgroundColor.rgba;
        }
    }
});