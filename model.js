var app = new Vue({
	el: '#app',
	data: {
		show: false
	},
	methods: {
		fetchUsers: _.debounce(
			function () {},
			500 // millis to wait
		),
	},
	created: function () {
		console.log('CREATED');
	},
	watch: {
		toSearch: function () {}
	},

});