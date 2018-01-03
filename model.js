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
            color: {
                red: 1,
                green: 1,
                blue: 1,
                alpha: 1
            },
            tweenedColor: {}
        }
    },
    created: function () {
        this.backgroundColor.tweenedColor = Object.assign({}, this.backgroundColor.color);
        $('#main').transition('pulse');

        this.windowHeight = $(window).height();

        this.blocks.heights[this.blocks.about] = $('#about').offset().top;
        this.blocks.heights[this.blocks.interests] = $('#interests').offset().top;
        this.blocks.heights[this.blocks.programming] = $('#programming').offset().top;
        this.blocks.heights[this.blocks.projects] = $('#projects').offset().top;
        this.blocks.heights[this.blocks.university] = $('#university').offset().top;
        this.blocks.heights[this.blocks.contacts] = $('#contacts').offset().top;

        console.log(this.blocks.heights);
        console.log(this.windowHeight);
    },
    methods: {
        onScroll: function (event) {
            let scroll = event.target.scrollTop + app.windowHeight / 2;
            let indexOfBlock = __findClosestBlock(scroll, app.blocks.heights);
            app.getBlockByIndex(indexOfBlock);

        },
        changeSidebarState: function () {
            console.log('sidebar state changed');

            $('#sidebar').transition('fade right');

            if (app.show) {
                app.sidebarStyle = 'zero wide column';
            } else {
                app.sidebarStyle = 'four wide column';
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
                    // this.changeBackgroundColor();
                    this.updateColor('white');

                    break;
                case this.blocks.interests:
                    console.log('interests');
                    this.updateColor('#f5f5f5');
                    break;
                case this.blocks.programming:
                    console.log('programming');
                    app.updateColor('#ededed');
                    break;
                case this.blocks.projects:
                    console.log('projects');
                    app.updateColor('#e0e0e0');
                    break;
                case this.blocks.university:
                    console.log('university');
                    app.updateColor('#d6d6d6');
                    break;
                default:
                    console.log('KABOOOO?');
            }
        },
        updateColor: function (toChange) {
            console.log('toChange : ', toChange);
            this.backgroundColor.color = new Color(toChange).toRGB();
        }
    },
    watch: {
        color : function () {
            function animate() {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            new TWEEN.Tween(app.backgroundColor.tweenedColor)
                .to(app.backgroundColor.color, 750)
                .start();

            animate();
        }
    },
    computed: {
        tweenedCSSColor: function () {
            return new Color({
                red: this.backgroundColor.tweenedColor.red,
                green: this.backgroundColor.tweenedColor.green,
                blue: this.backgroundColor.tweenedColor.blue,
                alpha: this.backgroundColor.tweenedColor.alpha
            }).toCSS();
        },
        color: function() {
            return this.backgroundColor.color;
        }
    }
});


const __findClosestBlock = function (number, data) {
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