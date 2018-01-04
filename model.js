var Color = net.brehaut.Color

var app = new Vue({
    el: '#app',
    data: {
        show: false,
        sidebarStyle: 'zero wide column',
        windowHeight: null,
        blocks: {
            about: 0,
            interests: 1,
            programming: 2,
            projects: 3,
            university: 4,
            contacts: 5,
            heights: [
                about,
                interests,
                programming,
                projects,
                university,
                contacts
            ]
        },
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
        document.getElementById('about-sidebar-link').classList.add("active");

        this.windowHeight = $(window).height();

        this.blocks.heights[this.blocks.about] = $('#about').offset().top;
        this.blocks.heights[this.blocks.interests] = $('#interests').offset().top;
        this.blocks.heights[this.blocks.programming] = $('#programming').offset().top;
        this.blocks.heights[this.blocks.projects] = $('#projects').offset().top;
        this.blocks.heights[this.blocks.university] = $('#university').offset().top;
        this.blocks.heights[this.blocks.contacts] = $('#contacts').offset().top;
    },
    methods: {
        onScroll: function (event) {
            let scroll = event.target.scrollTop + app.windowHeight / 2;
            let indexOfBlock = __findClosestBlockIndex(scroll, app.blocks.heights);

            document.getElementById(this.activeSidebarLinkId).classList.remove("active");
            this.activeSidebarLinkId = app.getBlockByIndex(indexOfBlock) + '-sidebar-link';
            document.getElementById(this.activeSidebarLinkId).classList.add("active");

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
        getBlockByIndex: function (index) {
            switch (index) {
                case this.blocks.about:
                    console.log('about');
                    return 'about';
                    break;
                case this.blocks.interests:
                    console.log('interests');
                    return 'interests';
                    break;
                case this.blocks.programming:
                    console.log('programming');
                    return 'programming';
                    break;
                case this.blocks.projects:
                    console.log('projects');
                    return 'projects';
                    break;
                case this.blocks.university:
                    console.log('university');
                    return 'university';
                    break;
                case this.blocks.contacts:
                    console.log('contacts');
                    return 'contacts';
                    break;
                default:
                return 'about';
            }
        },
        updateColor: function (toChange) {
            this.backgroundColor.rgba = new Color(toChange).toRGB();
        },
        scrollPage: function (toScrollIndex) {
            //scroll to block
            $('#app').animate({
                scrollTop: app.blocks.heights[toScrollIndex] - 96
            }, 200);
        },
        setSidebarActive: function (activeIndex) {

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


const __findClosestBlockIndex = function (number, data) {
    let closest,
        current,
        closestIndex;
    for (var i = 0; i < data.length; i++) {
        current = data[i];
        if (current < number && (typeof closest === 'undefined' || closest < current)) {
            closest = current;
            closestIndex = i;
        }
    }
    return closestIndex;
}